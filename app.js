'use strict';
const pages = ['Home', 'Research', 'Publications', 'Projects', 'Experience', 'Achievements', 'Education', 'Contact'];
const defaults = {name:'Your Name', photo:'', cv:'', masterCv:'', email:'', bio:'', sections:{Research:'',Publications:'',Projects:'',Experience:'',Achievements:'',Education:'',Contact:''}, publicationItems:[],projectItems:[]};
const editMode = new URLSearchParams(location.search).get('edit') === '1';
const published = window.PORTFOLIO_CONFIG || {};
const hydrate = v => ({...structuredClone(defaults),...v, sections:{...defaults.sections,...(v.sections||{})}, publicationItems:Array.isArray(v.publicationItems)?v.publicationItems:[],projectItems:Array.isArray(v.projectItems)?v.projectItems:[]});
let data = hydrate(published), draftCatalog = {};
if(editMode){try{const saved=JSON.parse(localStorage.getItem('academic-portfolio-v1'));if(saved)data=hydrate({...data,...saved,sections:{...data.sections,...saved.sections}})}catch{}}
const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function safeUrl(s,image=false){
  if(typeof s!=='string'||!s.trim())return '';
  try{const u=new URL(s,document.baseURI);return ['https:','http:'].includes(u.protocol)||(u.protocol==='file:'&&location.protocol==='file:')||(image&&/^data:image\/(png|jpeg|webp|gif);base64,/.test(s))?u.href:''}
  catch{return ''}
}
function linkify(text){return esc(text).replace(/https?:\/\/[^\s<>"']+/g,part=>`<a href="${esc(safeUrl(part))}" target="_blank" rel="noopener noreferrer">${part}</a>`)}
function renderTextPage(page){
  const content=(data.sections[page]||'').trim();
  const blocks=content?content.split(/\n\s*\n/):[];
  return `<section class="inner-hero"><h1>${esc(page==='Research'?'Research Interests':page)}</h1></section><div class="page-content">${blocks.map(b=>{const [heading,...body]=b.split('\n');return `<section class="content-section"><h2 class="section-heading">${esc(heading)}</h2><div class="detail"><p>${linkify(body.join('\n'))}</p></div></section>`}).join('')}${!blocks.length?'<p class="detail empty-note">Content will be added soon.</p>':''}${page==='Contact'&&data.email?`<div class="detail contact-email"><a class="contact-link" href="mailto:${esc(data.email)}">Email ${esc(data.name)}</a></div>`:''}</div>`;
}
function renderCatalog(page){
 const isPub=page==='Publications',items=isPub?data.publicationItems:data.projectItems;
 if(!items.length)return renderTextPage(page);
 const groups=[];
 for(const [index,item] of items.entries()){const key=item.category||'Other';let group=groups.find(g=>g.category===key);if(!group){group={category:key,items:[]};groups.push(group)}group.items.push({item,index})}
 const markup=groups.map(group=>`<section class="catalog-section"><div class="catalog-heading"><h2>${esc(group.category)}</h2><span>${group.items.length} ${group.items.length===1?'item':'items'}</span></div><div class="catalog-list">${group.items.map(({item,index})=>{
   const id=`${isPub?'publication':'project'}-${index}`;
   const images=Array.isArray(item.images)?item.images.filter(path=>safeUrl(path,true)):[];
   const gallery=images.length?`<div class="media-gallery" hidden aria-label="Images for ${esc(item.title)}"><div class="gallery-header"><span class="gallery-heading">${isPub?'Publication images':'Project images'}</span><span class="gallery-count" aria-live="polite"></span></div><div class="gallery-strip" role="group" aria-label="Image thumbnails">${images.map((path,i)=>`<button type="button" class="gallery-tile" data-image="${esc(safeUrl(path,true))}" data-title="${esc(item.title)}" aria-label="Open image ${i+1} of ${esc(item.title)}"><img src="${esc(safeUrl(path,true))}" alt="${esc(item.title)} — image ${i+1}" loading="eager" decoding="async"></button>`).join('')}</div><button type="button" class="gallery-open-all">View photo gallery <span aria-hidden="true">↗</span></button></div>`:'';
   const link=safeUrl(item.link);
   return `<article id="${id}" class="showcase-card no-media"><div class="showcase-copy">${item.status?`<p class="item-status">${esc(item.status)}</p>`:''}<h3>${esc(item.title||'Untitled item')}</h3>${item.meta?`<p class="item-meta">${esc(item.meta)}</p>`:''}<p class="item-description">${esc(item.description||'')}</p>${link?`<a class="item-link" href="${esc(link)}" rel="noopener noreferrer" target="_blank">${isPub?'View publication':'Explore project'} <span aria-hidden="true">↗</span></a>`:''}</div>${gallery}</article>`;
 }).join('')}</div></section>`).join('');
 return `<section class="inner-hero"><div class="catalog-hero"><p class="catalog-eyebrow">${isPub?'RESEARCH OUTPUTS':'SELECTED WORK'}</p><h1>${esc(page)}</h1><p>${isPub?'Manuscripts, accepted papers, and work submitted for review. Publication statuses are shown individually.':'Research, machine learning, wireless systems, robotics, and hardware–software projects.'}</p></div></section><div class="catalog-page">${markup}</div>`;
}
function activateGalleries(){
 $('#main').querySelectorAll('.media-gallery').forEach(gallery=>{
   const card=gallery.closest('.showcase-card');
   // Only images that successfully load appear in the gallery.
   // This keeps incomplete image collections from showing broken thumbnails.
   const update=()=>{
      const count=gallery.querySelectorAll('.gallery-tile:not([hidden])').length;
      gallery.hidden=count===0;
      card.classList.toggle('no-media',count===0);
      gallery.querySelector('.gallery-count').textContent=`${count} ${count===1?'photo':'photos'}`;
      gallery.querySelector('.gallery-open-all').hidden=count<2;
   };
   gallery.querySelectorAll('.gallery-tile').forEach(tile=>{
      const img=tile.querySelector('img');
      tile.hidden=true;
      const loaded=()=>{tile.hidden=false;update()};
      const failed=()=>{tile.hidden=true;update()};
      img.addEventListener('load',loaded,{once:true});img.addEventListener('error',failed,{once:true});
      if(img.complete){if(img.naturalWidth>0)loaded();else failed()}
   });
   update();
 });
}
function render(){
 const hash=location.hash.slice(1).toLowerCase(),page=pages.find(p=>p.toLowerCase()===hash)||'Home';
 document.title=`${data.name} | ${page==='Home'?'Academic Portfolio':page}`;
 document.querySelector('meta[name=description]').content=data.bio.slice(0,160);
 $('.brand').textContent=data.name;$('.owner').textContent=data.name;$('#year').textContent=new Date().getFullYear();
 $('nav').innerHTML=pages.map(p=>`<a href="#${p.toLowerCase()}" class="${p===page?'active':''}" ${p===page?'aria-current="page"':''}>${p}</a>`).join('');
 $('nav').classList.remove('open');$('#menu').setAttribute('aria-expanded','false');
 if(page==='Home'){
   const portrait=safeUrl(data.photo,true);
   $('#main').innerHTML=`<section class="hero" aria-label="Profile banner">${circuits()}<div class="portrait">${portrait?`<img src="${esc(portrait)}" alt="Portrait of ${esc(data.name)}">`:`<svg viewBox="0 0 200 220" fill="#aaa" aria-hidden="true"><circle cx="100" cy="70" r="39"/><path d="M22 205v-25a78 78 0 0 1 156 0v25z"/></svg><small>YOUR PORTRAIT</small>`}</div><a href="#about" class="down" aria-label="Scroll to About Me">⌄</a></section><h2 class="name-band">${esc(data.name.toUpperCase())}</h2><section id="about" class="about"><h1>About Me</h1><p>${esc(data.bio)}</p></section><div class="cv-band">${safeUrl(data.cv)?`<a class="outline-btn" href="${esc(safeUrl(data.cv))}" target="_blank" rel="noopener noreferrer">Academic CV ↗</a>`:(editMode?'<button class="outline-btn" id="add-cv">Add your Academic CV</button>':'<a class="outline-btn" href="#contact">Get in touch</a>')}${safeUrl(data.masterCv)?`<a class="outline-btn" href="${esc(safeUrl(data.masterCv))}" target="_blank" rel="noopener noreferrer">Full CV ↗</a>`:''}</div>`;
   $('#add-cv')?.addEventListener('click',openEditor);
 }else $('#main').innerHTML=['Publications','Projects'].includes(page)?renderCatalog(page):renderTextPage(page);
 activateGalleries();
}
function circuits(){let paths='';for(let side=0;side<2;side++){let lines='';for(let i=0;i<15;i++){let y=180+i*34,x=(i*67)%280,mid=310+(i%4)*25,end=500+((i*29)%150),ey=y+(i%2?65:-65);lines+=`<path d="M ${x} ${y} H ${mid-100} L ${mid} ${ey} H ${end}"/><circle cx="${x}" cy="${y}" r="${i%3?4:9}"/><circle cx="${end}" cy="${ey}" r="4"/>`;}paths+=`<g transform="${side?'translate(1400 0) scale(-1 1)':''}">${lines}<path d="M35 130 H175 L245 200 H400 M80 810 H240 L290 760 H490 M300 890 H700 L760 950 M515 78 H700 L730 48 H940"/></g>`}return `<svg class="circuit" viewBox="0 0 1400 970" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><g fill="none" stroke="#777" stroke-width="2.5">${paths}</g><g fill="none" stroke="#777" stroke-width="2"><circle cx="700" cy="500" r="290"/><circle cx="700" cy="500" r="225"/></g><circle cx="700" cy="500" r="214" fill="#030303"/></svg>`}

// Lightbox uses the images currently visible in the selected item.
let galleryImages=[], activeImage=0;
function displayLightbox(index){
 activeImage=(index+galleryImages.length)%galleryImages.length;
 const selected=galleryImages[activeImage];
 $('#lightbox-img').src=selected.src;$('#lightbox-img').alt=selected.alt;
 $('#lightbox-caption').textContent=`${selected.title} · ${activeImage+1} of ${galleryImages.length}`;
 $('#lightbox-prev').hidden=galleryImages.length<2;$('#lightbox-next').hidden=galleryImages.length<2;
}
$('#main').addEventListener('click',event=>{
 const tile=event.target.closest('.gallery-tile');
 const gallery=(tile||event.target.closest('.gallery-open-all'))?.closest('.media-gallery');
 if(!gallery||tile?.hidden)return;
 const peers=[...gallery.querySelectorAll('.gallery-tile:not([hidden])')];
 if(!peers.length)return;
 galleryImages=peers.map(t=>({src:t.dataset.image,title:t.dataset.title,alt:t.querySelector('img').alt}));
 displayLightbox(tile?peers.indexOf(tile):0);$('#lightbox').showModal();
});
$('#lightbox-prev').onclick=()=>displayLightbox(activeImage-1);
$('#lightbox-next').onclick=()=>displayLightbox(activeImage+1);
$('#lightbox').addEventListener('keydown',e=>{if(e.key==='ArrowLeft')displayLightbox(activeImage-1);if(e.key==='ArrowRight')displayLightbox(activeImage+1)});
$('#lightbox-close').onclick=()=>$('#lightbox').close();

const textPages=pages.slice(1).filter(p=>!['Publications','Projects'].includes(p));
function fieldInput(id,label,value,kind='text'){
 const tag=kind==='textarea'?`<textarea rows="${id==='description'?4:2}" data-field="${esc(id)}">${esc(value)}</textarea>`:`<input type="text" data-field="${esc(id)}" value="${esc(value)}">`;
 return `<label>${esc(label)}${tag}</label>`;
}
function renderItemEditors(){
 for(const [cat,label] of [['publicationItems','Publications'],['projectItems','Projects']]){
  const host=$(`[data-items="${cat}"]`),arr=draftCatalog[cat]||[];
  host.innerHTML=`<p class="hint">Enter paths relative to the site root (for example, <code>assets/${cat==='publicationItems'?'publications':'projects'}/image.jpg</code>). Add as many paths as you want, one per line. Every loaded photo is included in that item’s gallery.</p>`+
   arr.map((item,i)=>`<div class="item-editor" data-cat="${cat}" data-index="${i}"><div class="item-editor-head"><strong>${esc(item.title||'New item')}</strong><button type="button" class="remove-item" data-cat="${cat}" data-index="${i}">Remove</button></div>${fieldInput('title','Title',item.title)}<div class="editor-pair">${fieldInput('category','Category',item.category)}${fieldInput('status','Status / Date',item.status)}</div>${fieldInput('meta','Keywords / Additional Details',item.meta)}${fieldInput('description','Description',item.description,'textarea')}${fieldInput('link','External link (optional)',item.link)}${fieldInput('images','Gallery photo paths (one file per line; unlimited)',(item.images||[]).join('\n'),'textarea')}</div>`).join('');
 }
}
function syncDraftFromEditor(){
 for(const cat of ['publicationItems','projectItems']){
  draftCatalog[cat]=[...document.querySelectorAll(`.item-editor[data-cat="${cat}"]`)].map(node=>{
    const item={};for(const input of node.querySelectorAll('[data-field]'))item[input.dataset.field]=input.value.trim();
    item.images=item.images.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);return item;
  });
 }
}
const pageEditor=$('#page-editors');
pageEditor.innerHTML=textPages.map(p=>`<label>${p}<textarea name="section-${p}" rows="6"></textarea></label>`).join('')+
 `<section class="catalog-editor"><h3>Publication entries & photos</h3><div data-items="publicationItems"></div><button type="button" class="add-item" data-cat="publicationItems">+ Add publication</button></section><section class="catalog-editor"><h3>Project entries & photos</h3><div data-items="projectItems"></div><button type="button" class="add-item" data-cat="projectItems">+ Add project</button></section>`;
pageEditor.addEventListener('click',event=>{
 const add=event.target.closest('.add-item'),remove=event.target.closest('.remove-item');
 if(!add&&!remove)return;
 syncDraftFromEditor();const cat=(add||remove).dataset.cat;
 if(add)draftCatalog[cat].push({title:'New '+(cat==='projectItems'?'project':'publication'),category:'Other',status:'',meta:'',description:'',link:'',images:[]});
 if(remove)draftCatalog[cat].splice(Number(remove.dataset.index),1);
 renderItemEditors();
});
function openEditor(){
 for(const key of ['name','photo','bio','cv','masterCv','email'])$('#editor-form').elements[key].value=data[key]||'';
 for(const p of textPages)$('#editor-form').elements['section-'+p].value=data.sections[p]||'';
 draftCatalog={publicationItems:structuredClone(data.publicationItems),projectItems:structuredClone(data.projectItems)};
 renderItemEditors();$('#status').textContent='';$('#editor').showModal();
}
function readForm(){
 syncDraftFromEditor();const f=$('#editor-form');
 return {name:f.elements.name.value.trim()||'Your Name',photo:f.elements.photo.value.trim(),cv:f.elements.cv.value.trim(),masterCv:f.elements.masterCv.value.trim(),email:f.elements.email.value.trim(),bio:f.elements.bio.value,
 sections:{...data.sections,...Object.fromEntries(textPages.map(p=>[p,f.elements['section-'+p].value]))},publicationItems:draftCatalog.publicationItems,projectItems:draftCatalog.projectItems};
}
$('#customize').hidden=!editMode;$('#customize').onclick=openEditor;
document.querySelectorAll('.close').forEach(button=>button.onclick=()=>button.closest('dialog').close());
$('#editor-form').onsubmit=e=>{
 e.preventDefault();data=hydrate(readForm());
 try{localStorage.setItem('academic-portfolio-v1',JSON.stringify(data));$('#status').textContent='Preview saved in this browser.'}
 catch{$('#status').textContent='Preview updated. Download settings.js to keep a copy; browser storage is full.'}
 render();
};
$('#photo-file').onchange=e=>{
 const f=e.target.files?.[0];if(!f)return;
 if(f.size>3e6){$('#status').textContent='Choose an image smaller than 3 MB, or use a path in assets/.';return}
 const reader=new FileReader();reader.onload=()=>{$('#editor-form').elements.photo.value=reader.result};reader.readAsDataURL(f);
};
function downloadFile(blob,name){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)}
$('#publish-config').onclick=()=>{
 const config=readForm();downloadFile(new Blob(['// Your public portfolio data. See README.md for adding images.\nwindow.PORTFOLIO_CONFIG = '+JSON.stringify(config,null,2)+';\n'],{type:'text/javascript'}),'settings.js');
 $('#status').textContent='Download created. Replace settings.js on GitHub and upload the referenced assets/ photos to publish.';
};
$('#export').onclick=()=>{downloadFile(new Blob([JSON.stringify(readForm(),null,2)],{type:'application/json'}),'portfolio-settings.json');$('#status').textContent='JSON backup downloaded.'};
$('#import').onchange=async e=>{
 try{
  const imported=JSON.parse(await e.target.files[0].text());
  if(typeof imported.name!=='string'||!imported.sections||typeof imported.sections!=='object')throw Error();
  for(const v of Object.values(imported.sections))if(typeof v!=='string')throw Error();
  for(const k of ['publicationItems','projectItems'])if(imported[k]!==undefined&&(!Array.isArray(imported[k])||imported[k].some(item=>!item||typeof item!=='object'||(item.images!==undefined&&!Array.isArray(item.images)))))throw Error();
  data=hydrate(imported);$('#editor').close();openEditor();$('#status').textContent='Settings imported. Save preview to apply.';
 }catch{$('#status').textContent='Could not import these settings.'}
};
$('#menu').onclick=()=>{const expanded=$('nav').classList.toggle('open');$('#menu').setAttribute('aria-expanded',String(expanded))};
$('#search').onclick=()=>{$('#search-dialog').showModal();$('#query').focus()};
$('#query').oninput=e=>{
 const q=e.target.value.toLowerCase().trim();if(!q){$('#results').innerHTML='';return}
 const matches=[];
 for(const p of pages){const haystack=(p+' '+(p==='Home'?data.bio:data.sections[p]||'')).toLowerCase();if(haystack.includes(q))matches.push({page:p,label:p,subtitle:`View ${p.toLowerCase()}`})}
 for(const [cat,page] of [['publicationItems','Publications'],['projectItems','Projects']]){
   data[cat].forEach((item,i)=>{if([item.title,item.description,item.meta,item.status,item.category].join(' ').toLowerCase().includes(q))matches.push({page,label:item.title,subtitle:item.category||page,target:`${page==='Projects'?'project':'publication'}-${i}`})})
 }
 $('#results').innerHTML=matches.length?matches.slice(0,24).map(m=>`<a href="#${m.page.toLowerCase()}" ${m.target?`data-target="${esc(m.target)}"`:''}>${esc(m.label)}<small>${esc(m.subtitle)}</small></a>`).join(''):'<p>No matching pages or items.</p>';
 $('#results').querySelectorAll('a').forEach(a=>a.onclick=()=>{pendingScroll=a.dataset.target||'';$('#search-dialog').close();if(location.hash===a.getAttribute('href'))scrollToPending()});
};
let pendingScroll='';
function scrollToPending(){if(!pendingScroll)return;const target=document.getElementById(pendingScroll);if(target){target.scrollIntoView({behavior:'smooth',block:'start'});pendingScroll=''}}
window.addEventListener('hashchange',()=>{if(location.hash==='#about')return;render();window.scrollTo(0,0);requestAnimationFrame(scrollToPending)});
render();
