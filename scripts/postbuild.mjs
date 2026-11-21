import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const dist = path.resolve('dist');
const publicDir = path.resolve('public');
const baseHtmlPath = path.join(dist, 'index.html');
const baseHtml = await readFile(baseHtmlPath, 'utf8');

const pages = [
  {
    slug: 'enterprise-e-commerce-hub',
    title: 'Enterprise E-Commerce Hub | Sabir Ali Project',
    description: 'MERN e-commerce case study covering Redux Toolkit, Stripe, real-time inventory synchronization and resilient checkout workflows.',
  },
  {
    slug: 'ai-world-tech-platform',
    title: 'AI World Tech Platform | Sabir Ali Project',
    description: 'MERN investment platform case study covering ROI tracking, referral rewards, wallet management and authenticated transactions.',
  },
];

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function replaceMetadata(html, { title, description, canonical, noindex = false, type = 'website', jsonLd, shell }) {
  let result = html;
  result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`);

  const replacements = [
    ['description', description],
    ['robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
  ];
  for (const [name, content] of replacements) {
    const pattern = new RegExp(`<meta name="${escapeRegex(name)}"[^>]*>`, 'i');
    if (pattern.test(result)) {
      result = result.replace(pattern, `<meta name="${name}" content="${content}">`);
    } else {
      result = result.replace('</head>', `    <meta name="${name}" content="${content}">\n</head>`);
    }
  }

  result = result.replace(/<link rel="canonical"[^>]*>/i, `<link rel="canonical" href="${canonical}">`);
  result = result.replace(
    /<meta property="og:type"[^>]*>/i,
    `<meta property="og:type" content="${type}">`
  );

  const ogPairs = [
    ['og:title', title],
    ['og:description', description],
    ['og:url', canonical],
  ];
  for (const [property, content] of ogPairs) {
    const pattern = new RegExp(`<meta property="${escapeRegex(property)}"[^>]*>`, 'i');
    if (pattern.test(result)) {
      result = result.replace(pattern, `<meta property="${property}" content="${content}">`);
    } else {
      result = result.replace('</head>', `    <meta property="${property}" content="${content}">\n</head>`);
    }
  }

  result = result.replace(/<meta name="twitter:title"[^>]*>/i, `<meta name="twitter:title" content="${title}">`);
  result = result.replace(/<meta name="twitter:description"[^>]*>/i, `<meta name="twitter:description" content="${description}">`);

  result = result.replace(/<script[^>]*data-seo-jsonld[^>]*>[\s\S]*?<\/script>/i, '');
  if (jsonLd) {
    result = result.replace(
      '</head>',
      `    <script type="application/ld+json" data-seo-jsonld="true">${JSON.stringify(jsonLd)}</script>\n</head>`
    );
  }

  if (shell) {
    result = result.replace(
      '<div id="root" class="min-h-screen bg-[#050505]"></div>',
      `<div id="root" class="min-h-screen bg-[#050505]">${shell}</div>`
    );
  }
  return result;
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://sabir-dev.vercel.app/#person',
  name: 'Sabir Ali',
  alternateName: 'SabirAliDev',
  jobTitle: 'Full-Stack Engineer',
  url: 'https://sabir-dev.vercel.app/',
  image: 'https://sabir-dev.vercel.app/Sabir.png',
  description: 'Sabir Ali is a Full-Stack Engineer working with MERN technologies, Next.js, backend APIs, databases and AI integrations.',
  address: { '@type': 'PostalAddress', addressCountry: 'PK' },
  sameAs: [
    'https://github.com/sabiralidev',
    'https://www.linkedin.com/in/sabiralidev/',
    'https://dev.to/sabirsheikh',
  ],
};

const homepageShell = `
<main>
  <h1>Sabir Ali — Full-Stack Engineer</h1>
  <p>Sabir Ali is a Full-Stack Engineer building scalable web applications, modern MERN systems and AI-integrated solutions.</p>
  <nav aria-label="Portfolio sections">
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#approach">Approach</a>
    <a href="#projects">Projects</a>
    <a href="#experience">Experience</a>
    <a href="#contact">Contact</a>
  </nav>
  <h2 id="projects">Selected projects</h2>
  <a href="/projects/enterprise-e-commerce-hub">Enterprise E-Commerce Hub</a>
  <a href="/projects/ai-world-tech-platform">AI World Tech Platform</a>
</main>`;

const homepageJsonLd = [
  personSchema,
  {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://sabir-dev.vercel.app/#profile',
    url: 'https://sabir-dev.vercel.app/',
    name: 'Sabir Ali | Full-Stack Engineer',
    description: 'Professional portfolio of Sabir Ali, a Full-Stack Engineer.',
    mainEntity: { '@id': 'https://sabir-dev.vercel.app/#person' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://sabir-dev.vercel.app/#website',
    url: 'https://sabir-dev.vercel.app/',
    name: 'SabirAliDev',
    inLanguage: 'en',
    publisher: { '@id': 'https://sabir-dev.vercel.app/#person' },
  },
];

await writeFile(
  baseHtmlPath,
  replaceMetadata(baseHtml, {
    title: 'Sabir Ali | Full-Stack Engineer | SabirAliDev',
    description: 'Sabir Ali is a Full-Stack Engineer building scalable web applications, modern MERN systems, and AI-integrated solutions.',
    canonical: 'https://sabir-dev.vercel.app/',
    type: 'profile',
    jsonLd: homepageJsonLd,
    shell: homepageShell,
  })
);

for (const page of pages) {
  const canonical = `https://sabir-dev.vercel.app/projects/${page.slug}`;
  const shell = `
<main>
  <nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/#projects">Projects</a></nav>
  <h1>${page.title.replace(' | Sabir Ali Project', '')}</h1>
  <p>${page.description}</p>
  <a href="/#projects">View all projects</a>
  <a href="/">Sabir Ali portfolio</a>
</main>`;
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      '@id': `${canonical}#project`,
      name: page.title.replace(' | Sabir Ali Project', ''),
      description: page.description,
      url: canonical,
      author: { '@id': 'https://sabir-dev.vercel.app/#person' },
      inLanguage: 'en',
    },
  ];
  const directory = path.join(dist, 'projects', page.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(
    path.join(directory, 'index.html'),
    replaceMetadata(baseHtml, {
      title: page.title,
      description: page.description,
      canonical,
      type: 'article',
      jsonLd,
      shell,
    })
  );
}

const notFoundHtml = replaceMetadata(baseHtml, {
  title: '404 | Sabir Ali',
  description: 'The requested page could not be found.',
  canonical: 'https://sabir-dev.vercel.app/404',
  noindex: true,
  shell: '<main><h1>404 — Page not found</h1><p>The requested page could not be found.</p><a href="/">Back to portfolio</a></main>',
});
await writeFile(path.join(dist, '404.html'), notFoundHtml);

const portraitPath = path.join(dist, 'Sabir.png');
let portraitBuffer;
try {
  portraitBuffer = await readFile(portraitPath);
} catch {
  portraitBuffer = await readFile(path.join(publicDir, 'Sabir.png'));
}

const portrait = await sharp(portraitBuffer)
  .resize(520, 520, { fit: 'cover', position: 'attention' })
  .png()
  .toBuffer();

const cardSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#050505"/>
  <rect x="32" y="32" width="1136" height="566" fill="#0a0a0b" stroke="#2a2a2a"/>
  <text x="92" y="210" fill="#ffffff" font-family="Arial, sans-serif" font-size="82" font-weight="700">Sabir Ali</text>
  <text x="92" y="282" fill="#d9dce0" font-family="Arial, sans-serif" font-size="42" font-weight="600">Full-Stack Engineer</text>
  <text x="92" y="350" fill="#a1a1aa" font-family="Arial, sans-serif" font-size="28">MERN · Next.js · React · Node.js</text>
  <text x="92" y="420" fill="#71717a" font-family="Arial, sans-serif" font-size="24">SabirAliDev</text>
</svg>`;

await sharp(Buffer.from(cardSvg))
  .composite([{ input: portrait, left: 690, top: 55 }])
  .png()
  .toFile(path.join(dist, 'og-image.png'));
await copyFile(path.join(dist, 'og-image.png'), path.join(publicDir, 'og-image.png'));

const responsiveImages = [
  ['Sabir.png', 'Sabir.webp'],
  ['ecom.png', 'ecom.webp'],
  ['AIworldTech.png', 'AIworldTech.webp'],
];
for (const [sourceName, outputName] of responsiveImages) {
  const sourcePath = path.join(publicDir, sourceName);
  const source = await readFile(sourcePath);
  const webp = await sharp(source).webp({ quality: 82 }).toBuffer();
  await writeFile(path.join(publicDir, outputName), webp);
  await writeFile(path.join(dist, outputName), webp);
}
