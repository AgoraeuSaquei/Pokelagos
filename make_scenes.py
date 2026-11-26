from PIL import Image,ImageDraw
import random, math, base64,json
from pathlib import Path
W,H=320,168
P=Path(__file__).parent

def scene(key,night=False):
 r=random.Random(key); im=Image.new('RGB',(W,H)); d=ImageDraw.Draw(im)
 def rect(x,y,w,h,c): d.rectangle((int(x),int(y),int(x)+max(1,int(w))-1,int(y)+max(1,int(h))-1),fill=c)
 def poly(points,c): d.polygon([(int(x),int(y)) for x,y in points],fill=c)
 def ell(x,y,w,h,c): d.ellipse((int(x),int(y),int(x)+max(1,int(w))-1,int(y)+max(1,int(h))-1),fill=c)
 def line(points,c,w=1): d.line(points,fill=c,width=w)
 def stripes(y1,y2,colors):
  for y in range(y1,y2): rect(0,y,W,1,colors[min(len(colors)-1,(y-y1)*len(colors)//max(1,y2-y1))])
 def scatter(x1,y1,x2,y2,colors,n,sz=(1,4)):
  for _ in range(n):
   x=r.randrange(x1,x2); y=r.randrange(y1,y2); rect(x,y,r.randint(*sz),1,r.choice(colors))
 def cloud(x,y,s=1):
  col='#eaf5e6' if not night else '#46627b'; shade='#bddbd7' if not night else '#334961'
  for dx,dy,w,h in [(0,9,48,6),(6,5,35,7),(15,0,19,8),(25,4,22,8)]: rect(x+dx*s,y+dy*s,w*s,h*s,col)
  rect(x+4*s,y+14*s,40*s,2*s,shade)
 def tree(x,y,s=1,palm=False):
  # y = ground contact
  if palm:
   for k in range(0,int(42*s),2): rect(x+int(k*.14),y-k,4*s,2,'#8c6148'); rect(x+int(k*.14)+2*s,y-k,1*s,2,'#d5a477')
   a=x+int(42*s*.14); b=y-int(42*s)
   for dx,dy in [(-26,1),(-20,-13),(8,-16),(24,-2),(21,13),(-16,13)]:
    poly([(a,b),(a+dx*s*.7,b+dy*s-3*s),(a+dx*s,b+dy*s),(a+dx*s*.65,b+dy*s+5*s),(a,b+4*s)],'#1d7461'); line([(a,b),(a+dx*s*.8,b+dy*s)],'#5da768',max(1,int(s*2)))
   rect(a-3*s,b,7*s,5*s,'#7d4c37')
  else:
   rect(x-3*s,y-28*s,7*s,28*s,'#634b42');rect(x,y-22*s,2*s,22*s,'#a07e55')
   for dx,dy,w,h,c in [(-21,-48,42,32,'#215f53'),(-19,-54,32,28,'#34795d'),(-9,-60,27,32,'#398b64'),(-18,-51,25,18,'#58a86e'),(1,-48,19,18,'#286d59'),(-6,-58,15,9,'#77b878')]:ell(x+dx*s,y+dy*s,w*s,h*s,c)
   for _ in range(12):rect(x+r.randint(-15,13)*s,y+r.randint(-52,-28)*s,2*s,s,r.choice(['#62ad70','#347b58','#94bd77']))
 def rock(x,y,s=1):
  poly([(x-13*s,y),(x-15*s,y-7*s),(x-8*s,y-18*s),(x+5*s,y-21*s),(x+15*s,y-12*s),(x+17*s,y)],'#526775');poly([(x-15*s,y-7*s),(x-8*s,y-18*s),(x+5*s,y-21*s),(x+8*s,y-14*s),(x-3*s,y-8*s)],'#9aafaa');poly([(x-3*s,y-8*s),(x+8*s,y-14*s),(x+15*s,y-12*s),(x+17*s,y),(x+1*s,y)],'#6f8790')
 def grass(x,y,c='#4c8a58'):
  line([(x-2,y-3),(x,y),(x,y-5)],c);line([(x,y),(x+3,y-4)],c)
 def house(x,y,w=40,h=26,roof='#bc6756',wall='#f0d7a5'):
  rect(x+2,y+2,w,h,'#46616a');rect(x,y,w,h,wall);rect(x,y+h-4,w,4,'#b6a28b');poly([(x-5,y),(x+w//2,y-17),(x+w+5,y)],'#694c50');poly([(x-3,y-2),(x+w//2,y-15),(x+w+3,y-2)],roof);line([(x+3,y-5),(x+w-3,y-5)],'#edb08b',2);rect(x+w//2-4,y+h-14,9,14,'#506e75');rect(x+6,y+7,9,8,'#5a8796');rect(x+w-15,y+7,9,8,'#5a8796');line([(x+6,y+10),(x+14,y+10)],'#dbe5cc');line([(x+w-15,y+10),(x+w-7,y+10)],'#dbe5cc')
 def sky():
  stripes(0,100,['#629cc9','#7abbd3','#a2d6d7','#c6e4d8'] if not night else ['#182747','#233a5c','#385876','#5a7b8a'])
  ell(248,15,23,23,'#fff0bd' if not night else '#dbe7e2')
  if night:
   for _ in range(40):rect(r.randrange(W),r.randrange(0,57),1,1,r.choice(['#b0c7cd','#f5e9c4','#809aae']))
  for x,y in [(18,14),(108,24),(192,9)]:cloud(x,y)
 def mountains(y=86):
  poly([(0,y),(0,y-14),(38,y-39),(76,y-22),(111,y-47),(150,y-25),(190,y-40),(242,y-20),(280,y-35),(320,y-12),(320,y)],'#719eaa')
  poly([(0,y),(0,y-8),(35,y-24),(83,y-12),(128,y-28),(169,y-13),(215,y-25),(270,y-11),(320,y-25),(320,y)],'#4d8c82')
 def water(y=76,bottom=H):
  stripes(y,bottom,['#3a91ad','#409fb7','#4ab6bc','#68c6c0','#8bd6c7']);scatter(0,y+1,W,bottom,['#b0e1d5','#70c6c6','#358fac','#dbedda'],230,(2,11))
 def ground(y=108,col='#83b46e'):
  rect(0,y,W,H-y,col);scatter(0,y,W,H,['#a5c485','#679960','#b6cc85','#5a955f'],250)
 if key in ['praia','costao','mar','barco','lagoa','salina','restinga','rio','brejo','praia_noite']:
  sky();mountains(78);water(78)
  if key in ['praia','praia_noite','costao','restinga','lagoa','salina','rio','brejo']:
   if key in ['praia','praia_noite','costao','restinga']:
    coast=[(0,120),(30,116),(65,124),(95,122),(127,112),(170,114),(210,107),(255,110),(287,101),(320,105),(320,168),(0,168)]
    poly([(x,y-3) for x,y in coast[:-2]]+coast[-2:],'#e2eee1');poly(coast,'#edce95');scatter(0,132,W,168,['#d9b982','#f7deb0','#bca478'],180)
    for x,y in [(5,155),(43,164),(292,158),(316,163)]:tree(x,y,1.0,palm=True)
    if key=='costao':
     for x,y,s in [(5,147,1.8),(45,164,1.1),(280,153,1.8),(318,167,1.9),(255,135,.9)]:rock(x,y,s)
    if key=='restinga':
     for _ in range(65):grass(r.randrange(W),r.randrange(137,168),'#598c58')
   elif key=='salina':
    for x in range(-40,350,63):poly([(x,113),(x+50,113),(x+76,161),(x+14,161)],'#e0aeb0');line([(x,113),(x+50,113),(x+76,161),(x+14,161),(x,113)],'#f4e4c3',3)
    rect(0,162,W,6,'#e2d4af')
   else:
    poly([(0,119),(50,111),(110,133),(172,145),(230,126),(280,117),(320,121),(320,H),(0,H)],'#7cab70');scatter(0,145,W,H,['#aac37b','#527e5b','#5c9462'],100)
    for x,y in [(8,157),(32,164),(300,159),(321,153)]:tree(x,y,.85)
    for _ in range(50):grass(r.randrange(W),r.randrange(149,H))
  if key=='barco':
   poly([(0,128),(52,110),(268,110),(320,128),(320,H),(0,H)],'#946f51');poly([(0,134),(52,116),(268,116),(320,134),(320,H),(0,H)],'#cfa376');
   for y in range(122,168,7):line([(0,y),(320,y)],'#9d765b')
   line([(0,107),(40,98),(280,98),(320,107)],'#f7e8ce',4)
   for x in range(10,320,38):rect(x,99,3,27,'#d9e3dc')
  if key=='mar':
   for x,y in [(15,105),(240,131),(180,92)]:line([(x,y),(x+12,y-1),(x+20,y)],'#e5f6e1',2)
 elif key in ['mata','trilha','rural','morro','ruinas']:
  sky();mountains(92);ground(86)
  if key in ['mata','trilha','ruinas']:
   for x in range(-8,340,21):tree(x+r.randrange(-7,8),112+r.randrange(-9,8),.7)
  poly([(135,85),(177,85),(202,118),(251,168),(64,168),(102,122)],'#c4a980');scatter(113,122,202,167,['#b09872','#e1c392','#9f8d75'],90)
  if key=='rural':
   for x in range(-30,330,22):line([(x,96),(x+50,150)],'#608b52',2)
   house(230,83,49,35,'#a85b50');house(36,90,38,25,'#c08154')
  if key=='morro':
   for x,y,s in [(12,147,1.8),(55,160,1.1),(282,159,1.6)]:rock(x,y,s)
  if key=='ruinas':
   for x in [34,66,250,282]:rect(x,89,12,53,'#657d7b');rect(x-3,88,18,5,'#99a89a');rect(x-2,139,16,4,'#a7b3a3');line([(x+4,96),(x+4,135)],'#b4bead',2)
  for x,y in [(-2,162),(27,170),(307,160),(329,170)]:tree(x,y,1.15)
  for _ in range(65):grass(r.randrange(W),r.randrange(137,168))
 elif key in ['cidade','festival','centro']:
  sky();mountains(78);ground(77,'#99b77c');rect(0,112,W,56,'#a3b1b5');rect(0,116,W,3,'#d9d9bd');rect(0,147,W,3,'#d9d9bd')
  for x in range(4,320,34):rect(x,132,16,2,'#e8e1c6')
  for i,x in enumerate([8,61,116,170,225,277]):house(x,73+(i%2)*4,38,36,['#b96c57','#538a9a','#be8b57'][i%3])
  if key=='centro':
   rect(96,56,128,56,'#eee5cf');rect(91,52,138,13,'#b94855');rect(143,82,34,30,'#48778a');ell(151,59,18,18,'#fff6df');rect(152,67,16,2,'#42546b')
  if key=='festival':
   line([(0,40),(160,59),(320,40)],'#765e60',2)
   for x in range(7,320,17):y=40+int(19*(1-abs(x-160)/160));poly([(x,y),(x+12,y+1),(x+6,y+12)],r.choice(['#ecac53','#d76769','#55b8a5','#e7d18a']))
   for x in [32,246]:rect(x,113,40,19,'#a57c57');poly([(x-4,113),(x+7,98),(x+34,98),(x+44,113)],'#d97863')
  for x in [6,314]:tree(x,169,.85)
 elif key in ['caverna','profundezas']:
  stripes(0,H,['#202d43','#2c3b50','#455365','#596573']);ell(90,19,140,120,'#172b3b');ell(112,40,96,92,'#253d50');poly([(0,134),(63,111),(140,117),(210,111),(320,139),(320,H),(0,H)],'#74838b');scatter(0,141,W,H,['#879a9b','#576b77','#a4aaa6'],150)
  for x in range(-10,340,30):poly([(x,0),(x+24,0),(x+15,r.randrange(28,66))],'#566a76')
  for x,y,s in [(8,144,1.7),(43,161,1.1),(283,158,1.4),(319,162,1.8)]:rock(x,y,s)
  for x,y in [(42,115),(277,120),(22,89),(300,95)]:poly([(x,y),(x-5,y-15),(x+3,y-24),(x+10,y-12),(x+8,y)],'#70c4c6');line([(x+3,y-22),(x+2,y-4)],'#c4f4db',2)
 else: # indoor settings
  stripes(0,99,['#263e58','#3a5870','#58798a']);rect(0,99,W,69,'#93abb4');
  for y in range(100,168,13):line([(0,y),(320,y)],'#7795a1')
  for x in range(-80,401,48):line([(160+(x-160)*.5,99),(x,168)],'#7995a0')
  rect(0,89,W,8,'#b4c7c9');rect(0,96,W,3,'#456475');
  if key=='laboratorio':
   for x in [16,242]:rect(x,37,62,46,'#b6c7c3');rect(x+5,42,52,31,'#315b6c');rect(x+10,46,42,19,'#71b7bb');line([(x+12,59),(x+20,53),(x+28,61),(x+35,49),(x+47,56)],'#d5efd2',2);rect(x-3,83,68,8,'#e4dfc9');rect(x+3,91,56,23,'#b8c9c5')
   for x in [112,194]:rect(x,47,14,36,'#95d6ce');rect(x-2,43,18,5,'#e0e7d8');rect(x-2,83,18,5,'#c6d5cf')
  elif key=='arena':
   for x in range(6,320,26):rect(x,36,18,35,r.choice(['#527a8b','#6c91a0','#42677d']));rect(x,71,18,4,'#92b7b8')
   ell(79,115,162,41,'#c8d5c8');ell(85,119,150,33,'#789ba6');line([(85,135),(235,135)],'#dce6d5',2);ell(148,125,24,21,'#dce6d5');ell(151,128,18,15,'#789ba6')
  else:
   for x in [15,242]:rect(x,34,63,49,'#e4d4b6');rect(x+4,38,55,41,'#7eb8bd');line([(x+31,38),(x+31,79)],'#e4d4b6',3);line([(x+4,58),(x+59,58)],'#e4d4b6',3)
   rect(128,45,64,41,'#765e50');rect(134,51,52,29,'#e8bd83');rect(22,100,60,27,'#b78267');rect(238,100,60,27,'#b78267')
 if night:
  im=Image.blend(im,Image.new('RGB',im.size,'#172b50'),.33)
 return im
keys=['praia','praia_noite','costao','mar','barco','lagoa','salina','restinga','rio','brejo','mata','trilha','rural','morro','ruinas','cidade','festival','centro','caverna','laboratorio','arena','casa']
for k in keys:scene(k,k.endswith('noite')).save(P/'assets/scenes'/f'{k}.png',optimize=True)
assets={k:'data:image/png;base64,'+base64.b64encode((P/'assets/scenes'/f'{k}.png').read_bytes()).decode() for k in keys}
(P/'scenes.js').write_text('window.DC_SCENES='+json.dumps(assets,separators=(',',':'))+';\n')
# overview sheet for inspection
out=Image.new('RGB',(960,((len(keys)+2)//3)*188),'#17243a');dd=ImageDraw.Draw(out)
for i,k in enumerate(keys):x=(i%3)*320;y=(i//3)*188;out.paste(Image.open(P/'assets/scenes'/f'{k}.png'),(x,y));dd.text((x+8,y+170),k,fill='white')
out.save('/mnt/data/Destinos_da_Costa_v20_cenarios.png')
