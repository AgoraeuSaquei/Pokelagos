from pathlib import Path
p=Path(__file__).resolve().parent;s=(p/'index.html').read_text();s=s.replace('<link rel="stylesheet" href="style.css">','<style>'+ (p/'style.css').read_text()+'</style>');
for f in ('data.js','engine.js','scenes.js','visuals.js','narrative.js','app.js'):
 s=s.replace(f'<script defer src="{f}"></script>', '')
s=s.replace('</body>', ''.join('<script>'+ (p/f).read_text().replace('</script','<\\/script')+'</script>' for f in ('data.js','engine.js','scenes.js','visuals.js','narrative.js','app.js'))+'</body>');(p/'Destinos_da_Costa_v211.html').write_text(s)
