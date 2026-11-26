/* V2.1: presentation layer only. No randomness or state mutation in the simulator. */
(()=>{'use strict';
const scenes=window.DC_SCENES, D=window.DC_DATA;
const labels={praia:'Praia',praia_noite:'Litoral à noite',costao:'Costão rochoso',mar:'Mar aberto',barco:'A bordo',lagoa:'Margens da lagoa',salina:'Salinas',restinga:'Restinga',rio:'Rio e córregos',brejo:'Área alagada',mata:'Mata Atlântica',trilha:'Trilha',rural:'Campos rurais',morro:'Morros e serras',ruinas:'Ruínas',cidade:'Cidade',festival:'Festival regional',centro:'Centro Pokémon',caverna:'Caverna',laboratorio:'Laboratório',arena:'Arena Pokémon',casa:'Em casa'};
const habitats={costa:'praia',mar:'mar',recife:'costao',lagoa:'lagoa',rio:'rio',mata:'mata',restinga:'restinga',urbano:'cidade',rural:'rural',morro:'morro',caverna:'caverna',salina:'salina',noturno:'praia_noite',brejo:'brejo',externo:'cidade'};
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function select(e){let place=norm(e.place),t=norm(`${e.title||''} ${e.text||''}`),k=e.kind||e.type||'';let scene;
 if(e.battle||k==='battle'||k==='competition')scene='arena';
 else if(/laboratorio|pesquisador.*restaur/.test(t)&&['evolution','fossil','study','status'].includes(k))scene='laboratorio';
 else if(k==='birth'||k==='family')scene='casa';
 else if(k==='festival'||/festival|feira regional/.test(place))scene='festival';
 else if(/centro pokemon/.test(place))scene='centro';
 else if(/caverna|gruta/.test(place+' '+t))scene='caverna';
 else if(/ruina|sitio arqueologico/.test(place+' '+t))scene='ruinas';
 else if(/barco|embarcacao|escuna|a bordo|travessia maritima/.test(t))scene='barco';
 else if(/salina/.test(place))scene='salina';
 else if(/lagoa|canal|itatijuru|it ajuru|itajuru/.test(place))scene='lagoa';
 else if(/brejo|pantano/.test(place))scene='brejo';
 else if(/rio |corrego|cachoeira/.test(place))scene='rio';
 else if(/costao|lagoinha|rocha/.test(place))scene='costao';
 else if(/trilha|emergencias/.test(place))scene='trilha';
 else if(/reserva|mata|floresta|poco das antas/.test(place))scene='mata';
 else if(/serra|morro|sapiatiba/.test(place))scene='morro';
 else if(/fazenda|campo|sitio/.test(place))scene='rural';
 else if(/duna|restinga/.test(place))scene='restinga';
 else if(/praia|ilha|pontal|geriba|joao fernandes|ferradura|orla/.test(place))scene='praia';
 else if(/mar aberto|oceano|profundezas/.test(place))scene='mar';
 else if(/rua|praca|centro|mercado|bairro/.test(place))scene='cidade';
 else scene=habitats[D.cities.find(c=>c.id===e.city)?.primary]||'cidade';
 const night=e.ecology?.kind==='night'||e.ecology?.kind==='eclipse'||/durante a noite|ao anoitecer|de madrugada|noite estrelada|sob a lua|em uma noite|noturna/.test(t);
 const weather=/tempestade|chuva forte|chovia|chuva intensa/.test(t)?'rain':/neblina|nevoeiro/.test(t)?'mist':'';
 const indoor=['arena','casa','laboratorio','caverna'].includes(scene);
 if(night&&scene==='praia')scene='praia_noite';
 return {scene,night:night&&!indoor&&scene!=='praia_noite',weather:indoor?'':weather,label:labels[scene]+(e.ecology?.label?' · '+e.ecology.label:'')};
}
function paint(el,info,caption=true){if(!el)return;el.classList.add('pixel-scene');el.style.setProperty('--scene',`url("${scenes[info.scene]}")`);if(info.night)el.classList.add('scene-night');if(info.weather)el.classList.add('scene-'+info.weather);if(caption){let tag=document.createElement('span');tag.className='scene-label';tag.textContent=info.label+(info.night?' · Noite':'')+(info.weather==='rain'?' · Chuva':info.weather==='mist'?' · Neblina':'');el.prepend(tag)}}
let auto=true;try{auto=localStorage.getItem('dc-v20-auto')!=='off'}catch{}const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
let setting=document.getElementById('visual-toggle');function updateSetting(){setting.textContent=auto?'Animações: ligadas':'Animações: desligadas';setting.setAttribute('aria-pressed',String(auto));document.body.classList.toggle('visual-no-motion',!auto)}setting.onclick=()=>{auto=!auto;try{localStorage.setItem('dc-v20-auto',auto?'on':'off')}catch{}updateSetting()};updateSetting();
const played=new Set();let dialog=document.getElementById('cinematic'),body=document.getElementById('cinematic-body'),skip=document.getElementById('cinematic-skip'),timer=[],active=null;function clear(){timer.forEach(clearTimeout);timer=[];active=null}dialog.addEventListener('close',clear);skip.onclick=()=>dialog.close();
const speciesName=m=>D.species[m?.id]?.name||'Pokémon';
function plan(e,before,visual,shared){if(shared&&e.trade)return {kind:'trade',mons:[e.trade.aOut,e.trade.bOut],after:[e.trade.bOut,e.trade.aOut]};if(e.trade)return {kind:'trade',mons:[e.trade.out,e.trade.in],after:[e.trade.in,e.trade.out]};if(e.battle)return null;
 const prev=new Map((before?.pokemon||[]).map(p=>[p.uid,p])),now=e.snapshot?.pokemon||[],newMons=now.filter(p=>!prev.has(p.uid)&&['active','home','lab'].includes(p.status));
 if(e.kind==='evolution'){let to=now.find(p=>e.pokemon.includes(p.uid)&&prev.has(p.uid)&&prev.get(p.uid).id!==p.id);if(to)return {kind:'evolution',mons:[prev.get(to.uid)],after:[to]};if(visual.length===2)return {kind:'evolution',mons:[visual[0]],after:[visual[1]]};}
 if(['capture','shiny','hatch','legend','fossil'].includes(e.kind)&&newMons.length){let m=newMons.find(p=>e.pokemon?.includes(p.uid))||newMons[0];return {kind:e.kind==='hatch'||e.mystery?.stage==='hatched'?'hatch':'capture',mons:[m],after:[m],shiny:m.shiny,adopt:/ofereceu|criador|resgate|cuidados|escolheu permanecer|ovo|restaur/i.test(e.text||'')||e.kind==='legend'||e.kind==='fossil'};}
 if((e.kind==='shiny'||e.rareMon?.shiny)&&visual.length)return {kind:'shiny',mons:[visual[0]],after:[visual[0]],shiny:true};return null;}
function play(p,info,image){if(dialog.open)dialog.close();clear();active=p;let label={evolution:'Uma transformação',capture:'Um novo vínculo',trade:'Intercâmbio Pokémon',hatch:'O ovo está prestes a eclodir',shiny:'Um brilho diferente'}[p.kind];let sprite=(m,cls)=>`<div class="cine-mon ${cls}">${image(m.id,!!m.shiny,'sprite',true)}</div>`;let primary=p.kind==='hatch'?'<div class="cine-egg"></div>':sprite(p.mons[0],'cine-first');let secondary=p.kind==='trade'?sprite(p.mons[1],'cine-second'):p.kind==='evolution'||p.kind==='hatch'?sprite(p.after[0],'cine-second'):'';body.innerHTML=`<div class="cine-head"><span>DESTINOS DA COSTA · V2.1</span><strong>${label}</strong></div><div class="cine-stage cine-${p.kind}${p.adopt?' cine-adopt':''}${p.shiny?' cine-shiny':''}"><div class="cine-platform"></div>${primary}${secondary}<div class="cine-ball"><i></i></div><div class="cine-glow"></div><div class="cine-particles">${Array.from({length:12},(_,i)=>`<i style="--i:${i}"></i>`).join('')}</div></div><div class="cine-copy" aria-live="polite"><b id="cine-message">${p.kind==='evolution'?esc(speciesName(p.mons[0]))+' está brilhando…':p.kind==='trade'?'Os companheiros se despedem…':p.kind==='hatch'?'Algo está se movendo…':p.kind==='shiny'?'Há algo diferente neste encontro…':'Um encontro que ficará na memória…'}</b><p id="cine-sub">A história está prestes a mudar.</p></div>`;let stage=body.querySelector('.cine-stage');if(p.kind==='evolution'||p.kind==='hatch')stage.querySelector('.cine-second')?.setAttribute('aria-hidden','true');paint(stage,info,false);skip.textContent='Pular animação';dialog.showModal();
 let reveal=()=>{if(!dialog.open||active!==p)return;stage.classList.add('cine-revealed');let hidden=stage.querySelector('.cine-second');if(hidden)hidden.removeAttribute('aria-hidden');let msg=document.getElementById('cine-message'),sub=document.getElementById('cine-sub');msg.textContent=p.kind==='evolution'?`${speciesName(p.mons[0])} evoluiu para ${speciesName(p.after[0])}!`:p.kind==='trade'?'Troca concluída!':p.kind==='shiny'?`${speciesName(p.after[0])} shiny!`:p.kind==='hatch'?`${speciesName(p.after[0])} nasceu!`:`${speciesName(p.after[0])} é seu novo companheiro!`;sub.textContent=p.kind==='trade'?`${speciesName(p.mons[0])} ⇄ ${speciesName(p.mons[1])}`:p.shiny?'Uma lembrança de cores extraordinárias.':'Mais uma página da sua história.';skip.textContent='Continuar jornada →';};
 if(reduced()){stage.classList.add('cine-still');reveal()}else{timer.push(setTimeout(()=>stage.classList.add('cine-moving'),100),setTimeout(reveal,p.kind==='trade'?2100:2500));}
}
function decorate(root,e,before,visual,image,key,shared=false){if(!root||!e)return;let info=select(e);let article=root.querySelector('.chapter-card');if(!article)return;let main=article.querySelector('.chapter-visual');if(e.battle){let arenas=article.querySelectorAll('.versus');if(arenas.length)arenas.forEach(el=>paint(el,info,false));else if(main)paint(main,info);}
 else if(e.trade&&!shared){paint(article.querySelector('.trade-pair'),info)}else if(main){paint(main,info);if(!main.querySelector('.chapter-mon,.pair-mon,.mystery-art,.pair-match'))main.classList.add('scene-landscape');}
 let p=plan(e,before,visual||[],shared);if(!p)return;let replay=document.createElement('button');replay.type='button';replay.className='ghost cine-replay';replay.textContent='▶ Rever animação';replay.onclick=()=>play(p,info,image);article.append(replay);if(auto&&!reduced()&&!played.has(key)){played.add(key);play(p,info,image)}else played.add(key);
}
window.DC_VISUALS={select,paint,plan,decorate};
paint(document.querySelector('.hero-field'),{scene:'praia',label:'Litoral'},false);
})();
