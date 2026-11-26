from playwright.sync_api import sync_playwright
from pathlib import Path
p=Path(__file__).resolve().parent/'Destinos_da_Costa_v21.html'
with sync_playwright() as pw:
 b=pw.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox']);c=b.new_context(viewport={'width':1280,'height':920});c.route('https://**/*',lambda r:r.abort());page=c.new_page();err=[];page.on('pageerror',lambda e:err.append(str(e)))
 page.set_content('<script>window.__store={};Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem:k=>window.__store[k]??null,setItem:(k,v)=>window.__store[k]=String(v),removeItem:k=>delete window.__store[k]}})</script>'+p.read_text(),wait_until='domcontentloaded')
 page.locator('#visual-toggle').click()
 sample=page.evaluate('''()=>{let input={name:'Teste de jornada',birth:'1993-10-31',cityId:'buzios',personality:'competitive'};let s=DC_ENGINE.simulate(input);return {input,ev:Object.fromEntries(['capture','evolution','battle','memory','trade'].map(k=>[k,s.events.find(e=>e.kind===k&& (k!=='memory'||e.source))?.id])),last:s.events.at(-1).id}}''')
 def load(id,finished=False):
  page.evaluate('''x=>localStorage.setItem('destinos-da-costa-v201',JSON.stringify({version:DC_ENGINE.version,input:x.input,eventId:x.id,step:0,finished:x.finished}))''',{'input':sample['input'],'id':id,'finished':finished});page.locator('#load').click()
 for k,id in sample['ev'].items():
  assert id,k;load(id);assert page.locator('.chapter-location').is_visible();assert page.locator('.chapter-card').is_visible()
  if k=='battle':assert not page.locator('.chapter-changes').count();assert not page.locator('.battle-end').count();page.locator('#next-chapter').click()
  else:assert page.locator('.story-copy').count()
  if k=='memory':assert page.locator('.memory-note').count();page.locator('.memory-note summary').click();assert page.locator('.memory-note p').is_visible();page.screenshot(path='Destinos_da_Costa_v21_memoria.png',full_page=True)
  if k=='evolution':assert '→' in page.locator('.chapter-changes').inner_text();assert page.locator('.cine-replay').is_visible();page.locator('.cine-replay').click();assert page.locator('#cinematic').evaluate('(e)=>e.open');page.locator('#cinematic-skip').click()
  if k=='capture':assert 'Novo companheiro' in page.locator('.chapter-changes').inner_text();page.screenshot(path='Destinos_da_Costa_v21_capitulo.png',full_page=True)
 load(sample['last'],True);assert page.locator('.tabs').is_visible();page.locator('[data-tab=team]').click();page.locator('#panel [data-uid]').first.click();assert page.locator('.bio-story').is_visible();page.locator('#detail .close').click()
 page.set_viewport_size({'width':390,'height':844});load(sample['ev']['capture']);assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1');page.screenshot(path='Destinos_da_Costa_v21_mobile.png',full_page=True)
 duo=page.evaluate('''()=>{let input={a:{name:'Ana',birth:'1990-05-02',cityId:'buzios'},b:{name:'Bruno',birth:'1991-01-02',cityId:'cabo-frio'},relation:'friendship'};let s=DC_ENGINE.simulatePair(input.a,input.b,{relation:input.relation});let x=s.timeline.find(t=>t.shared&&s.shared.find(x=>x.id===t.shared&&!x.battle));return {input,key:x.shared}}''');page.evaluate('''x=>localStorage.setItem('destinos-da-costa-v201-dupla',JSON.stringify({version:DC_ENGINE.version,input:x.input,key:x.key,step:0,done:false}))''',duo);page.locator('#load-pair').click();assert page.locator('.pair-chapter .story-copy').is_visible();assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1');page.locator('#pair-next').click();assert not err,err;print('PASS: 5 tipos de capítulo, memória, animação, biografia, mobile, dupla; erros JS:',err);b.close()
