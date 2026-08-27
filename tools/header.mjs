import { chromium } from 'playwright';
const url = process.argv[2];
const b = await chromium.launch();
for (const w of [320, 375, 414, 768]) {
  const p = await b.newPage({ viewport: { width: w, height: 780 } });
  await p.goto(url, { waitUntil: 'networkidle' });
  const r = await p.evaluate(() => {
    const g = s => { const e = document.querySelector(s); if (!e) return null;
      const b = e.getBoundingClientRect(), c = getComputedStyle(e);
      return { l: Math.round(b.left), r: Math.round(b.right), w: Math.round(b.width), h: Math.round(b.height),
               fs: c.fontSize, lh: c.lineHeight, display: c.display }; };
    return { header: g('.header'), logo: g('.logo'), icon: g('#menu-icon'), root: getComputedStyle(document.documentElement).fontSize };
  });
  console.log(`  ${w}px  root=${r.root}`);
  console.log(`     header h=${r.header.h} ${r.header.l}..${r.header.r}`);
  console.log(`     logo   w=${r.logo.w} h=${r.logo.h} fs=${r.logo.fs} ${r.logo.l}..${r.logo.r}`);
  console.log(`     icon   w=${r.icon.w} h=${r.icon.h} fs=${r.icon.fs} lh=${r.icon.lh} display=${r.icon.display} ${r.icon.l}..${r.icon.r}`);
  await p.close();
}
await b.close();
