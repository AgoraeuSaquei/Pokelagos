from pathlib import Path
import os
from playwright.sync_api import sync_playwright

html = (Path(__file__).resolve().parent / 'Destinos_da_Costa_v211.html').read_text()
with sync_playwright() as p:
    opts = {'args': ['--no-sandbox']}
    if os.environ.get('CHROMIUM_PATH'):
        opts['executable_path'] = os.environ['CHROMIUM_PATH']
    browser = p.chromium.launch(**opts)
    page = browser.new_page(viewport={'width':390,'height':844})
    page.route('https://**/*', lambda r:r.abort())
    errors = []
    page.on('pageerror', lambda e:errors.append(str(e)))
    page.set_content('<script>window.__store={};Object.defineProperty(window,"localStorage",{configurable:true,value:{getItem:k=>window.__store[k]??null,setItem:(k,v)=>window.__store[k]=String(v),removeItem:k=>delete window.__store[k]}})</script>'+html, wait_until='domcontentloaded')
    page.locator('#visual-toggle').click()
    sample = page.evaluate("""()=>{let input={name:'Teste de jornada',birth:'1993-10-31',cityId:'buzios',personality:'competitive'};let s=DC_ENGINE.simulate(input);return {input,id:s.events.find(e=>e.battle?.duels[0].turns)?.id,capture:s.events.find(e=>e.kind==='capture')?.id}}""")
    def load(event_id):
        page.evaluate("""x=>localStorage.setItem('destinos-da-costa-v201',JSON.stringify({version:DC_ENGINE.version,input:x.input,eventId:x.id,step:0,finished:false}))""",{'input':sample['input'],'id':event_id})
        page.locator('#load').click()
    load(sample['capture'])
    assert page.locator('#next-chapter').bounding_box()['y'] < page.locator('.journey-team').bounding_box()['y']
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
    load(sample['id'])
    page.locator('.battle-play').click()
    page.wait_for_function("document.querySelector('.duel-label').textContent.includes('MOMENTO 2/')")
    page.locator('.battle-play').click()
    page.wait_for_timeout(1800)
    assert 'MOMENTO 2/' in page.locator('.duel-label').inner_text()
    page.locator('.battle-skip').click()
    assert page.locator('.battle-end').is_visible()
    assert 'Continuar jornada' in page.locator('#next-chapter').inner_text()
    page.set_viewport_size({'width':1280,'height':900})
    load(sample['capture'])
    assert page.locator('.journey-team').bounding_box()['x'] > page.locator('.chapter-card').bounding_box()['x']
    page.set_viewport_size({'width':390,'height':844})
    duo = page.evaluate("""()=>{let input={a:{name:'Ana',birth:'1990-05-02',cityId:'buzios'},b:{name:'Bruno',birth:'1991-01-02',cityId:'cabo-frio'},relation:'friendship'};let s=DC_ENGINE.simulatePair(input.a,input.b,{relation:input.relation});let t=s.timeline.find(t=>!t.shared&&s.people[t.person].events[t.index].battle?.duels[0].turns);return {input,key:t.person+':'+s.people[t.person].events[t.index].id}}""")
    page.evaluate("""x=>localStorage.setItem('destinos-da-costa-v201-dupla',JSON.stringify({version:DC_ENGINE.version,input:x.input,key:x.key,step:0,done:false}))""",duo)
    page.locator('#load-pair').click()
    assert page.locator('#pair-next').bounding_box()['y'] < page.locator('.pair-teams').bounding_box()['y']
    page.locator('.battle-play').click()
    page.wait_for_function("document.querySelector('.duel-label').textContent.includes('MOMENTO 2/')")
    page.locator('.battle-skip').click()
    assert page.locator('#pair-next').inner_text().startswith('Continuar jornada')
    assert not errors, errors
    browser.close()
    print('PASS: mobile, desktop, play, pause, skip, dupla')
