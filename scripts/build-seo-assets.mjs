import sharp from "sharp";

const logo = await sharp("public/logo/dych-lockup-on-white.png")
  .resize({ width: 440, height: 406, fit: "inside" })
  .png()
  .toBuffer();

const svg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#10014A"/>
      <stop offset="55%" stop-color="#2F02AC"/>
      <stop offset="100%" stop-color="#5909F6"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="330" y="60" width="540" height="510" rx="28" fill="#ffffff"/>
</svg>`);

await sharp(svg)
  .composite([{ input: logo, gravity: "centre" }])
  .png()
  .toFile("public/og-image.png");

const mark = await sharp("src/app/icon.png")
  .resize(128, 128, { fit: "inside" })
  .png()
  .toBuffer();

await sharp({
  create: { width: 180, height: 180, channels: 4, background: "#10014A" },
})
  .composite([{ input: mark, gravity: "centre" }])
  .png()
  .toFile("src/app/apple-icon.png");

const og = await sharp("public/og-image.png").metadata();
const apple = await sharp("src/app/apple-icon.png").metadata();
console.log("og", og.width, og.height);
console.log("apple", apple.width, apple.height);
