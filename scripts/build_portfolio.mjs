import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const entries=JSON.parse(await fs.readFile(path.join(root,'data/portfolio.json'),'utf8'));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const bi=(tag,pair,cls='')=>'<'+tag+(cls?' class="'+cls+'"':'')+' data-en="'+esc(pair[0])+'" data-zh="'+esc(pair[1])+'">'+esc(pair[0])+'</'+tag+'>';
const colors={pmsm:'#7898bc',stepper:'#a38dbe',rail:'#5d9a92',inspection:'#6891b3',flood:'#b29a66',rescue:'#bd8d76'};
const svg=(inside)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 450"><defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#e7ecf2" stroke-width=".7"/></pattern></defs><rect width="760" height="450" fill="#f8fafc"/><rect width="760" height="450" fill="url(#grid)"/>'+inside+'</svg>';
const text=(x,y,t,size=20,color='#334155',extra='')=>'<text x="'+x+'" y="'+y+'" fill="'+color+'" font-family="Arial,sans-serif" font-size="'+size+'" '+extra+'>'+esc(t)+'</text>';
function method(e){let c=colors[e.id],s=text(42,52,e.kind==='paper'?'METHOD / '+e.category[0].toUpperCase():'SYSTEM / '+e.category[0].toUpperCase(),17,c)+text(42,84,'From inputs to evaluation',25);e.steps.forEach((p,i)=>{let x=42+(i%2)*350,y=120+Math.floor(i/2)*146;s+='<rect x="'+x+'" y="'+y+'" width="326" height="100" rx="14" fill="white" stroke="'+c+'" stroke-opacity=".45"/>';s+=text(x+22,y+31,'0'+(i+1),16,c)+text(x+22,y+66,p[0],23);if(i===0||i===2)s+='<path d="M'+(x+330)+' '+(y+50)+'h15m-6-6 6 6-6 6" stroke="'+c+'" fill="none" stroke-width="2"/>';if(i===1)s+='<path d="M555 224v17H205v20m-6-6 6 6 6-6" stroke="'+c+'" fill="none" stroke-width="2"/>';});s+=text(42,421,e.id==='rail'?'ALIGNMENT + FUSION: NEXT RESEARCH STAGE':'MODELING  /  IMPLEMENTATION  /  ANALYSIS',14,'#64748b');return svg(s);}
const rail=svg(text(42,51,'RAIL SURFACE INSPECTION',17,'#52857d')+text(42,87,'Segmentation → alignment → fusion',26)+'<g transform="translate(70 120)"><rect width="270" height="240" rx="16" fill="#e7edf1" stroke="#cbd5e1"/><path d="M55 10v220m14-220v220M206 10v220m14-220v220" stroke="#94a3b8" stroke-width="5"/><path d="m140 27-12 35 21 27-25 31 24 25-18 57" stroke="#64748b" stroke-width="12" fill="none"/><path d="m140 27-12 35 21 27-25 31 24 25-18 57" stroke="#5d9a92" stroke-width="19" stroke-opacity=".4" fill="none"/></g><g fill="white" stroke="#9bbdb6"><rect x="402" y="126" width="292" height="62" rx="12"/><rect x="402" y="215" width="292" height="62" rx="12"/><rect x="402" y="304" width="292" height="62" rx="12"/></g>'+text(425,165,'Lightweight segmentation',20)+text(425,254,'Motion-assisted alignment',20)+text(425,343,'Reliability-aware fusion',20)+'<path d="M548 192v18m-5-5 5 5 5-5M548 281v18m-5-5 5 5 5-5" fill="none" stroke="#5d9a92" stroke-width="2"/>'+text(42,419,'CONCEPTUAL OVERVIEW · ONGOING RESEARCH',14,'#64748b'));
function vehicle(id){
 const rescue=id==='rescue',accent=rescue?'#af795f':'#597f9e',faint=rescue?'#f5ede7':'#eaf0f5';
 const box=(x,y,w,h,title,sub,fill='#fff',stroke='#d4dce5',ink='#334155')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="8" fill="'+fill+'" stroke="'+stroke+'"/>'+text(x+w/2,y+h/2-2,title,22,ink,'text-anchor="middle"')+(sub?text(x+w/2,y+h/2+25,sub,16,fill===accent?'#ffffffcc':'#788595','text-anchor="middle"'):'');
 const wire=(d)=>'<path d="'+d+'" fill="none" stroke="'+accent+'" stroke-width="2" stroke-linejoin="round" marker-end="url(#arrow)"/>';
 let s='<defs><marker id="arrow" markerWidth="7" markerHeight="7" refX="6" refY="3" orient="auto"><path d="M0 0 6 3 0 6" fill="none" stroke="'+accent+'" stroke-width="1.2"/></marker></defs>';
 s+=text(35,44,rescue?'EMERGENCY DRAINAGE':'RAILWAY ENVIRONMENT',17,accent)+text(35,78,'System overview',27,'#263544');
 s+='<path d="M35 96H725" stroke="#dce3ea"/>';
 if(rescue){
  s+=box(35,132,190,84,'Sensor inputs','Level · tilt · current');
  s+=box(281,152,190,112,'S7-1200','PLC controller',accent,accent,'#fff');
  s+=box(530,130,195,74,'Track drive','Differential motion');
  s+=box(530,234,195,74,'Drainage pump','Start / stop');
  s+=wire('M225 174H252V194H281')+wire('M471 192H501V167H530')+wire('M471 222H501V271H530');
  s+=box(35,258,190,71,'Remote control','Command input',faint,'#d6c7bc');
  s+=wire('M225 291H252V230H281');
  s+='<path d="M630 316V363H377V271" fill="none" stroke="'+accent+'" stroke-width="1.8" stroke-dasharray="5 5" marker-end="url(#arrow)"/>';
  s+=text(501,386,'Protective interlocks & feedback',17,accent,'text-anchor="middle"');
 }else{
  s+=box(35,132,190,84,'Environment','T / RH · air · pressure');
  s+=box(281,152,190,112,'STM32','Embedded controller',accent,accent,'#fff');
  s+=box(530,132,195,74,'Motor drive','Vehicle motion');
  s+=box(530,236,195,74,'OLED + alerts','Local status');
  s+=wire('M225 174H252V194H281')+wire('M471 192H501V169H530')+wire('M471 222H501V273H530');
  s+=box(35,258,190,71,'Bluetooth','Wireless commands',faint,'#c9d8e4');
  s+=wire('M225 291H252V230H281');
  s+=box(35,356,190,56,'ESP32-CAM','',faint,'#c9d8e4');
  s+=wire('M225 384H530');
  s+=text(377,373,'Wi-Fi video',16,accent,'text-anchor="middle"');
  s+=box(530,356,195,56,'Remote viewer','');
 }
 s+=text(35,436,'SCHEMATIC · NOT TO SCALE',12,'#8995a2');
 return svg(s);
}
await fs.mkdir(path.join(root,'assets/work'),{recursive:true});
await fs.writeFile(path.join(root,'assets/work/rail-overview.svg'),rail);
await fs.writeFile(path.join(root,'assets/work/inspection-overview-v2.svg'),vehicle('inspection'));
await fs.writeFile(path.join(root,'assets/work/rescue-overview-v2.svg'),vehicle('rescue'));
function card(e){let diagram='assets/work/'+e.id+'-method.svg';return '<article id="work-'+e.id+'" class="work-entry" style="--entry-accent:'+colors[e.id]+'">'+
'<div class="work-row"><div class="work-media"><button type="button" class="visual-toggle" aria-label="Toggle overview and method for '+esc(e.title[0])+'" aria-pressed="false"><span class="image-stack"><img class="overview-image" src="assets/work/'+e.image+'" width="760" height="450" loading="lazy" alt="'+esc(e.imageAlt)+'"><img class="method-image" aria-hidden="true" src="'+diagram+'" width="760" height="450" loading="lazy" alt="'+esc(e.steps.map(s=>s[0]).join(' → '))+'"></span><span class="visual-cue" aria-hidden="true"><span class="cue-overview">'+bi('span',['↗ Explore method','↗ 查看方法'])+'</span><span class="cue-method">'+bi('span',['↙ Back to overview','↙ 返回概览'])+'</span></span></button>'+bi('p',e.caption,'image-caption')+'</div>'+
'<div class="work-copy"><div class="entry-kicker">'+bi('span',e.category)+'<span aria-hidden="true"> / </span><span>'+esc(e.year)+'</span></div>'+bi('h3',e.title)+
'<div class="entry-meta">'+bi('span',e.tag,'status')+'</div>'+(e.authors?'<p class="authors">'+e.authors+'</p>':'')+(e.venue?'<p class="venue">'+esc(e.venue)+'</p>':'')+bi('p',e.summary,'work-summary')+
(e.links.length?'<div class="pub-links">'+e.links.map(l=>'<a href="'+esc(l[1])+'"'+(l[1].startsWith('http')?' target="_blank" rel="noopener"':' download')+'>'+esc(l[0])+'</a>').join('')+'</div>':'')+'</div></div>'+
'<details class="contribution"><summary><span class="summary-icon" aria-hidden="true">+</span>'+bi('span',['My contributions & workflow','我的主要工作与流程'])+bi('span',['Explore','展开'],'summary-end')+'</summary><div class="contribution-body">'+bi('p',e.role,'contribution-role')+'<ul class="contribution-list">'+e.bullets.map(b=>bi('li',b)).join('')+'</ul><ol class="workflow" aria-label="Method workflow">'+e.steps.map((s,i)=>'<li><span class="step-number">0'+(i+1)+'</span>'+bi('span',s)+'</li>').join('')+'</ol>'+bi('p',e.note,'work-note')+'</div></details></article>';}
for(const e of entries)await fs.writeFile(path.join(root,'assets/work/'+e.id+'-method.svg'),method(e));
let html=await fs.readFile(path.join(root,'index.html'),'utf8');
const pub='<section id="publications" class="section" aria-labelledby="pub-title"><h2 id="pub-title"><span class="section-emoji" aria-hidden="true">📄</span>'+bi('span',['Publications','论文'])+'</h2>'+entries.filter(e=>e.kind==='paper').map(card).join('')+'</section>';
const projects='<section id="projects" class="section" aria-labelledby="projects-title"><h2 id="projects-title"><span class="section-emoji" aria-hidden="true">🛠️</span>'+bi('span',['Projects','项目'])+'</h2><div id="research" class="project-group">'+bi('h3',['Ongoing research','在研项目'],'group-title')+entries.filter(e=>e.group==='ongoing').map(card).join('')+'</div><div class="project-group">'+bi('h3',['Engineering systems','工程系统'],'group-title')+entries.filter(e=>e.group==='engineering').map(card).join('')+'</div></section>';
if(html.includes('<!-- PORTFOLIO START -->'))html=html.replace(/<!-- PORTFOLIO START -->[\s\S]*?<!-- PORTFOLIO END -->/,'<!-- PORTFOLIO START -->'+pub+projects+'<!-- PORTFOLIO END -->');
else html=html.replace(/  <section id="research"[\s\S]*?(?=  <section id="experience")/,'<!-- PORTFOLIO START -->'+pub+projects+'<!-- PORTFOLIO END -->\n');
await fs.writeFile(path.join(root,'index.html'),html);
console.log('Built '+entries.length+' work entries and 9 vector diagrams.');
