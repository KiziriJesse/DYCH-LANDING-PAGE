/**
 * Turns the supplied line-art illustrations into brand-coloured PNGs with a
 * transparent ground.
 *
 * WHY NOT SVG: the source is raster and there was no way to get vectors. It
 * does not matter much here, because the art is flat line work on white and
 * brightness alone carries all the information: white paper becomes fully
 * transparent, the strokes come through near-solid, the pale fill panels
 * survive as a wash, and every surviving pixel is painted one colour. The
 * figure then inherits whatever ground the page puts behind it, which the
 * raster could never do while it carried its own white box.
 *
 * THE CROP: each source has a stub of the connector that joined the three
 * stages in the original composition - a short rule and a half-circle running
 * off one edge. Standing alone those read as stray marks, and the arrows
 * between stages are drawn in markup instead, so they are cropped off here.
 * The crop is found by ink DENSITY per row and column rather than by any ink
 * at all: a connector line is a couple of pixels deep in any column it
 * crosses, the subject is dozens, so a density floor separates them without
 * hand-measuring each file.
 *
 * Usage: node scripts/tint-figure.js <src> <out> [scale]
 */
const sharp = require("sharp");

const BRAND = { r: 0x2f, g: 0x02, b: 0xac }; // --brand-core
const WHITE_CUT = 246; // at or above this it is paper, not ink
const PAD = 12; // breathing room left around the crop, in source pixels

/* How much ink a detached run needs, as a share of the heaviest run, to be
   kept. The default drops connector stubs. Lower it for a drawing whose
   small detached marks are part of the picture - the moon and stars over the
   boarding figure are a fiftieth of the building and vanish at the default. */
async function tint(src, out, scale = 2, keepRatio = 0.16) {
  /* Flattened onto white first: these PNGs already carry an alpha channel,
     and the RGB under a transparent pixel is arbitrary. Flattening makes
     "transparent" and "white" the same thing before anything is measured.
     Upscaled before the mask is built, so the alpha is resampled from the
     smooth original edge rather than from a staircase of one. */
  const base = sharp(src).flatten({ background: "#ffffff" });
  const meta = await base.metadata();
  const w = Math.round(meta.width * scale);
  const h = Math.round(meta.height * scale);
  const raw = await base
    .resize(w, h, { kernel: "lanczos3" })
    .removeAlpha()
    .raw()
    .toBuffer();

  const alpha = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    const lum =
      0.2126 * raw[i * 3] + 0.7152 * raw[i * 3 + 1] + 0.0722 * raw[i * 3 + 2];
    /* A straight 255-minus-luminance mapping leaves the strokes at about 40%
       and the whole figure reads washed out. This curve lifts the ink without
       dragging the pale detection panel up with it. */
    const d = (WHITE_CUT - lum) / WHITE_CUT;
    const dn = Math.min(1, Math.max(0, (d - 0.02) / 0.5));
    const a = Math.round(255 * Math.pow(dn, 0.85));
    alpha[i] = a < 4 ? 0 : a;
  }

  /* Both measured in output pixels, so they hold at any scale. The first
     clears the connector rule itself, which is two source pixels deep in
     every column it crosses. */
  /* Erase the connector rule before anything is measured.

     Cropping alone cannot remove it: the rule runs horizontally out of the
     subject, so the columns it occupies are the subject's own columns. It is
     identified by shape instead - a connected run of ink that is long and
     only a few pixels deep is a rule, not a drawing. The decorative dashes
     this style is full of are short, so they survive; nothing else in these
     four figures is both that long and that flat. */
  const label = new Int32Array(w * h).fill(-1);
  const stack = [];
  for (let seed = 0; seed < w * h; seed++) {
    if (alpha[seed] <= 24 || label[seed] !== -1) continue;
    label[seed] = seed;
    stack.length = 0;
    stack.push(seed);
    let minX = w, maxX = 0, minY = h, maxY = 0;
    const members = [];
    while (stack.length) {
      const p = stack.pop();
      members.push(p);
      const px = p % w, py = (p - px) / w;
      if (px < minX) minX = px;
      if (px > maxX) maxX = px;
      if (py < minY) minY = py;
      if (py > maxY) maxY = py;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = px + dx, ny = py + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const q = ny * w + nx;
          if (alpha[q] > 24 && label[q] === -1) {
            label[q] = seed;
            stack.push(q);
          }
        }
      }
    }
    const runW = maxX - minX + 1;
    const runH = maxY - minY + 1;
    if (runH <= Math.round(4 * scale) && runW >= Math.round(14 * scale)) {
      for (const p of members) alpha[p] = 0;
    }
  }

  const thin = Math.round(3 * scale);
  const gapMax = Math.round(3 * scale);
  const cols = new Int32Array(w);
  const rows = new Int32Array(h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (alpha[y * w + x] > 24) {
        cols[x]++;
        rows[y]++;
      }
    }
  }
  /* A density floor alone keeps the connector: its half-circle is forty
     pixels deep in the columns it crosses, which clears any floor low enough
     to keep the thin end of a jawline. What actually separates them is that
     the connector is DETACHED - a band of empty columns sits between it and
     the subject. So the axis is split into runs of inked lines and the run
     holding the most ink wins; the stubs are dropped whatever their depth. */
  const span = (counts, len) => {
    let best = [0, len - 1];
    let bestInk = -1;
    const runs = [];
    let i = 0;
    while (i < len) {
      if (counts[i] <= thin) {
        i++;
        continue;
      }
      let j = i;
      let ink = 0;
      let gap = 0;
      /* The gap that ends a run is deliberately small. The detached circle in
         the first figure clears its subject by seven source columns; the
         tolerance has to sit under that, or the stub is read as part of the
         subject and survives the crop. */
      while (j < len && gap <= gapMax) {
        if (counts[j] > thin) {
          ink += counts[j];
          gap = 0;
        } else gap++;
        j++;
      }
      runs.push({ start: i, end: j - gap - 1, ink });
      if (ink > bestInk) bestInk = ink;
      i = j;
    }

    /* Keeping ONLY the heaviest run was right while every detached thing in
       these files was a connector stub. It stopped being right the moment a
       figure had two real subjects - the attendance drawing is a doorway and
       a separate checklist sheet, and the sheet was being thrown away as
       though it were a stub.

       Weight separates them cleanly instead. A stub carries a tiny fraction
       of the ink of the thing it points at; a second subject carries a
       comparable share. Everything above a sixth of the heaviest run is kept,
       and the span runs from the first survivor to the last. */
    const kept = runs.filter((r) => r.ink >= bestInk * keepRatio);
    if (kept.length > 0) {
      best = [kept[0].start, kept[kept.length - 1].end];
    }
    /* The winning run still opens and closes on the connector, because the
       rule leaves the subject horizontally and so occupies the subject's own
       columns. Those columns hold four pixels of ink where the drawing
       proper holds dozens, so the two edges are walked inward to the first
       column that carries real weight. It costs a few pixels off the tip of
       a shoulder and takes the whole stub with it. */
    const edge = Math.round(6 * scale);
    let [lo, hi] = best;
    while (lo < hi && counts[lo] < edge) lo++;
    while (hi > lo && counts[hi] < edge) hi--;
    return [lo, hi];
  };
  const [x0, x1] = span(cols, w);
  const [y0, y1] = span(rows, h);
  const pad = PAD * scale;
  const left = Math.max(0, x0 - pad);
  const top = Math.max(0, y0 - pad);
  const width = Math.min(w - 1, x1 + pad) - left + 1;
  const height = Math.min(h - 1, y1 + pad) - top + 1;

  /* The padding is pure margin. Without this the twenty-four pixels added
     back around the subject box re-admit the very stub the crop just walked
     past, because the rule continues straight through it. Anything outside
     the measured box is cleared before the extract, so the breathing room is
     always empty. */
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x < x0 || x > x1 || y < y0 || y > y1) alpha[y * w + x] = 0;
    }
  }

  const rgba = Buffer.alloc(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4] = BRAND.r;
    rgba[i * 4 + 1] = BRAND.g;
    rgba[i * 4 + 2] = BRAND.b;
    rgba[i * 4 + 3] = alpha[i];
  }

  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left, top, width, height })
    .png({ compressionLevel: 9 })
    .toFile(out);

  const m = await sharp(out).metadata();
  console.log(`${out}  ${m.width}x${m.height}  (from ${meta.width}x${meta.height})`);
}

const [, , src, out, scale, keep] = process.argv;
tint(src, out, scale ? Number(scale) : 2, keep ? Number(keep) : 0.16).catch((e) => {
  console.error(e.message);
  process.exit(1);
});
