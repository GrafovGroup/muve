import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';

const source=await readFile(new URL('../assets/app.js',import.meta.url),'utf8');
const enquiry={name:'Website QA',company:'Integration test',email:'qa@example.com',phone:'',service:'Office moving',from:'Toronto, ON',to:'Mississauga, ON',date:'',size:'11–50 people',details:'Keep these notes.\n• After-hours access',consent:'on',subject:'New Müve move enquiry — {{ company }}',_gotcha:'',sourcePage:'/locations/ontario/toronto/office-moving',landingCity:'Toronto'};

function setup(fetch,{valid=true,lang="en-CA"}={}){
 let submit,timeout;
 const button={disabled:false,textContent:'Request a move plan ↗'};
 const status={textContent:'',focused:false,focus(){this.focused=true;}};
 const attributes=new Map();
 const form={
  action:'https://formspree.io/f/xoeqyprr',values:{...enquiry},resets:0,
  reportValidity:()=>valid,
  querySelector:selector=>selector==='[name=date]'?{}:button,
  addEventListener:(_,callback)=>{submit=callback;},
  setAttribute:(name,value)=>attributes.set(name,value),
  removeAttribute:name=>attributes.delete(name),
  reset(){this.resets++;this.values={};}
 };
 class BrowserFormData extends FormData{
  constructor(element){super();for(const [key,value] of Object.entries(element.values))this.append(key,value);}
 }
 vm.runInNewContext(source,{
  document:{documentElement:{lang},querySelector:selector=>({'#move-form':form,'#form-status':status}[selector]||null),querySelectorAll:()=>[]},
  fetch,FormData:BrowserFormData,AbortController,
  setTimeout:callback=>{timeout=callback;return 1;},clearTimeout:()=>{}
 });
 return {form,button,status,attributes,submit:()=>submit({preventDefault(){}}),expire:()=>timeout()};
}

test('sends the complete enquiry to Formspree and confirms only after acceptance',async()=>{
 let accept,calls=0;
 const ui=setup(async(url,options)=>{
  calls++;
  assert.equal(url,'https://formspree.io/f/xoeqyprr');
  assert.equal(options.method,'POST');
  assert.equal(options.headers.Accept,'application/json');
  assert.equal(options.headers['Content-Type'],undefined,'Browser must supply the multipart boundary');
  assert.deepEqual(Object.fromEntries(options.body),enquiry);
  return new Promise(resolve=>{accept=resolve;});
 });
 const pending=ui.submit();
 assert.equal(ui.button.disabled,true);
 assert.equal(ui.attributes.get('aria-busy'),'true');
 assert.equal(ui.status.textContent,'');
 await ui.submit();
 assert.equal(calls,1,'Prevent repeat submits while a request is pending');
 accept(Response.json({ok:true}));
 await pending;
 assert.equal(ui.form.resets,1);
 assert.match(ui.status.textContent,/has been sent to Müve/);
 assert.equal(ui.status.focused,true);
 assert.equal(ui.button.disabled,false);
 assert.equal(ui.attributes.has('aria-busy'),false);
});

test('invalid browser fields never send a request',async()=>{
 const ui=setup(()=>assert.fail('Invalid form submitted'),{valid:false});
 await ui.submit();
 assert.equal(ui.form.resets,0);
});

for(const [name,response,message] of [
 ['field error',()=>Response.json({errors:[{field:'email',message:'Please enter a valid email address.'}]},{status:422}),/valid email address/],
 ['rate limit',()=>Response.json({errors:[{message:'Too many requests.'}]},{status:429}),/Too many requests/],
 ['non-JSON server error',()=>new Response('<html>Unavailable</html>',{status:503}),/could not be sent/],
 ['malformed error details',()=>Response.json({errors:'Unavailable'},{status:500}),/could not be sent/]
])test(`${name} preserves the enquiry and allows retry`,async()=>{
 let fail=true;
 const ui=setup(async()=>fail?response():Response.json({ok:true}));
 await ui.submit();
 assert.match(ui.status.textContent,message);
 assert.deepEqual(ui.form.values,enquiry);
 assert.equal(ui.form.resets,0);
 assert.equal(ui.button.disabled,false);
 assert.equal(ui.button.textContent,'Request a move plan ↗');
 assert.equal(ui.status.focused,true);
 fail=false;
 await ui.submit();
 assert.equal(ui.form.resets,1);
});

test('connection failures preserve notes and do not claim success or automatically retry',async()=>{
 let calls=0;
 const ui=setup(async()=>{calls++;throw new TypeError('Failed to fetch');});
 await ui.submit();
 assert.equal(calls,1);
 assert.match(ui.status.textContent,/couldn’t confirm/);
 assert.deepEqual(ui.form.values,enquiry);
 assert.equal(ui.button.disabled,false);
});

test('a timed-out submission releases the button and keeps all details',async()=>{
 const ui=setup((_,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(signal.reason))));
 const pending=ui.submit();
 ui.expire();
 await pending;
 assert.match(ui.status.textContent,/couldn’t confirm/);
 assert.equal(ui.button.disabled,false);
 assert.equal(ui.form.resets,0);
 assert.deepEqual(ui.form.values,enquiry);
});

for (const [label,fetch,pattern,resets] of [
 ['success',async()=>Response.json({ok:true}),/Merci — votre demande a été transmise/,1],
 ['rejection',async()=>new Response('',{status:422}),/n’a pas pu être envoyée/,0],
 ['connection loss',async()=>{throw Error('offline')},/pas pu confirmer l’envoi/,0]
]) test(`French form ${label} uses French status and preserves submission semantics`,async()=>{
 const ui=setup(fetch,{lang:'fr-CA'});await ui.submit();assert.match(ui.status.textContent,pattern);assert.equal(ui.form.resets,resets);if(!resets)assert.deepEqual(ui.form.values,enquiry);
});
