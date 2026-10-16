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

/* Real visual + motion work ------------------------------------------------ */
const mediaStyle = document.createElement('style');
mediaStyle.textContent = `
.section-media{background:var(--bg);overflow:hidden}.media-intro{display:grid;grid-template-columns:1.1fr .9fr;gap:70px;align-items:end;margin-bottom:46px}.media-intro h2{margin:0;font-family:var(--serif);font-size:clamp(3rem,5.4vw,5.2rem);line-height:.95;font-weight:400;letter-spacing:-.035em}.media-intro h2 em{color:var(--green);font-weight:400}.media-intro>p{margin:0;color:var(--muted);max-width:510px}.media-wall{display:grid;grid-template-columns:1.15fr .85fr;grid-template-rows:330px 330px;gap:14px}.media-tile{position:relative;overflow:hidden;border:1px solid var(--line);border-radius:28px;background:var(--surface);box-shadow:var(--shadow-sm)}.media-tile.feature{grid-row:1/3}.media-tile video,.media-tile img{width:100%;height:100%;object-fit:cover}.media-tile video{background:#151515}.media-overlay{position:absolute;left:0;right:0;bottom:0;z-index:2;padding:52px 22px 20px;background:linear-gradient(transparent,rgba(5,7,5,.82));color:#fff;pointer-events:none}.media-overlay small{display:block;margin-bottom:4px;font-size:.62rem;letter-spacing:.11em;text-transform:uppercase;color:#d8e1d9}.media-overlay strong{display:block;font-size:1.05rem}.media-badge{position:absolute;top:16px;left:16px;z-index:3;padding:8px 11px;border:1px solid rgba(255,255,255,.28);border-radius:999px;background:rgba(18,22,18,.58);backdrop-filter:blur(10px);color:#fff;font-size:.62rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.media-play{position:absolute;top:16px;right:16px;z-index:3;display:grid;place-items:center;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.9);color:#171917;font-size:.8rem;pointer-events:none}.media-caption{display:flex;justify-content:space-between;gap:20px;margin-top:15px;color:var(--muted);font-size:.72rem}.ojt-real-video{width:100%;height:100%;object-fit:cover;background:#151515}.ojt-video-label{position:absolute;left:14px;bottom:14px;padding:7px 10px;border-radius:999px;background:rgba(20,24,20,.72);backdrop-filter:blur(8px);color:#fff;font-size:.58rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.ojt-mockup{position:relative;padding:0!important}.ojt-mockup .ojt-dashboard{display:none}@media(max-width:860px){.media-intro{grid-template-columns:1fr;gap:20px}.media-wall{grid-template-columns:1fr;grid-template-rows:520px 300px 300px}.media-tile.feature{grid-row:auto}.media-caption{flex-direction:column;gap:3px}}@media(max-width:560px){.media-wall{grid-template-rows:440px 250px 250px}.media-tile{border-radius:20px}.media-overlay{padding:45px 16px 16px}}
`;
document.head.appendChild(mediaStyle);

const workSection = document.querySelector('.section-work');
const servicesSection = document.querySelector('.section-services');
if (workSection && servicesSection) {
  const mediaSection = document.createElement('section');
  mediaSection.className = 'section section-media';
  mediaSection.id = 'media';
  mediaSection.innerHTML = `
    <div class="section-shell">
      <div class="media-intro reveal">
        <div><p class="eyebrow">Motion & visual work</p><h2>Real outputs, <em>not stock photos.</em></h2></div>
        <p>A glimpse of the product-content and promotional work I handled during my GC & Co. internship. The still images below are pulled directly from the real campaign footage.</p>
      </div>
      <div class="media-wall">
        <figure class="media-tile feature reveal">
          <span class="media-badge">OJT • Commercial</span><span class="media-play">▶</span>
          <video class="showreel-video" src="assets/media/bagnet-commercial.mp4" autoplay muted loop playsinline controls preload="metadata" aria-label="Manong Bagnet Bagoong promotional video"></video>
          <figcaption class="media-overlay"><small>Manong Bagnet Bagoong</small><strong>Short-form product commercial</strong></figcaption>
        </figure>
        <figure class="media-tile reveal delay-1">
          <img class="video-still" data-time="0.35" alt="Campaign still from Bagnet Bagoong promotional video" />
          <figcaption class="media-overlay"><small>Campaign still 01</small><strong>Product-focused visual direction</strong></figcaption>
        </figure>
        <figure class="media-tile reveal delay-2">
          <img class="video-still" data-time="2.2" alt="Second campaign still from Bagnet Bagoong promotional video" />
          <figcaption class="media-overlay"><small>Campaign still 02</small><strong>Motion content translated into social visuals</strong></figcaption>
        </figure>
      </div>
      <div class="media-caption"><span>Role: content support • AI-assisted creative workflow • short-form promotional media</span><span>GC & Co. Online Shop · 2026</span></div>
    </div>`;
  servicesSection.parentNode.insertBefore(mediaSection, servicesSection);
  mediaSection.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  sectionObserver.observe(mediaSection);
}

const ojtMedia = document.querySelector('[data-case="ojt"] .ojt-mockup');
if (ojtMedia) {
  ojtMedia.innerHTML = `<video class="ojt-real-video" src="assets/media/bagnet-commercial.mp4" autoplay muted loop playsinline preload="metadata" aria-label="Real OJT content sample"></video><span class="ojt-video-label">Real OJT media • 2026</span>`;
}

async function makeVideoStill(img, time) {
  const video = document.createElement('video');
  video.src = 'assets/media/bagnet-commercial.mp4';
  video.muted = true;
  video.playsInline = true;
  video.preload = 'auto';
  await new Promise((resolve, reject) => {
    video.addEventListener('loadedmetadata', resolve, { once:true });
    video.addEventListener('error', reject, { once:true });
  }).catch(() => null);
  if (!video.duration) return;
  video.currentTime = Math.min(Number(time) || 0, Math.max(0, video.duration - .05));
  await new Promise(resolve => video.addEventListener('seeked', resolve, { once:true }));
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, 720 / video.videoWidth);
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
  img.src = canvas.toDataURL('image/jpeg', .84);
}
document.querySelectorAll('.video-still').forEach(img => makeVideoStill(img, img.dataset.time));

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();
