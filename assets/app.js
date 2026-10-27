const isFrench=document.documentElement?.lang==='fr-CA';
const menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('nav').classList.toggle('open',open);});
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>{menu?.setAttribute('aria-expanded','false');document.querySelector('nav').classList.remove('open');}));
if(menu){document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');document.querySelector('nav').classList.remove('open');menu.focus();}});}
const form=document.querySelector('#move-form');
if(form){
 const date=form.querySelector('[name=date]');
 const today=new Date();
 date.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
 const button=form.querySelector('button[type=submit]'),status=document.querySelector('#form-status');
 const buttonLabel=button.textContent;
 let submitting=false;
 form.addEventListener('submit',async event=>{
  event.preventDefault();
  if(submitting||!form.reportValidity())return;
  submitting=true;
  button.disabled=true;
  button.textContent=isFrench?'Envoi de votre demande…':'Sending your enquiry…';
  form.setAttribute('aria-busy','true');
  status.textContent='';
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),30000);
  try{
   // The HTML action also supports direct submission when JavaScript is unavailable.
   const response=await fetch(form.action,{
    method:'POST',headers:{Accept:'application/json'},
    body:new FormData(form),signal:controller.signal
   });
   if(!response.ok){
    const result=await response.json().catch(()=>null);
    const messages=Array.isArray(result?.errors)?result.errors.map(error=>error.message).filter(message=>typeof message==='string'&&message.trim()):[];
    status.textContent=isFrench?'Votre demande n’a pas pu être envoyée. Vos renseignements sont conservés dans le formulaire. Réessayez ou écrivez à info@muve.ca.':(messages.length?messages.join(' '):'Your enquiry could not be sent.')+' Your details are still here. Please try again, or email info@muve.ca.';
   }else{
    form.reset();
    status.textContent=isFrench?'Merci — votre demande a été transmise à Müve. Nous vous contacterons au sujet de votre déménagement.':'Thank you — your enquiry has been sent to Müve. We’ll contact you about your move.';
   }
  }catch{
   // A lost connection can occur after acceptance, so do not automatically retry.
   status.textContent=isFrench?'Nous n’avons pas pu confirmer l’envoi. Vos renseignements sont conservés dans le formulaire. Vérifiez votre connexion et réessayez, ou écrivez à info@muve.ca.':'We couldn’t confirm whether your enquiry was sent. Your details are still here. Please check your connection and try again, or email info@muve.ca for help.';
  }finally{
   clearTimeout(timeout);
   submitting=false;
   button.disabled=false;
   button.textContent=buttonLabel;
   form.removeAttribute('aria-busy');
   status.focus();
  }
 });
}
// Filter existing, crawlable location links; each remains usable without scripting.
const citySearch=document.querySelector('#city-search');
if(citySearch){
 const provinceFilter=document.querySelector('#province-filter'),serviceFilter=document.querySelector('#service-filter'),marketFilter=document.querySelector('#market-filter');
 const results=[...document.querySelectorAll('.location-result')];
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’']/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
 function updateDirectory(){const query=normalize(citySearch.value),province=provinceFilter.value,service=serviceFilter.value,market=marketFilter.value;let count=0;for(const result of results){const matches=normalize(result.dataset.location).includes(query)&&(!province||result.dataset.province===province)&&(!market||result.dataset.market===market);result.hidden=!matches;if(matches)count++;result.href=result.dataset.base+(service?'/'+service:'');result.querySelector('.result-service').textContent=(service?serviceFilter.selectedOptions[0].textContent:(isFrench?'Voir les services':'Explore services'))+' ↗';}document.querySelector('#directory-count').textContent=`${count} ${isFrench?(count===1?'ville':'villes'):(count===1?'location':'locations')}`;document.querySelector('#directory-empty').hidden=count>0;}
 citySearch.addEventListener('input',updateDirectory);provinceFilter.addEventListener('change',updateDirectory);serviceFilter.addEventListener('change',updateDirectory);marketFilter.addEventListener('change',updateDirectory);updateDirectory();
}
const checklist=document.querySelector('.move-checklist');
if(checklist){checklist.querySelector('.brief-add').addEventListener('click',()=>{const tasks=[...checklist.querySelectorAll('input:checked')].map(x=>x.value);const status=checklist.querySelector('.brief-status');if(!tasks.length){status.textContent=isFrench?'Sélectionnez au moins un élément à ajouter à votre demande.':'Select at least one requirement to add to your enquiry.';return;}const details=document.querySelector('textarea[name="details"]');const block=`${checklist.dataset.service} ${isFrench?'à':'in'} ${checklist.dataset.city} — ${isFrench?'besoins':'requirements'}:\n${tasks.map(t=>'• '+t).join('\n')}`;if(!details.value.includes(block)){const combined=[details.value.trim(),block].filter(Boolean).join('\n\n');if(combined.length>details.maxLength){status.textContent=isFrench?'Le champ de précisions est plein. Raccourcissez le texte avant d’ajouter ces éléments.':'Your enquiry notes are full. Please shorten them before adding these requirements.';return;}details.value=combined;}status.textContent=isFrench?'Les éléments sélectionnés ont été ajoutés à votre demande.':'Selected requirements added to your enquiry.';details.focus({preventScroll:true});details.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'center'});});}
