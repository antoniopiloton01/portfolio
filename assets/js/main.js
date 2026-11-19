
// Helper to render official tech stack logo badges
function renderTechBadge(tech) {
  const t = tech.toLowerCase();
  let icon = '<i class="fas fa-code" style="color: var(--color-brand-blue);"></i>';
  
  if (t.includes('laravel')) icon = '<i class="fab fa-laravel" style="color: #FF2D20;"></i>';
  else if (t.includes('php')) icon = '<i class="fab fa-php" style="color: #777BB4; font-size: 0.95rem;"></i>';
  else if (t.includes('react')) icon = '<i class="fab fa-react" style="color: #61DAFB;"></i>';
  else if (t.includes('typescript')) icon = '<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#3178C6"/><path fill="#FFF" d="M14.7 18.2c.5.3 1.1.5 1.8.5 1.1 0 1.7-.5 1.7-1.3 0-.8-.5-1.1-1.5-1.5-1.5-.5-2.5-1.3-2.5-2.6 0-1.5 1.2-2.6 3.1-2.6.9 0 1.5.2 2 .5l-.5 1.3c-.4-.3-1-.4-1.6-.4-1 0-1.5.5-1.5 1.2 0 .7.5 1.1 1.6 1.5 1.5.6 2.4 1.3 2.4 2.7 0 1.6-1.3 2.7-3.3 2.7-1 0-1.8-.2-2.3-.6l.6-1.4zM6 12.3h3.2v7.1H11v-7.1h3.2V11H6v1.3z"/></svg>';
  else if (t.includes('javascript') || t === 'js') icon = '<i class="fab fa-js" style="color: #F7DF1E; background: #000; border-radius: 2px;"></i>';
  else if (t.includes('tailwind')) icon = '<svg class="tech-icon-svg" viewBox="0 0 24 24"><path fill="#06B6D4" d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"/></svg>';
  else if (t.includes('mysql')) icon = '<svg class="tech-icon-svg" viewBox="0 0 24 24"><path fill="#00758F" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5c-3 0-5.5-2-5.5-4.5s2.5-4.5 5.5-4.5 5.5 2 5.5 4.5-2.5 4.5-5.5 4.5z"/><circle cx="13" cy="14" r="1.5" fill="#F29111"/></svg>';
  else if (t.includes('sqlite')) icon = '<svg class="tech-icon-svg" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#003B57"/><path fill="#FFF" d="M7 6h10v3H7zm0 5h10v3H7zm0 5h10v3H7z"/></svg>';
  else if (t.includes('python')) icon = '<i class="fab fa-python" style="color: #3776AB;"></i>';
  else if (t.includes('android')) icon = '<i class="fab fa-android" style="color: #3DDC84;"></i>';
  else if (t.includes('ios') || t.includes('apple')) icon = '<i class="fab fa-apple"></i>';
  else if (t.includes('firebase')) icon = '<i class="fas fa-fire" style="color: #FFA611;"></i>';
  else if (t.includes('git')) icon = '<i class="fab fa-git-alt" style="color: #F05032;"></i>';
  else if (t.includes('rest') || t.includes('api')) icon = '<i class="fas fa-network-wired" style="color: var(--color-champagne);"></i>';
  else if (t.includes('qr') || t.includes('nfc') || t.includes('rfid')) icon = '<i class="fas fa-qrcode" style="color: var(--color-champagne);"></i>';
  else if (t.includes('esc/pos') || t.includes('thermal') || t.includes('hardware')) icon = '<i class="fas fa-print" style="color: var(--color-champagne);"></i>';

  return `<span class="tag-pill">${icon}<span>${tech}</span></span>`;
}

/**
 * ====================================================================
 * PORTFOLIO APPLICATION CORE LOGIC
 * ====================================================================
 * Owner: Antonio Jr. L. Piloton, MIT
 * Multi-page architecture logic: theme toggle, mobile navigation drawer,
 * quotation calculator, contact form composer, and toast alerts.
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initNavigation();
  hydrateFromPortfolioData();
  initContactForm();
  initQuotationCalculator();
  loadPendingQuoteToForm();
});

/* --------------------------------------------------------------------------
   1. THEME SWITCHER (DARK / LIGHT WITH SYSTEM PERSISTENCE)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");
  const savedTheme = localStorage.getItem("antonio_portfolio_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const initialTheme = savedTheme ? savedTheme : (prefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
      localStorage.setItem("antonio_portfolio_theme", newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const themeToggleBtns = document.querySelectorAll(".theme-toggle-btn");

  themeToggleBtns.forEach(btn => {
    const icon = btn.querySelector("i");
    if (icon) {
      if (theme === "dark") {
        icon.className = "fas fa-sun";
        btn.setAttribute("aria-label", "Switch to Light Mode");
      } else {
        icon.className = "fas fa-moon";
        btn.setAttribute("aria-label", "Switch to Dark Mode");
      }
    }
  });
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  const mobileDrawer = document.querySelector(".mobile-drawer");
  const navBackdrop = document.querySelector(".nav-backdrop");
  const navLinks = document.querySelectorAll(".mobile-nav-item a");

  function openMenu() {
    if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "true");
    if (mobileDrawer) mobileDrawer.classList.add("open");
    if (navBackdrop) navBackdrop.classList.add("active");
    document.body.classList.add("no-scroll");
  }

  function closeMenu() {
    if (mobileToggle) mobileToggle.setAttribute("aria-expanded", "false");
    if (mobileDrawer) mobileDrawer.classList.remove("open");
    if (navBackdrop) navBackdrop.classList.remove("active");
    document.body.classList.remove("no-scroll");
  }

  if (mobileToggle) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener("click", closeMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  });
}

/* --------------------------------------------------------------------------
   3. QUOTATION CALCULATOR / COST ESTIMATOR LOGIC
   -------------------------------------------------------------------------- */
function initQuotationCalculator() {
  const calcContainer = document.getElementById("quotation-calculator");
  if (!calcContainer) return;

  const typeInputs = calcContainer.querySelectorAll('input[name="calc_type"]');
  const scaleInputs = calcContainer.querySelectorAll('input[name="calc_scale"]');
  const featureInputs = calcContainer.querySelectorAll('input[name="calc_feature"]');
  const applyBtn = document.getElementById("apply-quote-btn");

  function calculateQuote() {
    let basePrice = 35000;
    let typeName = "Custom Business POS & Inventory";
    let typeTimelineWeeks = 4;

    const selectedType = calcContainer.querySelector('input[name="calc_type"]:checked');
    if (selectedType) {
      basePrice = parseInt(selectedType.getAttribute("data-price") || "35000", 10);
      typeName = selectedType.getAttribute("data-name") || "Custom System";
      typeTimelineWeeks = parseInt(selectedType.getAttribute("data-weeks") || "4", 10);
    }

    let scalePrice = 0;
    let scaleName = "Single Branch / Core Scope";
    let scaleWeeks = 0;
    const selectedScale = calcContainer.querySelector('input[name="calc_scale"]:checked');
    if (selectedScale) {
      scalePrice = parseInt(selectedScale.getAttribute("data-price") || "0", 10);
      scaleName = selectedScale.getAttribute("data-name") || "Core Scope";
      scaleWeeks = parseInt(selectedScale.getAttribute("data-weeks") || "0", 10);
    }

    let featuresTotal = 0;
    let featureWeeks = 0;
    const selectedFeatures = [];
    calcContainer.querySelectorAll('input[name="calc_feature"]:checked').forEach(feat => {
      const price = parseInt(feat.getAttribute("data-price") || "0", 10);
      const name = feat.getAttribute("data-name") || "Feature";
      const weeks = parseFloat(feat.getAttribute("data-weeks") || "0.5");
      featuresTotal += price;
      featureWeeks += weeks;
      selectedFeatures.push({ name, price });
    });

    const subtotal = basePrice + scalePrice + featuresTotal;
    const highRange = Math.round(subtotal * 1.25);
    const totalWeeksMin = Math.max(2, Math.round(typeTimelineWeeks + scaleWeeks + featureWeeks));
    const totalWeeksMax = Math.round(totalWeeksMin * 1.35);

    // Update UI elements
    const priceDisplay = document.getElementById("calc-price-display");
    const timelineDisplay = document.getElementById("calc-timeline-display");
    const breakdownContainer = document.getElementById("calc-breakdown-items");

    if (priceDisplay) {
      priceDisplay.textContent = `₱${subtotal.toLocaleString()} – ₱${highRange.toLocaleString()}`;
    }

    if (timelineDisplay) {
      timelineDisplay.innerHTML = `<i class="fas fa-calendar-alt"></i> Est. Timeline: ${totalWeeksMin} – ${totalWeeksMax} Weeks`;
    }

    if (breakdownContainer) {
      let breakdownHtml = `
        <li class="calc-breakdown-item">
          <span>${escapeHTML(typeName)}</span>
          <strong>₱${basePrice.toLocaleString()}</strong>
        </li>
      `;

      if (scalePrice > 0) {
        breakdownHtml += `
          <li class="calc-breakdown-item">
            <span>Scale: ${escapeHTML(scaleName)}</span>
            <strong>+₱${scalePrice.toLocaleString()}</strong>
          </li>
        `;
      }

      selectedFeatures.forEach(f => {
        breakdownHtml += `
          <li class="calc-breakdown-item">
            <span>+ ${escapeHTML(f.name)}</span>
            <strong>+₱${f.price.toLocaleString()}</strong>
          </li>
        `;
      });

      breakdownContainer.innerHTML = breakdownHtml;
    }

    // Save in quote state
    calcContainer._currentQuote = {
      typeName,
      scaleName,
      selectedFeatures: selectedFeatures.map(f => f.name),
      priceRange: `₱${subtotal.toLocaleString()} – ₱${highRange.toLocaleString()}`,
      timeline: `${totalWeeksMin} – ${totalWeeksMax} Weeks`,
      estimatedBase: subtotal
    };
  }

  // Bind change events
  typeInputs.forEach(i => i.addEventListener("change", calculateQuote));
  scaleInputs.forEach(i => i.addEventListener("change", calculateQuote));
  featureInputs.forEach(i => i.addEventListener("change", calculateQuote));

  // Initial calculation
  calculateQuote();

  // Apply to inquiry button handler
  if (applyBtn) {
    applyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (calcContainer._currentQuote) {
        sessionStorage.setItem("pending_quote", JSON.stringify(calcContainer._currentQuote));
        window.location.href = "contact.html";
      }
    });
  }
}

function loadPendingQuoteToForm() {
  const pendingQuoteStr = sessionStorage.getItem("pending_quote");
  if (!pendingQuoteStr) return;

  const form = document.getElementById("collaboration-form");
  if (!form) return;

  try {
    const quote = JSON.parse(pendingQuoteStr);
    const clientTypeSelect = document.getElementById("contact-client-type");
    const projectTypeSelect = document.getElementById("contact-project-type");
    const budgetSelect = document.getElementById("contact-budget");
    const timelineSelect = document.getElementById("contact-timeline");
    const messageTextarea = document.getElementById("contact-message");

    if (projectTypeSelect) {
      // Find matching option or closest match
      for (let opt of projectTypeSelect.options) {
        if (opt.value.toLowerCase().includes(quote.typeName.toLowerCase()) ||
          quote.typeName.toLowerCase().includes(opt.value.toLowerCase())) {
          opt.selected = true;
          break;
        }
      }
    }

    if (messageTextarea) {
      const featuresList = quote.selectedFeatures && quote.selectedFeatures.length > 0
        ? quote.selectedFeatures.map(f => `  • ${f}`).join("\n")
        : "  • Standard System Architecture";

      messageTextarea.value =
        `[Calculated Quotation Estimate Basis]\n` +
        `Selected System: ${quote.typeName}\n` +
        `Operational Scale: ${quote.scaleName}\n` +
        `Estimated Price Range: ${quote.priceRange}\n` +
        `Estimated Timeline: ${quote.timeline}\n\n` +
        `Included Specifications & Modules:\n${featuresList}\n\n` +
        `Additional operational notes or business requirements:\n`;
    }

    sessionStorage.removeItem("pending_quote");
    showToast("Loaded your estimated quotation into the inquiry form!");
  } catch (err) {
    console.error("Could not parse pending quote:", err);
  }
}

/* --------------------------------------------------------------------------
   4. CONTACT FORM COMPOSER
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("collaboration-form");
  const copyEmailBtns = document.querySelectorAll(".copy-email-trigger");

  copyEmailBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const email = btn.getAttribute("data-email") || "antoniojrpiloton@gmail.com";
      copyToClipboard(email, "Email address copied to clipboard!");
    });
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name")?.value.trim() || "";
      const email = document.getElementById("contact-email")?.value.trim() || "";
      const clientType = document.getElementById("contact-client-type")?.value || "General Client";
      const projectType = document.getElementById("contact-project-type")?.value || "Software Development";
      const budget = document.getElementById("contact-budget")?.value || "To be scoped";
      const timeline = document.getElementById("contact-timeline")?.value || "Standard";
      const message = document.getElementById("contact-message")?.value.trim() || "";

      if (!name || !email || !message) {
        showToast("Please provide your name, email, and project description.");
        return;
      }

      const subject = encodeURIComponent(`[Project Inquiry: ${clientType}] ${projectType}`);
      const body = encodeURIComponent(
        `Dear Antonio Jr. L. Piloton, MIT,\n\n` +
        `I would like to discuss a software project with the following details:\n\n` +
        `Client Type: ${clientType}\n` +
        `Project Focus: ${projectType}\n` +
        `Target Timeline: ${timeline}\n` +
        `Estimated Budget: ${budget}\n\n` +
        `Project Requirements:\n${message}\n\n` +
        `Sender Coordinates:\n` +
        `Name: ${name}\n` +
        `Email: ${email}`
      );

      const recipient = "antoniojrpiloton@gmail.com";
      const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;
      showToast("Opening default email client...");
      form.reset();
    });
  }
}

/* --------------------------------------------------------------------------
   5. TOAST NOTIFICATIONS & CLIPBOARD HELPER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let toast = document.getElementById("global-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "global-toast";
    toast.className = "toast-container";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: #60A5FA;"></i> <span>${escapeHTML(message)}</span>`;
  toast.classList.add("show");

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function copyToClipboard(text, successMessage) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMessage);
    }).catch(() => {
      fallbackCopyText(text, successMessage);
    });
  } else {
    fallbackCopyText(text, successMessage);
  }
}

function fallbackCopyText(text, successMessage) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast(successMessage);
  } catch (err) {
    showToast(`Email: ${text}`);
  }
  document.body.removeChild(textArea);
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* --------------------------------------------------------------------------
   DYNAMIC DATA HYDRATION (FROM PORTFOLIO_DATA)
   Connects portfolio-data.js as the Single Source of Truth
   -------------------------------------------------------------------------- */
function hydrateFromPortfolioData() {
  if (typeof PORTFOLIO_DATA === "undefined") {
    console.warn("PORTFOLIO_DATA is not defined. Using static markup.");
    return;
  }

  // 1. Hydrate Featured Projects on Homepage (index.html)
  const featuredGrid = document.getElementById("featured-projects-grid");
  if (featuredGrid && Array.isArray(PORTFOLIO_DATA.projects)) {
    const featuredProjects = PORTFOLIO_DATA.projects.slice(0, 2);
    featuredGrid.innerHTML = featuredProjects.map(proj => `
      <article class="project-item">
        <div class="project-item-preview">
          <img src="${proj.image || 'assets/images/projects/pos-system.svg'}" alt="${proj.title}" />
        </div>
        <div class="project-item-body">
          <span class="project-item-category">${proj.categoryLabel || 'Software System'}</span>
          <h3 class="project-item-title">${proj.title}</h3>
          <p class="project-item-summary">${proj.summary}</p>
          <div class="project-tech-tags">
            ${(proj.technologies || []).map(t => renderTechBadge(t)).join('')}
          </div>
          <div class="project-item-footer">
            <a href="projects.html" class="link-arrow">View Case Study <i class="fas fa-arrow-right"></i></a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // 2. Hydrate All Projects Gallery (projects.html)
  const allProjectsGrid = document.getElementById("all-projects-grid");
  if (allProjectsGrid && Array.isArray(PORTFOLIO_DATA.projects)) {
    allProjectsGrid.innerHTML = PORTFOLIO_DATA.projects.map(proj => `
      <article class="project-item" data-category="${proj.category || 'all'}">
        <div class="project-item-preview">
          <img src="${proj.image || 'assets/images/projects/pos-system.svg'}" alt="${proj.title}" />
        </div>
        <div class="project-item-body">
          <span class="project-item-category">${proj.categoryLabel || 'Software System'}</span>
          <h2 class="project-item-title">${proj.title}</h2>
          <p class="project-item-summary">${proj.summary}</p>
          <div class="project-tech-tags">
            ${(proj.technologies || []).map(t => renderTechBadge(t)).join('')}
          </div>
          <div class="project-item-footer" style="display: flex; gap: 1rem; align-items: center; margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--border-light);">
            ${proj.githubUrl ? `
              <a href="${proj.githubUrl}" target="_blank" rel="noopener noreferrer" class="link-arrow">
                <i class="fab fa-github"></i> Repository
              </a>
            ` : ''}
            ${proj.demoUrl ? `
              <a href="${proj.demoUrl}" target="_blank" rel="noopener noreferrer" class="link-arrow">
                <i class="fas fa-external-link-alt"></i> Live Demo
              </a>
            ` : ''}
            <a href="contact.html" class="link-arrow" style="margin-left: auto;">
              Inquire System <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </article>
    `).join('');
  }

  // 3. Hydrate Services (services.html)
  const servicesContainer = document.getElementById("services-container");
  if (servicesContainer && Array.isArray(PORTFOLIO_DATA.services)) {
    servicesContainer.innerHTML = PORTFOLIO_DATA.services.map(svc => `
      <article class="service-item-card">
        <div class="service-item-header">
          <h2 class="service-item-title">${svc.title}</h2>
          <span class="service-item-num">${svc.num || ''}</span>
        </div>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">
          ${svc.description}
        </p>
        <ul class="service-item-deliverables">
          ${(svc.deliverables || []).map(d => `<li><i class="fas fa-check"></i> ${d}</li>`).join('')}
        </ul>
        <div class="project-tech-tags">
          ${(svc.tags || []).map(t => renderTechBadge(t)).join('')}
        </div>
      </article>
    `).join('');
  }

  // 4. Hydrate Publications (research.html)
  const pubContainer = document.getElementById("publications-container");
  if (pubContainer && PORTFOLIO_DATA.publications && Array.isArray(PORTFOLIO_DATA.publications.entries)) {
    pubContainer.innerHTML = PORTFOLIO_DATA.publications.entries.map(pub => `
      <article class="publication-card">
        <div class="pub-indexing-pill">
          <i class="fas fa-award"></i> ${pub.indexingBadge || pub.indexing || 'Peer-Reviewed'}
        </div>
        <h2 class="pub-title">${pub.title}</h2>
        <div class="pub-venue">${pub.journal} • ${pub.volume || ''} (${pub.year})</div>
        <p class="pub-meta">
          <strong>Authors:</strong> ${pub.authors}<br />
          <strong>Abstract Summary:</strong> ${pub.abstract}
        </p>
        <div class="pub-actions">
          ${pub.link ? `
            <a href="${pub.link}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
              <i class="fas fa-file-pdf"></i> Direct PDF
            </a>
          ` : ''}
          ${pub.researchGateUrl ? `
            <a href="${pub.researchGateUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary btn--sm">
              <i class="fab fa-researchgate"></i> ResearchGate
            </a>
          ` : ''}
        </div>
      </article>
    `).join('');
  }

  // 5. Hydrate Academic Timeline (about.html)
  const timelineContainer = document.getElementById("academic-timeline-container");
  if (timelineContainer && PORTFOLIO_DATA.academicProfile && Array.isArray(PORTFOLIO_DATA.academicProfile.education)) {
    timelineContainer.innerHTML = PORTFOLIO_DATA.academicProfile.education.map(edu => `
      <div class="timeline-item">
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="timeline-header">
            <h3 class="timeline-title">${edu.degree}</h3>
            <span class="timeline-period">${edu.period}</span>
          </div>
          <div class="timeline-institution">
            <i class="fas fa-university" style="color: var(--color-champagne); margin-right: 0.35rem;"></i>
            ${edu.institution} — ${edu.location}
          </div>
          <p class="timeline-desc">${edu.notes}</p>
        </div>
      </div>
    `).join('');
  }

  
  // 7. Hydrate & Filter 110 Systems Catalog (services.html)
  const catalogContainer = document.getElementById("system-catalog-container");
  if (catalogContainer && Array.isArray(PORTFOLIO_DATA.systemCatalog)) {
    let currentCategory = "all";
    let currentSearchTerm = "";

    function renderCatalog() {
      const filtered = PORTFOLIO_DATA.systemCatalog.filter(sys => {
        const matchesCategory = currentCategory === "all" || sys.cat === currentCategory;
        const matchesSearch = !currentSearchTerm || 
          sys.title.toLowerCase().includes(currentSearchTerm) ||
          sys.catLabel.toLowerCase().includes(currentSearchTerm);
        return matchesCategory && matchesSearch;
      });

      const counter = document.getElementById("catalog-counter");
      if (counter) {
        counter.textContent = `Showing ${filtered.length} of ${PORTFOLIO_DATA.systemCatalog.length} systems`;
      }

      if (filtered.length === 0) {
        catalogContainer.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 2.5rem 1rem; background-color: var(--bg-surface); border: 1px dashed var(--border-medium); border-radius: var(--radius-md);">
            <i class="fas fa-search" style="font-size: 1.5rem; color: var(--text-muted); margin-bottom: 0.5rem;"></i>
            <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">No custom systems matched your search criteria.</p>
            <p style="font-size: 0.8125rem; color: var(--text-muted);">Try a broader keyword or select "All Systems (110)".</p>
          </div>
        `;
        return;
      }

      catalogContainer.innerHTML = filtered.map(sys => `
        <div class="system-tile-card" data-cat="${sys.cat}">
          <div class="system-tile-icon"><i class="fas ${sys.icon || 'fa-code'}"></i></div>
          <div style="flex-grow: 1; min-width: 0;">
            <div class="system-tile-num">#${sys.id < 10 ? '0' + sys.id : sys.id}</div>
            <div class="system-tile-title">${sys.title}</div>
            <div class="system-tile-cat">${sys.catLabel}</div>
          </div>
        </div>
      `).join('');
    }

    renderCatalog();

    // Attach Category Filter Buttons
    const filterBtns = document.querySelectorAll(".catalog-filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-cat");
        renderCatalog();
      });
    });

    // Attach Search Input
    const searchInput = document.getElementById("catalog-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        currentSearchTerm = e.target.value.trim().toLowerCase();
        renderCatalog();
      });
    }
  }

  // 6. Hydrate Certifications Grid (about.html)
  const certContainer = document.getElementById("cert-grid-container");
  if (certContainer && PORTFOLIO_DATA.academicProfile && Array.isArray(PORTFOLIO_DATA.academicProfile.certifications)) {
    certContainer.innerHTML = PORTFOLIO_DATA.academicProfile.certifications.map(cert => `
      <div class="cert-card">
        <div class="cert-top">
          <div>
            <h3 class="cert-title">${cert.title}</h3>
            <div class="cert-issuer">
              <i class="fas fa-shield-alt" style="color: var(--color-champagne);"></i> ${cert.issuer}
            </div>
          </div>
          <span class="cert-badge">${cert.year} ${cert.hours ? '• ' + cert.hours + ' hrs' : ''}</span>
        </div>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin: 0;">${cert.badge || 'Verified Credential'}</p>
      </div>
    `).join('');
  }
}
