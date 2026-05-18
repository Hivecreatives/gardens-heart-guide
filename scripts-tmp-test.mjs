import outlineStroke from 'svg-outline-stroke';
import fs from 'node:fs';
const svg = fs.readFileSync('node_modules/lucide-static/icons/heart.svg', 'utf8');
console.log('INPUT:', svg);
const out = await outlineStroke(svg, { color: 'black', steps: 4 });
console.log('OUTPUT:', out);
