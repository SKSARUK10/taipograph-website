// All site copy lives here (moved word-for-word from the original HTML pages).
// Edit text in this one file; a dedicated admin backend can replace it later
// by serving the same shapes from the API.

export const SITE = {
  name: 'TAIPOGRAPH',
  url: 'https://taipograph.com',
  email: 'info@taipograph.com',
  phone: '+91 84790 50435',
  phoneHref: 'tel:+918479050435',
  location: 'Kolkata, India',
  footerLeft: '© 2026 TAIPOGRAPH Premedia & Packaging · Kolkata, India',
  footerRight: 'Packaging prepress · Premedia · Production',
};

export const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio & Case Studies' },
  { to: '/contact', label: 'Contact' },
];

export const SEO = {
  home: {
    title: 'TAIPOGRAPH | Packaging Prepress & Production',
    description:
      'Press-ready packaging artwork, premedia and end-to-end packaging development for CPG and FMCG brands, startups, agencies and converters.',
    path: '/',
  },
  about: {
    title: 'About | TAIPOGRAPH',
    description:
      'TAIPOGRAPH is the technical specialist layer between your creative team and the press: prepress, premedia and packaging production.',
    path: '/about',
  },
  services: {
    title: 'Services | TAIPOGRAPH',
    description:
      'Prepress and premedia services plus end-to-end packaging design and production: dielines, colour separation, trapping, QA and first commercial print.',
    path: '/services',
  },
  portfolio: {
    title: 'Portfolio & Case Studies | TAIPOGRAPH',
    description:
      'Production experience behind our press-ready packaging files. Sample work available under NDA.',
    path: '/portfolio',
  },
  contact: {
    title: 'Contact | TAIPOGRAPH',
    description:
      'Send one file for a free preflight, or tell us about your product launch or packaging refresh. info@taipograph.com',
    path: '/contact',
  },
};

/* ---------------------------------- HOME --------------------------------- */
export const HOME = {
  hero: {
    eyebrow: 'Packaging prepress, premedia & production',
    title: 'Press-ready packaging artwork, right the first time.',
    text: 'TAIPOGRAPH supports CPG and FMCG brands, startups, agencies and converters, from technical prepress and premedia to end-to-end packaging development and first commercial print, backed by experts with 13 to 30 years of hands-on packaging production experience. We fit your workflow and deliver on your deadline.',
    primary: { label: 'Send one file for a free preflight', to: '/contact?service=preflight' },
    secondary: { label: 'Explore services', to: '/services' },
    panelTitle: 'Our press-ready checklist',
    checklist: [
      ['Dieline & panel alignment', 'Checked'],
      ['Colour separation & spot colours', 'Checked'],
      ['Trapping & overprint', 'Checked'],
      ['Barcode & regulatory text', 'Checked'],
      ['Press-ready PDF & QA report', 'Delivered'],
    ],
  },
  stats: [
    { value: '13–30', label: 'years of expert industry experience' },
    { value: '4', label: 'print processes: offset, flexo, gravure, digital' },
    { value: '100%', label: 'press-ready file focus' },
    { value: 'Overnight', label: 'turnaround for US & UK teams' },
  ],
  flow: {
    eyebrow: 'How it works',
    title: 'From your design file to the press in three moves',
    steps: [
      { icon: 'file', title: '1. Send your file', text: 'Artwork, dieline and print specs' },
      { icon: 'audit', title: '2. We correct & check', text: 'Prepress, colour and QA' },
      { icon: 'print', title: '3. Press-ready PDF back', text: 'With a short QA report' },
    ],
  },
  what: {
    eyebrow: 'What we do',
    title: 'Technical packaging production, without adding headcount',
    lead: 'Your design team creates the concept. We make sure it prints accurately.',
    cards: [
      {
        icon: 'file',
        title: 'Prepress & press-ready files',
        text: "Files built to your printer's specification across offset, flexo, gravure and digital.",
      },
      {
        icon: 'proof',
        title: 'Artwork adaptation & roll-outs',
        text: 'SKU variants, size changes and multi-market versions kept consistent with the master.',
      },
      {
        icon: 'audit',
        title: 'Colour & QA',
        text: 'Separations, spot colours, trapping and a written preflight report on every job.',
      },
      {
        icon: 'brief',
        title: 'End-to-end packaging development',
        text: 'From concept and design to your first commercial print run, for CPG and FMCG brands and startups.',
      },
    ],
    link: { label: 'View all services →', to: '/services' },
  },
  why: {
    eyebrow: 'Why TAIPOGRAPH',
    title: 'Production-side expertise, not just design',
    cards: [
      { num: '01', title: 'Internal QA first', text: "Every job is checked against your printer's specification before delivery." },
      { num: '02', title: 'Fits your workflow', text: 'We work from your artwork, dielines and specs, with no change to your approvals.' },
      { num: '03', title: 'Overnight advantage', text: 'Send files at end of day and receive them at the start of the next.' },
      { num: '04', title: 'Confidential by default', text: 'NDA and confidential project support are available before files change hands.' },
    ],
  },
  band: {
    headings: [
      'Have a file that needs to be press-ready?',
      'Got a product launch or reshaping the packaging of your existing product line?',
    ],
    cta: { label: "Let's talk", to: '/contact' },
  },
};

/* ---------------------------------- ABOUT -------------------------------- */
export const ABOUT = {
  header: {
    eyebrow: 'About',
    title: '“Design-ready” and “Print-ready” are not the same thing.',
    text: 'The gap between them is where reprints, missed colour standards and delayed shelf dates come from. TAIPOGRAPH is the technical specialist layer between your creative team and the press.',
  },
  lines: {
    eyebrow: 'What we do',
    title: 'Two service lines, one production standard',
    groups: [
      {
        label: 'PREPRESS & PREMEDIA · GLOBAL, REMOTE',
        cards: [
          {
            icon: 'audit',
            title: 'Prepress correction & QC',
            text: 'Dieline and structural QC, full preflight and print-ready file audits, bleed, trim and safe-zone validation, and barcode and regulatory copy placement checks.',
          },
          {
            icon: 'build',
            title: 'Colour & separation',
            text: 'Spot colour and CMYK separation, trapping and overprint or knockout setup, brand colour-standard matching and G7/GMG-aligned validation.',
          },
          {
            icon: 'file',
            title: 'Production-ready artwork',
            text: 'Mechanical artwork build-out, multi-SKU template and variant management, and clean press-ready PDF handoff to your printer.',
          },
        ],
      },
      {
        label: 'PACKAGING DESIGN & PRODUCTION · INDIA, ON-GROUND',
        cards: [
          {
            icon: 'design',
            title: 'Concept & design',
            text: 'Packaging brief, format, structure and material guidance, and graphic design that respects print limits from day one.',
          },
          {
            icon: 'appr',
            title: 'Development & approvals',
            text: 'Dielines, revisions, proofing and sign-off until the pack is ready for production.',
          },
          {
            icon: 'print',
            title: 'Production & print',
            text: 'Press-ready files, printer coordination and follow-through to your first commercial print run.',
          },
        ],
      },
    ],
  },
  workflow: {
    eyebrow: 'How we work',
    title: 'A separate, repeatable workflow for each service line',
    groups: [
      {
        label: 'PREPRESS & PREMEDIA',
        steps: [
          { icon: 'file', title: 'File intake', text: 'Receive design file and press specs' },
          { icon: 'audit', title: 'Prepress audit', text: 'Flag structural and colour issues' },
          { icon: 'build', title: 'Correction & build', text: 'Dieline, trapping, separations' },
          { icon: 'check', title: 'QC pass', text: 'Validate against press and brand standards' },
          { icon: 'send', title: 'Press-ready handoff', text: 'Delivered to your printer' },
        ],
      },
      {
        label: 'PACKAGING DESIGN & PRODUCTION',
        steps: [
          { icon: 'brief', title: 'Brief & discovery', text: 'Product, shelf, budget and launch timeline' },
          { icon: 'design', title: 'Concept & design', text: 'Structure, format and graphics' },
          { icon: 'appr', title: 'Development & approval', text: 'Dielines, revisions and sign-off' },
          { icon: 'proof', title: 'Prepress & proofing', text: 'Press-ready files and proof review' },
          { icon: 'print', title: 'Print run & delivery', text: 'First commercial print, delivered on schedule' },
        ],
      },
    ],
  },
  audience: {
    eyebrow: 'Who this is for',
    title: 'Teams we work best with',
    tags: [
      'Beauty & personal care brands',
      'CPG / FMCG brand teams',
      'Startups & new launches',
      'Design agencies needing prepress support',
      'In-house teams without a prepress specialist',
      'Printers & converters',
    ],
  },
  who: {
    left: {
      title: 'Who we are',
      paragraphs: [
        'We sit between design studios and the press. Our experts have 13 to 30 years of practical experience across packaging production houses, converters and brand owners, supporting CPG, FMCG, beauty and wellness brands and startups, from packaging development to press-ready files.',
        'That experience means we know what printers reject, what causes reprints and what a clean file looks like for each print process.',
      ],
    },
    right: {
      title: 'How we work',
      paragraphs: [
        'We work from your artwork, dielines and specifications. Each job is checked internally and delivered as a press-ready file with a QA report.',
        'Plate-making and imposition stay with your printer. Our job is a press-ready file they can run without questions.',
      ],
    },
  },
  tools: {
    eyebrow: 'Tools',
    title: 'Software we have worked with',
    lead: "Our team's experience spans the main packaging and design platforms. We use the right tool for each job.",
    items: [
      { name: 'Esko ArtPro', logo: '/logos/esko-artpro.png', alt: 'Esko ArtPro logo' },
      { name: 'Esko Plato', logo: '/logos/esko-plato.png', alt: 'Esko Plato logo' },
      { name: 'ArtiosCAD', logo: '/logos/artioscad.png', alt: 'ArtiosCAD logo' },
      { name: 'Automation Engine', logo: '/logos/esko.png', alt: 'Esko logo' },
      { name: 'Adobe Illustrator', badge: 'Ai', color: '#ff9a00' },
      { name: 'Photoshop', badge: 'Ps', color: '#31a8ff' },
      { name: 'InDesign', badge: 'Id', color: '#ff3366' },
      { name: 'Acrobat', logo: '/logos/acrobat.png', alt: 'Adobe Acrobat logo' },
      { name: 'CorelDRAW', badge: 'Cd', color: '#7db928' },
    ],
  },
};

/* --------------------------------- SERVICES ------------------------------ */
export const SERVICES = {
  prepress: {
    header: {
      eyebrow: 'Prepress & Premedia',
      title: 'From approved design to press-ready file',
      text: 'Six core capabilities covering the technical steps most studios and in-house teams struggle to staff.',
    },
    cards: [
      { icon: 'proof', title: 'Artwork development & roll-outs', text: 'Master artwork adaptation, line extensions and multi-market language versions.' },
      { icon: 'print', title: 'Prepress & reprographics', text: "Press-ready PDFs for offset, flexo, gravure and digital, built to your printer's spec." },
      { icon: 'build', title: 'Colour separation & management', text: 'CMYK, Pantone and spot colours, with experience in GMG, G7 and PantoneLIVE workflows.' },
      { icon: 'design', title: 'Dielines & structural fit', text: 'Artwork fitted to cartons, labels, pouches and corrugated, with fold and panel checks.' },
      { icon: 'check', title: 'Trapping, overprint & QA', text: 'Process-specific trapping and a preflight report on every job, including barcode checks.' },
      { icon: 'file', title: 'Packaging formats', text: 'Folding cartons, flexible packaging, labels and corrugated.' },
    ],
  },
  production: {
    header: {
      eyebrow: 'Packaging Design & Production',
      title: 'From concept to design, packaging development to first commercial print',
      text: 'For CPG and FMCG brands, startups and new product launches. One accountable partner coordinating design, prepress and your printer, so you are not managing three vendors for one pack. On-ground coordination in India.',
    },
    cards: [
      { icon: 'brief', title: 'Concept & packaging brief', text: 'Format, structure and material guidance matched to your product, shelf and budget.' },
      { icon: 'design', title: 'Packaging design', text: 'Structural and graphic design that respects print and production limits from day one.' },
      { icon: 'appr', title: 'Development & approvals', text: 'Dielines, revisions and sign-off until the pack is ready for production.' },
      { icon: 'file', title: 'Prepress & artwork finalisation', text: "Press-ready files built to your printer's specification across offset, flexo, gravure and digital." },
      { icon: 'proof', title: 'Printer coordination & proofing', text: 'Briefing the printer, reviewing proofs and handling press approvals on your behalf.' },
      { icon: 'print', title: 'First commercial print run', text: 'Production follow-through from first run to delivery, so your launch stays on schedule.' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Common questions',
    items: [
      { q: 'Do you deliver plate-ready files?', a: 'We deliver press-ready files. Plate-making and imposition are handled by your printer or platemaker.' },
      { q: 'What turnaround can I expect?', a: 'Standard files typically return by the next working day in your time zone. Rush jobs are quoted individually.' },
      { q: 'How do you protect confidential artwork?', a: 'We sign your NDA first, work only on the files required, and delete project files on request after delivery.' },
      { q: 'How is pricing structured?', a: 'Per project, per SKU or as a monthly retainer, quoted in USD, GBP or EUR.' },
    ],
  },
};

/* --------------------------------- PORTFOLIO ----------------------------- */
export const PORTFOLIO = {
  header: {
    eyebrow: 'Portfolio & Case Studies',
    title: 'Experience behind the files',
    text: 'Most packaging work belongs to our clients, so specific projects are shared under NDA on request.',
  },
  experience: {
    eyebrow: 'Production experience',
    title: 'Where our experts have worked',
    cards: [
      { title: 'Global FMCG roll-outs', text: 'Fabric care and home care artwork across multiple brands for a major global FMCG account.' },
      { title: 'Technical data sheet output', text: 'Production files to client specifications for beverage, food and carton accounts.' },
      { title: 'Cartons & corrugated', text: 'Mono-carton and corrugated artwork with press-ready output across offset, flexo and gravure.' },
      { title: 'Export-market packaging', text: 'Multi-region artwork deliverables with regulatory and compliance review.' },
    ],
  },
  cases: {
    eyebrow: 'Case studies',
    title: 'Project walkthroughs are on the way',
    lead: 'We are preparing case studies showing the brief, our process and the files delivered. Want to see sample before-and-after work now? Ask us under NDA.',
    cta: { label: 'Request samples', to: '/contact?service=sample' },
  },
};

/* --------------------------------- CONTACT ------------------------------- */
export const CONTACT = {
  header: {
    eyebrow: 'Contact',
    h1: 'Have a file that needs to be press-ready?',
    h2: 'Got a product launch or reshaping the packaging of your existing product line?',
    text: 'Tell us about your project. You will hear back within one business day.',
  },
  intro: {
    title: 'Get in touch',
    location: 'Kolkata, India · Remote-first for prepress, on-ground coordination in India',
    note: 'Start with one file: send a single artwork for a free preliminary preflight review. Planning a launch or a packaging refresh? Share a short brief and we will suggest next steps.',
  },
  // value = what is stored/emailed; key = ?service= shortcut used by links on the site
  services: [
    { key: 'prepress', value: 'Prepress & Premedia' },
    { key: 'design', value: 'Packaging Design & Production (India)' },
    { key: 'preflight', value: 'Free preflight review' },
    { key: 'sample', value: 'Sample request' },
    { key: 'other', value: 'Other' },
  ],
};
