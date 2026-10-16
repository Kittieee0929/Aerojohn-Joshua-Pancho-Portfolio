const root = document.documentElement;
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');

const storedTheme = localStorage.getItem('aj-theme');
if (storedTheme) root.dataset.theme = storedTheme;
else if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) root.dataset.theme = 'dark';

function syncThemeColor() {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', root.dataset.theme === 'dark' ? '#111411' : '#f5f0e8');
}
syncThemeColor();

themeToggle?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('aj-theme', root.dataset.theme);
  syncThemeColor();
});

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    document.querySelectorAll('.site-nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  });
}, { rootMargin: '-30% 0px -60% 0px' });
document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

const glow = document.querySelector('.cursor-glow');
if (glow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
}

const skills = {
  admin: {
    title: 'Admin & Virtual Assistance',
    description: 'Reliable support for repetitive, organized, detail-heavy work — from documents and spreadsheets to research and task coordination.',
    chips: ['Data entry · 40+ WPM', 'Google Workspace', 'Microsoft Office', 'File organization', 'SOPs & checklists', 'Research support', 'Client communication', 'Document formatting', 'Spreadsheet organization']
  },
  creative: {
    title: 'Digital Content & Creative',
    description: 'Content support for brands, social media, presentations, short-form video, and product-focused creative work.',
    chips: ['Canva', 'Canva Bulk Create', 'Adobe Photoshop', 'CapCut Pro', 'DaVinci Resolve', 'UGC concepts', 'Short-form content', 'Graphic design', 'Logo & promo visuals']
  },
  web: {
    title: 'Web & E-commerce',
    description: 'Practical support for online businesses and lightweight website workflows — from product operations to page editing and publishing.',
    chips: ['WordPress', 'Elementor', 'HTML / CSS basics', 'VS Code', 'GitHub', 'E-commerce fulfillment', 'Inventory support', 'Product packaging', 'Labeling workflows']
  },
  ai: {
    title: 'AI & Productivity',
    description: 'Human-reviewed AI workflows for research, planning, content production, learning materials, and repetitive knowledge work.',
    chips: ['ChatGPT', 'Gemini', 'NotebookLM', 'Google AI Studio', 'Suno AI', 'Prompting', 'Research synthesis', 'Content ideation', 'AI-assisted documentation']
  },
  technical: {
    title: 'Technical Support',
    description: 'Hands-on computer support grounded in my Computer Hardware Servicing specialization and laboratory experience.',
    chips: ['Computer hardware servicing', 'PC diagnostics', 'Windows setup', 'Software installation', 'Network troubleshooting', 'Basic repair', 'Workstation setup', 'Hardware / software troubleshooting']
  }
};

const skillTitle = document.querySelector('#skill-title');
const skillDescription = document.querySelector('#skill-description');
const skillCloud = document.querySelector('#skill-cloud');
function renderSkill(key) {
  const data = skills[key];
  if (!data || !skillCloud) return;
  skillTitle.textContent = data.title;
  skillDescription.textContent = data.description;
  skillCloud.innerHTML = data.chips.map((chip, i) => `<span class="skill-chip" style="animation-delay:${i * 35}ms">${chip}</span>`).join('');
}
document.querySelectorAll('.skill-tab').forEach(tab => tab.addEventListener('click', () => {
  document.querySelectorAll('.skill-tab').forEach(btn => { btn.classList.remove('active'); btn.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  renderSkill(tab.dataset.skill);
}));
renderSkill('admin');

const cases = {
  research: {
    kicker: 'Research · Toolkit Development · 2026',
    title: 'Needs-Based AI Literacy Toolkit for Senior High School Students',
    intro: 'A research-and-development project focused on what senior high school students actually need to learn to use AI critically, ethically, safely, and effectively.',
    blocks: [
      ['My role', 'Lead researcher / project developer. Coordinated research documentation, instrument preparation, validation workflow, digital toolkit content, and data organization.'],
      ['The challenge', 'AI use is growing quickly, but students still need support in evaluating outputs, checking sources, protecting privacy, maintaining academic integrity, and using AI responsibly.'],
      ['What I built', 'A seven-domain toolkit supported by a 35-item needs-assessment instrument, expert validation materials, student acceptability tools, Google Forms, and a web-based learning experience.'],
      ['What this demonstrates', 'Research organization, content architecture, web thinking, AI literacy, documentation, survey workflow, teamwork, and the ability to turn academic requirements into a usable digital product.']
    ]
  },
  ojt: {
    kicker: 'GC & Co. Online Shop · OJT · 2026',
    title: 'E-commerce, Content & Operations Internship',
    intro: 'A 33-day internship that stretched beyond my technical specialization and gave me practical exposure to online business operations, digital marketing, content production, and AI tools.',
    blocks: [
      ['What I worked on', 'Packaging, labeling, sealing, product preparation, inventory counting, fulfillment support, digital content, UGC concepts, AI-assisted visuals, bulk content workflows, and presentations.'],
      ['Tools used', 'Canva, ChatGPT, Gemini, NotebookLM, Google AI Studio, Suno AI, VEO Flow, and workplace communication / productivity tools.'],
      ['Recognition', 'Received the Outstanding Intern Award and Outstanding Output Achievement Award during the internship.'],
      ['What this demonstrates', 'Adaptability, speed, teamwork, creative execution, attention to detail, operations support, and the ability to learn unfamiliar tools quickly.']
    ]
  },
  teaching: {
    kicker: 'ICT / CSS Field Study · 2026',
    title: 'Teaching & Instructional Design for Computer Systems Servicing',
    intro: 'Classroom and laboratory work supporting Grade 9 and Grade 10 learners in practical ICT / CSS topics and activities.',
    blocks: [
      ['What I created', 'Lesson plans, quizzes, rubrics, performance tasks, learner checklists, instructional materials, classroom activities, and presentation materials.'],
      ['Topics supported', 'Software installation, Windows installation, safety, tools, procedures, troubleshooting, site preparation, and computer hardware servicing.'],
      ['How I taught', 'Used demonstrations, recitation, station activities, hands-on tasks, checks for understanding, and structured assessment rather than relying only on lecture.'],
      ['What this demonstrates', 'Communication, instructional design, technical explanation, classroom organization, assessment design, and the ability to make technical content understandable.']
    ]
  }
};

const modal = document.querySelector('#case-modal');
const modalContent = document.querySelector('#modal-content');
let lastTrigger = null;
function openCase(key, trigger) {
  const data = cases[key];
  if (!data || !modal || !modalContent) return;
  lastTrigger = trigger;
  modalContent.innerHTML = `<div class="modal-hero"><p class="eyebrow">${data.kicker}</p><h2 id="modal-title">${data.title}</h2><p>${data.intro}</p></div><div class="modal-grid">${data.blocks.map(([title, text], i) => `<article class="modal-block ${i === data.blocks.length - 1 ? 'full' : ''}"><span>${String(i + 1).padStart(2, '0')}</span><h3>${title}</h3><p>${text}</p></article>`).join('')}</div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close')?.focus();
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  lastTrigger?.focus();
}
document.querySelectorAll('.case-open').forEach(button => button.addEventListener('click', () => openCase(button.closest('.case-card')?.dataset.case, button)));
document.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
