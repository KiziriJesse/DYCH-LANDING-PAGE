const paths = ["/", "/about", "/product"];
for (const path of paths) {
  const html = await (await fetch(`http://localhost:3000${path}`)).text();
  const grab = (re) => html.match(re)?.[1] ?? "MISSING";
  const desc = grab(/<meta name="description" content="([^"]*)"/);
  console.log(JSON.stringify({
    path,
    title: grab(/<title>([^<]*)<\/title>/),
    desc,
    descLen: desc.length,
    descStarts: desc.includes("DYCH Technologies"),
    ogTitle: grab(/<meta property="og:title" content="([^"]*)"/),
    ogSite: grab(/<meta property="og:site_name" content="([^"]*)"/),
    twTitle: grab(/<meta name="twitter:title" content="([^"]*)"/),
    canonical: grab(/<link rel="canonical" href="([^"]*)"/),
  }, null, 0));
}
const home = await (await fetch("http://localhost:3000/")).text();
const ld = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
const data = JSON.parse(ld);
const org = data["@graph"].find((n) => n["@type"] === "Organization");
console.log(JSON.stringify({ name: org.name, alternateName: org.alternateName, url: org.url }, null, 0));
console.log("h1 brand", home.includes("DYCH Technologies"));
console.log("copyright", home.includes("© 2026 DYCH Technologies. All rights reserved."));
const site = data["@graph"].find((n) => n["@type"] === "WebSite");
console.log("website schema", site?.name === "DYCH Technologies" && site?.url === "https://dychtechnologies.com/");
console.log("home canonical", home.includes('<link rel="canonical" href="https://dychtechnologies.com/"/>'));
console.log("no date tags", !/article:published_time|datePublished/.test(home));
// "Dych Technologies" survives only in the keywords meta and schema
// alternateName, so look at visible text alone.
const visible = home.replace(/<script[\s\S]*?<\/script>|<meta[^>]*>/g, "");
console.log("old brand", visible.includes("Dych Technologies"));
