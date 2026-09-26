import sharp from 'sharp';
const ids = process.argv.slice(2);
const T = 12;
async function flat(file, crop) {
  let img = sharp(file);
  const m = await img.metadata();
  let W = m.width, H = m.height, L = 0, Tp = 0;
  if (crop) { L = Math.round(crop.x*W); Tp = Math.round(crop.y*H); W = Math.round(crop.w*m.width); H = Math.round(crop.h*m.height);
    img = sharp(file).extract({ left:L, top:Tp, width:W, height:H }); }
  const { data, info } = await img.greyscale().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  let tiles=0, flatT=0;
  for (let y=0;y+T<=h;y+=T) for (let x=0;x+T<=w;x+=T){
    let s=0,s2=0;
    for(let j=0;j<T;j++) for(let i=0;i<T;i++){ const v=data[(y+j)*w+(x+i)]; s+=v; s2+=v*v; }
    const n=T*T, mean=s/n, sd=Math.sqrt(Math.max(0,s2/n-mean*mean));
    tiles++; if(sd<6) flatT++;
  }
  return { pct: (100*flatT/tiles).toFixed(1), tiles };
}
for (const id of ids) {
  const f = `public/media/stills/${id}-960.webp`;
  try {
    const whole = await flat(f);
    // crop A: what a 0.863-ratio box shows from a portrait source (full width, 87% height, biased up)
    const a = await flat(f, {x:0,y:0.02,w:1,h:0.87});
    // crop B: a 0.73 box from portrait -> 97% width full height
    const b = await flat(f, {x:0.015,y:0,w:0.97,h:1});
    // crop C: a wide band 1.3 ratio -> full width, 58% height centred
    const c = await flat(f, {x:0,y:0.16,w:1,h:0.58});
    console.log(id.padEnd(22), 'whole', whole.pct+'%', '| 1440crop', a.pct+'%', '| 2531crop', b.pct+'%', '| phoneband', c.pct+'%');
  } catch(e){ console.log(id, 'ERR', e.message); }
}
