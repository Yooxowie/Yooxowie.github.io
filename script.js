// ==========================================================================
// Dhany Shane Rose A. Siapno - Portfolio Interactive Scripts
// Theme: Dreamy Icy Cyan & Deep Navy Editorial
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initIntroCurtain();
  initMenuDrawer();
  initLivePHTClock();
  initOperationsSimulator();
  initProjectModals();
  initSmoothScroll();
});

// 1. "HM heart, IT mind" Intro Screen
function initIntroCurtain() {
  const curtain = document.getElementById('intro-curtain');
  if (!curtain) return;

  // Fade out smoothly after 2.4s so the visitor reads the inspiring greeting
  const timer = setTimeout(() => {
    curtain.classList.add('hidden-curtain');
  }, 2400);

  // Allow clicking anywhere to skip
  curtain.addEventListener('click', () => {
    clearTimeout(timer);
    curtain.classList.add('hidden-curtain');
  });
}

// 2. Floating Menu Drawer
function initMenuDrawer() {
  const menuBtn = document.getElementById('menu-toggle-btn');
  const drawer = document.getElementById('menu-drawer');
  const closeBtn = document.getElementById('menu-close-btn');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (!menuBtn || !drawer) return;

  function openMenu() {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });
}

// 3. Live Philippine Time (PHT) Clock
function initLivePHTClock() {
  const timeEl = document.getElementById('live-pht-clock') || document.getElementById('live-pht-time');
  if (!timeEl) return;

  function updateTime() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Manila',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
    timeEl.textContent = `${timeString} PHT`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

// 4. Operations & Banquet Staffing Simulator (TESDA NC II FBS Ratios)
function initOperationsSimulator() {
  const guestRange = document.getElementById('guest-range') || document.getElementById('calc-guests');
  const guestDisplay = document.getElementById('guest-count-display') || document.getElementById('calc-guest-val');
  const serviceButtons = document.querySelectorAll('.service-style-btn');
  const workflowToggle = document.getElementById('digital-workflow-toggle') || document.getElementById('calc-tech-toggle');

  const outServers = document.getElementById('calc-servers') || document.getElementById('out-waitstaff');
  const outBartenders = document.getElementById('calc-bartenders') || document.getElementById('out-bartenders');
  const outCaptains = document.getElementById('calc-captains');
  const outEfficiency = document.getElementById('calc-efficiency') || document.getElementById('out-efficiency');

  let currentStyle = 'plated';

  if (!guestRange) return;

  function recalculate() {
    const guests = parseInt(guestRange.value) || 250;
    if (guestDisplay) {
      guestDisplay.textContent = `${guests} Guests`;
    }

    const isDigitalActive = workflowToggle ? workflowToggle.checked : true;

    // Ratios based on official NC II FBS criteria
    let guestPerServer = 18; // Plated dining
    if (currentStyle === 'buffet') {
      guestPerServer = 30; // Buffet service
    } else if (currentStyle === 'cocktail') {
      guestPerServer = 35; // Reception cocktail
    }

    let servers = Math.ceil(guests / guestPerServer);
    let bartenders = Math.max(1, Math.ceil(guests / 65));
    let captains = Math.max(1, Math.ceil(guests / 125));
    let efficiency = 86;

    if (isDigitalActive) {
      efficiency = 96;
      if (guests > 80 && servers > 4) {
        servers = Math.max(2, Math.round(servers * 0.85));
      }
    }

    if (outServers) outServers.textContent = servers;
    if (outBartenders) outBartenders.textContent = bartenders;
    if (outCaptains) outCaptains.textContent = captains;
    if (outEfficiency) outEfficiency.textContent = `${efficiency}%`;
  }

  // Range Slider listener
  guestRange.addEventListener('input', recalculate);

  // Service style buttons
  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceButtons.forEach(b => {
        b.classList.remove('bg-sky-500', 'text-white', 'border-sky-500');
        b.classList.add('bg-white', 'text-[#334E68]', 'border-slate-200');
      });
      btn.classList.add('bg-sky-500', 'text-white', 'border-sky-500');
      btn.classList.remove('bg-white', 'text-[#334E68]', 'border-slate-200');
      currentStyle = btn.getAttribute('data-style') || 'plated';
      recalculate();
    });
  });

  if (workflowToggle) {
    workflowToggle.addEventListener('change', recalculate);
  }

  recalculate();
}

// 5. Case Study Modals
const caseStudies = {
  skinsense: {
    title: "SkinSense AI",
    category: "Mobile & Web Prototype · 2026",
    icon: "✨",
    description: "SkinSense AI is a mobile and web prototype connecting AI-assisted preliminary facial skin assessment, ingredient insights, and educational skincare guidance.",
    points: [
      "Intuitive client questionnaire and camera-assisted face scan interface",
      "Dynamic cosmetic ingredient breakdown with sensitivity alerts",
      "Mobile-first responsive architecture designed for clean usability",
      "Built with clean semantic HTML, Tailwind styling, and prototype API logic"
    ],
    tech: ["Figma Prototype", "Tailwind CSS", "JavaScript", "Responsive UI"]
  },
  luxerealty: {
    title: "Luxe Realty Cebu",
    category: "Property Discovery & Inquiries · 2026",
    icon: "🏙️",
    description: "A sleek real estate platform prototype for Cebu property discovery, inquiries, user accounts, and listing administration.",
    points: [
      "Modern editorial card layouts for premier residential and commercial listings",
      "Direct inquiry modal and WhatsApp concierge integration",
      "Search and price filter modules running with instantaneous client-side updates",
      "Designed for seamless luxury client discovery"
    ],
    tech: ["Tailwind CSS", "JavaScript ES6", "DOM Filtering", "UI/UX Architecture"]
  },
  concierge: {
    title: "Digital Guest Concierge App",
    category: "Hospitality Management & CX Prototype · 2026",
    icon: "🛎️",
    description: "Engineered from 4th-year hospitality management operational insights to resolve arrival bottlenecks and enhance VIP guest personalization.",
    points: [
      "Eliminates 20+ minute hotel check-in lines during peak arrival times",
      "Real-time guest amenities and towel requests dispatched directly to housekeeping",
      "Lightweight, zero-download mobile web app accessible via room QR cards",
      "Built by a 4th-year student applying NC II FBS knowledge to software flow"
    ],
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "QR Code Generation", "CX Design"]
  },
  guestconcierge: {
    title: "Digital Guest Concierge App",
    category: "Hospitality Management & CX Prototype · 2026",
    icon: "🛎️",
    description: "Engineered from 4th-year hospitality management operational insights to resolve arrival bottlenecks and enhance VIP guest personalization.",
    points: [
      "Eliminates 20+ minute hotel check-in lines during peak arrival times",
      "Real-time guest amenities and towel requests dispatched directly to housekeeping",
      "Lightweight, zero-download mobile web app accessible via room QR cards",
      "Built by a 4th-year student applying NC II FBS knowledge to software flow"
    ],
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "QR Code Generation", "CX Design"]
  },
  staffing: {
    title: "Smart Banquet Operations Engine",
    category: "F&B Operations Logic · 2026",
    icon: "⚡",
    description: "Automated staffing allocation software for hotel event supervisors, eliminating manual spreadsheet guesswork for multi-course dinners and buffets.",
    points: [
      "Incorporates official TESDA NC II FBS ratios for plated, buffet, and cocktail formats",
      "Real-time calculation of floor servers, mixologists, and estimated labor overhead",
      "Instant shift distribution to team leads and supervisors",
      "Tested for quick floor adjustments on mobile tablets"
    ],
    tech: ["TESDA NC II FBS", "JavaScript Calculations", "Form Validation", "Responsive Layouts"]
  },
  banquetalloc: {
    title: "Smart Banquet Operations Engine",
    category: "F&B Operations Logic · 2026",
    icon: "⚡",
    description: "Automated staffing allocation software for hotel event supervisors, eliminating manual spreadsheet guesswork for multi-course dinners and buffets.",
    points: [
      "Incorporates official TESDA NC II FBS ratios for plated, buffet, and cocktail formats",
      "Real-time calculation of floor servers, mixologists, and estimated labor overhead",
      "Instant shift distribution to team leads and supervisors",
      "Tested for quick floor adjustments on mobile tablets"
    ],
    tech: ["TESDA NC II FBS", "JavaScript Calculations", "Form Validation", "Responsive Layouts"]
  }
};

window.openModal = function(id) {
  const modal = document.getElementById('case-study-modal');
  const data = caseStudies[id];
  if (!modal || !data) return;

  const titleEl = document.getElementById('modal-title');
  const catEl = document.getElementById('modal-category');
  const descEl = document.getElementById('modal-desc');
  const iconEl = document.getElementById('modal-icon');
  const badgeTitleEl = document.getElementById('modal-badge-title');

  if (titleEl) titleEl.textContent = data.title;
  if (catEl) catEl.textContent = data.category;
  if (descEl) descEl.textContent = data.description;
  if (iconEl) iconEl.textContent = data.icon || "✨";
  if (badgeTitleEl) badgeTitleEl.textContent = data.title;

  const list = document.getElementById('modal-points');
  if (list) {
    list.innerHTML = '';
    data.points.forEach(pt => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-xs sm:text-sm text-[#486581] gap-2';
      li.innerHTML = `<span class="text-sky-500 font-bold mt-0.5">▪</span> <span>${pt}</span>`;
      list.appendChild(li);
    });
  }

  const techContainer = document.getElementById('modal-tech');
  if (techContainer) {
    techContainer.innerHTML = '';
    data.tech.forEach(t => {
      const pill = document.createElement('span');
      pill.className = 'px-3 py-1 bg-sky-50 text-sky-800 rounded-md text-xs font-semibold border border-sky-100';
      pill.textContent = t;
      techContainer.appendChild(pill);
    });
  }

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

function initProjectModals() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const backdrop = document.getElementById('modal-backdrop');

  if (!modal) return;

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// 6. Smooth Anchor Scrolling
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
