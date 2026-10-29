'use strict';

// The entire site is rendered as one document. settings.js remains the source of content.
const navigation = [
  {id:'home', label:'Home'},
  {id:'education', label:'Education'},
  {id:'research-publications', label:'Research & Publications'},
  {id:'projects', label:'Projects'},
  {id:'experience', label:'Experience'},
  {id:'skills-achievements', label:'Skills & Achievements'},
  {id:'contact', label:'Contact'}
];
const defaults = {
 name:'Md Jaied Hasan', photo:'', cv:'', masterCv:'', email:'', bio:'', tagline:'', beyondLab:'',
 socialLinks:{}, sections:{}, publicationItems:[], projectItems:[]
};
const published = window.PORTFOLIO_CONFIG || {};
const hydrate = value => ({
 ...structuredClone(defaults), ...value,
 socialLinks:{...(value.socialLinks || {})},
 sections:{...(value.sections || {}), ...(typeof value.sections?.Education==='string' ? {Education:value.sections.Education.split(/\n\s*\n/).filter(block=>!/^higher secondary education|^higher secondary certificate|^h\.?s\.?c\.?/i.test(block.trim())).join('\n\n')} : {})},
 publicationItems:Array.isArray(value.publicationItems) ? value.publicationItems : [],
 projectItems:Array.isArray(value.projectItems) ? value.projectItems : []
});
const data = hydrate(published);
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const paragraphs = text => String(text || '').trim().split(/\n\s*\n/).map(p=>p.trim()).filter(Boolean);
const contentBlocks = text => paragraphs(text).map(block=>{const [title,...lines]=block.split('\n');return {title:title.trim(),lines:lines.map(x=>x.trim()).filter(Boolean)};});
function safeUrl(input,image=false){
 if(typeof input!=='string'||!input.trim())return '';
 try{
  const url=new URL(input,document.baseURI);
  if(url.protocol==='https:'||url.protocol==='http:'||(location.protocol==='file:'&&url.protocol==='file:'))return url.href;
  if(image&&/^data:image\/(png|jpeg|webp|gif);base64,/i.test(input))return input;
 }catch{}
 return '';
}
function linkify(value){
 return String(value || '').split(/(https?:\/\/[^\s]+)/g).map(part=>{
  if(!/^https?:\/\//.test(part))return esc(part);
  const href=safeUrl(part);
  return href?`<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(part)}</a>`:esc(part);
 }).join('');
}
function heading(number,label,summary){
 const titleId=label.toLowerCase().replace(/&/g,'').replace(/[^a-z0-9]+/g,'-').replace(/-$/,'')+'-title';
 return `<div class="section-intro"><span class="section-count">${String(number).padStart(2,'0')} / 07</span><h2 id="${titleId}">${esc(label)}</h2>${summary?`<p>${esc(summary)}</p>`:''}</div>`;
}
function renderHome(){
 const photo=safeUrl(data.photo,true);
 const bio=paragraphs(data.bio);
 return `<section id="home" class="page-section home-section" aria-labelledby="home-title">
  <div class="container hero-grid">
   <div class="hero-copy"><p class="eyebrow"><span class="eyebrow-rule"></span> ABOUT ME</p>
    <h1 id="home-title">${esc(data.name)}</h1>
    ${data.tagline?`<p class="hero-tagline">${esc(data.tagline)}</p>`:''}
    <div class="hero-bio">${bio.map((part,index)=>`<p class="${index===0?'hero-lead':''}">${esc(part)}</p>`).join('')}</div>
    <div class="hero-actions">
      <a class="button button-primary" href="#research-publications">Explore my research <span aria-hidden="true">&#8594;</span></a>
      ${safeUrl(data.cv)?`<a class="button button-secondary" target="_blank" rel="noopener noreferrer" href="${esc(safeUrl(data.cv))}">Academic CV <span aria-hidden="true">&#8599;</span></a>`:''}
      ${safeUrl(data.masterCv)?`<a class="subtle-link" target="_blank" rel="noopener noreferrer" href="${esc(safeUrl(data.masterCv))}">Full CV <span aria-hidden="true">&#8599;</span></a>`:''}
    </div>
   </div>
   <div class="hero-visual"><div class="portrait-frame">${photo?`<img src="${esc(photo)}" alt="Portrait of ${esc(data.name)}" width="800" height="800" fetchpriority="high">`:`<span class="photo-fallback">JH</span>`}</div>
    <div class="portrait-caption"><span class="caption-symbol" aria-hidden="true">&#9679;</span> EEE, BUET <span class="caption-divider">/</span> Communication &amp; Signal Processing</div>
   </div>
  </div>
 </section>`;
}
function formatEducationFact(line){
 const text=String(line||'');
 if(!/^CGPA\s*:/i.test(text))return esc(text);
 return esc(text).replace(/(CGPA:\s*[0-9.]+\s*\/\s*[0-9.]+)/i,'<strong class="cgpa-emphasis">$1</strong>')
                 .replace(/(last four semesters:\s*[0-9.]+\s*\/\s*[0-9.]+)/i,'<strong class="cgpa-emphasis">$1</strong>');
}
function renderEducation(){
 const blocks=contentBlocks(data.sections.Education);
 const coursework=blocks.find(b=>/coursework/i.test(b.title));
 const awards=blocks.filter(b=>b!==coursework&&!/higher\s+secondary|h\.?s\.?c\.?/i.test(b.title));
 return `<section id="education" class="page-section section-soft" aria-labelledby="education-title"><div class="container">
  ${heading(2,'Education','Academic background and a foundation in electrical engineering.')}
  <div class="education-grid">${awards.map((block,index)=>`<article class="education-card"><div class="mini-overline">${esc(block.title)}</div><h3>${esc(block.lines[0]||'')}</h3><p class="education-institution">${esc(block.lines[1]||'')}</p><div class="education-facts">${block.lines.slice(2).map(line=>`<p>${formatEducationFact(line)}</p>`).join('')}</div></article>`).join('')}</div>
  ${coursework?`<div class="coursework"><h3>${esc(coursework.title)}</h3><div class="pill-list">${coursework.lines.join(' ').split(';').map(x=>x.trim()).filter(Boolean).map(x=>`<span class="course-pill">${esc(x.replace(/[.]$/,''))}</span>`).join('')}</div></div>`:''}
 </div></section>`;
}
function renderResearch(){
 const blocks=contentBlocks(data.sections.Research);
 const interests=blocks.find(b=>/interests/i.test(b.title));
 const main=blocks.filter(b=>b!==interests);
 const research=main.filter(b=>!/toolkit|methods/i.test(b.title));
 const focus=interests?interests.lines.join(' ').split(';').map(x=>x.trim()).filter(Boolean):[];
 return `<section id="research-publications" class="page-section" aria-labelledby="research-publications-title"><div class="container">
   ${heading(3,'Research & Publications','Current research directions, undergraduate thesis work, and scholarly outputs.')}
   ${focus.length?`<div class="focus-strip"><h3>Research interests</h3><div class="pill-list">${focus.map(x=>`<span class="focus-pill">${esc(x.replace(/[.]$/,''))}</span>`).join('')}</div></div>`:''}
   <div class="research-grid">${research.map(block=>`<article class="research-card"><p class="mini-overline">RESEARCH</p><h3>${esc(block.title)}</h3><p class="preserve-lines">${linkify(block.lines.join('\n'))}</p></article>`).join('')}</div>
   <div class="subsection-heading publications-heading"><div><p class="mini-overline">RESEARCH OUTPUTS</p><h3>Publications</h3></div><span class="quiet-count">${data.publicationItems.length} entries</span></div>
   ${(data.sections.Publications||'').trim()?`<p class="section-extra preserve-lines">${linkify(data.sections.Publications.trim())}</p>`:''}
   <div class="publications-list">${data.publicationItems.map((item,index)=>renderCatalogItem(item,'publication',index)).join('')}</div>
  </div></section>`;
}
function renderCatalogItem(item,kind,index){
 const isPub=kind==='publication';
 const sources=(Array.isArray(item.images)?item.images:[]).map(path=>safeUrl(path,true)).filter(Boolean);
 const gallery=sources.length?`<div class="media-gallery" hidden aria-label="Photos for ${esc(item.title||'item')}"><div class="gallery-meta"><span class="gallery-label">IMAGES <span class="gallery-hint">&#183; scroll to explore, click to enlarge</span></span><span class="gallery-count" aria-live="polite"></span></div><div class="gallery-strip">${sources.map((src,i)=>`<button type="button" class="gallery-tile" data-image="${esc(src)}" data-title="${esc(item.title||'Item')}" aria-label="Enlarge photo ${i+1} of ${esc(item.title||'item')}" hidden><img src="${esc(src)}" alt="${esc(item.title||'Item')} - photo ${i+1}" loading="eager" decoding="async"></button>`).join('')}</div></div>`:'';
 const link=safeUrl(item.link);
 return `<article class="work-card ${isPub?'publication-card':'project-card'}" id="${kind}-${index}" ${!isPub?`data-category="${esc(item.category||'Other')}"`:''}>
  <div class="work-meta"><span class="work-category">${esc(item.category|| (isPub?'Publication':'Project'))}</span>${item.status?`<span class="work-status">${esc(item.status)}</span>`:''}</div>
  <h4>${esc(item.title||'Untitled')}</h4>${item.meta?`<p class="work-keywords">${esc(item.meta)}</p>`:''}
  <p class="work-description">${esc(item.description||'')}</p>
  ${link?`<a class="work-link" target="_blank" rel="noopener noreferrer" href="${esc(link)}">${isPub?'View publication':'View project'} <span aria-hidden="true">&#8599;</span></a>`:''}
  ${gallery}
 </article>`;
}
function renderProjects(){
 const categories=[...new Set(data.projectItems.map(item=>item.category||'Other'))];
 return `<section id="projects" class="page-section section-soft" aria-labelledby="projects-title"><div class="container">
  ${heading(4,'Projects',`A selection of ${data.projectItems.length} research, software, and hands-on engineering projects.`)}
  ${(data.sections.Projects||'').trim()?`<p class="section-extra preserve-lines">${linkify(data.sections.Projects.trim())}</p>`:''}
  <div class="project-toolbar"><p id="project-count">${data.projectItems.length} projects</p><label class="filter-label" for="project-filter">Filter by area <select id="project-filter"><option value="all">All areas</option>${categories.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join('')}</select></label></div>
  <div class="projects-grid">${data.projectItems.map((item,index)=>renderCatalogItem(item,'project',index)).join('')}</div>
  </div></section>`;
}
function renderExperience(){
 const blocks=contentBlocks(data.sections.Experience);
 return `<section id="experience" class="page-section" aria-labelledby="experience-title"><div class="container">
 ${heading(5,'Experience','Research, industry, and academic contributions.')}
 <div class="experience-list">${blocks.map(block=>{const lines=block.lines;return `<article class="experience-item"><div class="timeline-point" aria-hidden="true"></div><div class="experience-body"><h3>${esc(block.title)}</h3>${lines[0]?`<p class="experience-place">${esc(lines[0])}</p>`:''}${lines.slice(1).map(line=>`<p class="experience-detail">${linkify(line)}</p>`).join('')}</div></article>`}).join('')}</div>
 </div></section>`;
}
function renderSkillsAchievements(){
 const skills=contentBlocks(data.sections.Skills);
 const honors=contentBlocks(data.sections.Achievements);
 return `<section id="skills-achievements" class="page-section section-soft" aria-labelledby="skills-achievements-title"><div class="container">
  ${heading(6,'Skills & Achievements','Technical tools, engineering capabilities, scholarships, and recognition.')}
  <div class="subsection-heading"><div><p class="mini-overline">WHAT I WORK WITH</p><h3>Technical skills</h3></div></div>
  <div class="skills-grid">${skills.map(block=>{const tools=block.lines.join(' | ').split(/\s*\|\s*/).map(x=>x.trim()).filter(Boolean);return `<article class="skill-card"><h4>${esc(block.title)}</h4><div class="skill-pills">${tools.map(tool=>`<span>${esc(tool)}</span>`).join('')}</div></article>`}).join('')}</div>
  <div class="subsection-heading achievements-heading"><div><p class="mini-overline">RECOGNITION</p><h3>Honors & Achievements</h3></div></div>
  <article class="honor-card honors-combined"><div class="honor-groups">${honors.map(block=>`<div class="honor-group"><h4>${esc(block.title)}</h4><ul>${block.lines.map(line=>`<li>${esc(line)}</li>`).join('')}</ul></div>`).join('')}</div></article>
 </div></section>`;
}
function renderContact(){
 const blocks=contentBlocks(data.sections.Contact),social=data.socialLinks||{};
 const socialCards=[];
 function addEmail(name,address){
  if(typeof address==='string'&&/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(address))socialCards.push({label:name,value:address,mark:'@',href:'mailto:'+encodeURIComponent(address),external:false});
 }
 addEmail('Email',data.email);addEmail('BUET email',social.secondaryEmail);
 for(const [key,label,mark] of [['linkedin','LinkedIn','in'],['github','GitHub','GH'],['facebook','Facebook','f'],['kaggle','Kaggle','K']]){
  if(safeUrl(social[key]))socialCards.push({label,value:social[key],mark,href:safeUrl(social[key]),external:true});
 }
 return `<section id="contact" class="page-section contact-section" aria-labelledby="contact-title"><div class="container">
  ${heading(7,'Contact','Open to discussions about wireless networking, machine learning, and engineering research.')}
  <div class="contact-layout"><div class="contact-intro">${blocks.map(block=>`<div class="contact-copy-block"><h3>${esc(block.title)}</h3><p class="preserve-lines">${linkify(block.lines.join('\n'))}</p></div>`).join('')}
  <div class="contact-cvs">${safeUrl(data.cv)?`<a href="${esc(safeUrl(data.cv))}" target="_blank" rel="noopener noreferrer" class="button button-inverted">Academic CV <span aria-hidden="true">&#8599;</span></a>`:''}${safeUrl(data.masterCv)?`<a href="${esc(safeUrl(data.masterCv))}" target="_blank" rel="noopener noreferrer" class="button button-ghost">Full CV <span aria-hidden="true">&#8599;</span></a>`:''}</div></div>
  <div class="contact-links">${socialCards.map(link=>`<a class="contact-card" href="${esc(link.href)}" ${link.external?'target="_blank" rel="noopener noreferrer"':''}><span class="contact-monogram" aria-hidden="true">${esc(link.mark)}</span><span class="contact-labels"><strong>${esc(link.label)}</strong><small>${esc(link.value)}</small></span><span aria-hidden="true" class="contact-arrow">&#8599;</span></a>`).join('')}</div></div>
 </div></section>`;
}


// This personal-interest card is intentionally the final content block, after Contact.
function renderBeyondLab(){
 const text=(data.beyondLab||'').trim();
 if(!text)return '';
 return `<section class="beyond-section" aria-labelledby="beyond-title"><div class="container">
   <div class="beyond-card"><div class="beyond-heading"><p class="mini-overline">PERSONAL INTERESTS</p><h2 id="beyond-title">Beyond the Lab</h2>
   <div class="beyond-tags"><span>Cricket</span><span>Travel</span><span>Aviation</span></div></div>
   <p>${esc(text)}</p></div>
 </div></section>`;
}

let scrollQueued=false;
function updateActiveNavigation(){
 const links=[...document.querySelectorAll('.site-nav a')];
 const cutoff=$('#site-header').getBoundingClientRect().height+115;
 let active='home';
 for(const entry of navigation){const section=document.getElementById(entry.id);if(section&&section.getBoundingClientRect().top<=cutoff)active=entry.id;}
 if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-8)active='contact';
 for(const link of links){const on=link.getAttribute('href')==='#'+active;link.classList.toggle('active',on);if(on)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}
 scrollQueued=false;
}
function requestNavUpdate(){if(!scrollQueued){scrollQueued=true;requestAnimationFrame(updateActiveNavigation);}}
function setupGalleries(){
 document.querySelectorAll('.media-gallery').forEach(gallery=>{
  const tiles=[...gallery.querySelectorAll('.gallery-tile')];
  const update=()=>{
   const count=tiles.filter(tile=>!tile.hidden).length;
   gallery.hidden=count===0;
   gallery.querySelector('.gallery-count').textContent=`${count} ${count===1?'photo':'photos'}`;
  };
  for(const tile of tiles){
   const img=tile.querySelector('img');
   const show=()=>{tile.hidden=false;update();};
   const hide=()=>{tile.hidden=true;update();};
   img.addEventListener('load',show,{once:true});
   img.addEventListener('error',hide,{once:true});
   if(img.complete){if(img.naturalWidth>0)show();else hide();}
  }
  update();
 });
}
function setupProjectFilter(){
 const select=$('#project-filter');if(!select)return;
 select.addEventListener('change',()=>{
  const cards=[...document.querySelectorAll('.project-card')];
  const value=select.value;
  let visible=0;
  for(const card of cards){card.hidden=value!=='all'&&card.dataset.category!==value;if(!card.hidden)visible++;}
  $('#project-count').textContent=`${visible} ${visible===1?'project':'projects'}`;
 });
}
function render(){
 document.title=`${data.name} | Research & Engineering Portfolio`;
 const description=$('meta[name="description"]');if(description)description.content=String(data.bio||'').replace(/\s+/g,' ').slice(0,155);
 $('.brand-name').textContent=data.name||'Md Jaied Hasan';
 $('.owner').textContent=data.name;
 $('#year').textContent=String(new Date().getFullYear());
 $('.site-nav').innerHTML=navigation.map(link=>`<a href="#${link.id}">${esc(link.label)}</a>`).join('');
 $('#main').innerHTML=renderHome()+renderEducation()+renderResearch()+renderProjects()+renderExperience()+renderSkillsAchievements()+renderContact()+renderBeyondLab();
 setupGalleries();setupProjectFilter();requestNavUpdate();
}

// Gallery lightbox opens only successfully loaded images, supports keyboard arrows and Escape.
let galleryImages=[],activeImage=0;
function showLightbox(index){
 if(!galleryImages.length)return;
 activeImage=(index+galleryImages.length)%galleryImages.length;
 const image=galleryImages[activeImage];
 $('#lightbox-img').src=image.src;
 $('#lightbox-img').alt=image.alt;
 $('#lightbox-caption').textContent=`${image.title}  -  ${activeImage+1} / ${galleryImages.length}`;
 $('#lightbox-prev').hidden=galleryImages.length<2;
 $('#lightbox-next').hidden=galleryImages.length<2;
}
$('#main').addEventListener('click',event=>{
 const tile=event.target.closest('.gallery-tile');
 if(!tile||tile.hidden)return;
 const gallery=tile.closest('.media-gallery');
 const peers=[...gallery.querySelectorAll('.gallery-tile:not([hidden])')];
 galleryImages=peers.map(t=>({src:t.dataset.image,title:t.dataset.title,alt:t.querySelector('img').alt}));
 showLightbox(peers.indexOf(tile));
 $('#lightbox').showModal();
});
$('#lightbox-prev').addEventListener('click',()=>showLightbox(activeImage-1));
$('#lightbox-next').addEventListener('click',()=>showLightbox(activeImage+1));
$('#lightbox-close').addEventListener('click',()=>$('#lightbox').close());
$('#lightbox').addEventListener('keydown',event=>{
 if(event.key==='ArrowLeft')showLightbox(activeImage-1);
 if(event.key==='ArrowRight')showLightbox(activeImage+1);
});
$('#lightbox').addEventListener('click',event=>{if(event.target===$('#lightbox'))$('#lightbox').close();});

// Search navigates within the page. Search results can also deep-link to individual items.
$('#search').addEventListener('click',()=>{$('#search-dialog').showModal();$('#query').focus();});
$('#query').addEventListener('input',event=>{
 const term=event.target.value.toLowerCase().trim();
 if(!term){$('#results').innerHTML='';return;}
 const results=[];
 const sectionText={
  home:[data.name,data.bio,data.tagline,data.beyondLab].join(' '),
  education:data.sections.Education||'',
  'research-publications':[data.sections.Research,data.sections.Publications].join(' '),
  projects:data.sections.Projects||'',
  experience:data.sections.Experience||'',
  'skills-achievements':[data.sections.Skills,data.sections.Achievements].join(' '),
  contact:[data.sections.Contact,data.email,...Object.values(data.socialLinks||{})].join(' ')
 };
 for(const entry of navigation){
  if((entry.label+' '+sectionText[entry.id]).toLowerCase().includes(term))results.push({title:entry.label,subtitle:'Section',target:entry.id});
 }
 for(const [key,kind] of [['publicationItems','publication'],['projectItems','project']]){
  data[key].forEach((item,index)=>{
   if([item.title,item.description,item.status,item.category,item.meta].join(' ').toLowerCase().includes(term)){
    results.push({title:item.title||'Untitled',subtitle:item.category||kind,target:`${kind}-${index}`});
   }
  });
 }
 $('#results').innerHTML=results.length?results.slice(0,35).map(result=>`<a href="#${esc(result.target)}" data-scroll-target="${esc(result.target)}"><strong>${esc(result.title)}</strong><small>${esc(result.subtitle)}</small></a>`).join(''):'<p class="no-results">No matches. Try a project title, topic, or technology.</p>';
});
$('#results').addEventListener('click',event=>{
 const anchor=event.target.closest('a[data-scroll-target]');if(!anchor)return;
 const target=anchor.dataset.scrollTarget;
 if(target.startsWith('project-')&&$('#project-filter')){
  $('#project-filter').value='all';$('#project-filter').dispatchEvent(new Event('change'));
 }
 $('#search-dialog').close();
 requestAnimationFrame(()=>{document.getElementById(target)?.scrollIntoView({behavior:'smooth',block:'start'});});
});
for(const button of document.querySelectorAll('.close'))button.addEventListener('click',()=>button.closest('dialog').close());
$('#search-dialog').addEventListener('click',event=>{if(event.target===$('#search-dialog'))$('#search-dialog').close();});
window.addEventListener('scroll',requestNavUpdate,{passive:true});
window.addEventListener('resize',requestNavUpdate,{passive:true});
window.addEventListener('hashchange',requestNavUpdate);


render();
// A direct link to a section or catalog item also works when the page first opens.
requestAnimationFrame(()=>{
 const target=decodeURIComponent(location.hash.slice(1));
 if(target)document.getElementById(target)?.scrollIntoView({behavior:'instant',block:'start'});
 requestNavUpdate();
});
