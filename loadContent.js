// ═══════════════════════════════════════════════════════════════════════
// Content Editor - Allow editing content in browser
// ═══════════════════════════════════════════════════════════════════════

let EDIT_MODE = false;

/**
 * Toggle edit mode for content
 */
function toggleEditMode() {
  EDIT_MODE = !EDIT_MODE;
  const editableElements = document.querySelectorAll('[data-editable]');

  editableElements.forEach(el => {
    if (EDIT_MODE) {
      el.contentEditable = 'true';
      el.classList.add('editing');
      el.addEventListener('input', markAsModified);
    } else {
      el.contentEditable = 'false';
      el.classList.remove('editing');
    }
  });

  // Add save button when in edit mode
  if (EDIT_MODE && !document.getElementById('save-btn')) {
    const saveBtn = document.createElement('button');
    saveBtn.id = 'save-btn';
    saveBtn.textContent = '💾 Save Changes';
    saveBtn.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--green);
      color: var(--bg);
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      z-index: 1000;
      box-shadow: var(--shadow);
    `;
    saveBtn.onclick = saveChanges;
    document.body.appendChild(saveBtn);
  } else if (!EDIT_MODE && document.getElementById('save-btn')) {
    document.getElementById('save-btn').remove();
  }
}

/**
 * Mark element as modified
 */
function markAsModified(event) {
  event.target.setAttribute('data-modified', 'true');
  window.contentModified = true;
}

/**
 * Save changes back to content data
 */
function saveChanges() {
  if (!CONTENT_DATA) return;

  // Collect modified content
  const modifiedElements = document.querySelectorAll('[data-modified="true"]');

  modifiedElements.forEach(el => {
    const contentId = el.id;
    const newContent = el.textContent || el.innerHTML;

    // Update CONTENT_DATA based on element ID
    updateContentData(contentId, newContent);
  });

  // Show success message
  showNotification('Changes saved! Refresh page to see them persist.', 'success');

  // Reset modification flags
  modifiedElements.forEach(el => el.removeAttribute('data-modified'));
  window.contentModified = false;
}

/**
 * Update CONTENT_DATA based on element ID
 */
function updateContentData(elementId, newContent) {
  const lang = window.currentLang || 'en';
  const t = lang === 'fr' ? 'fr' : 'en';

  switch(elementId) {
    case 'avail-txt':
      CONTENT_DATA.availability[t] = newContent;
      break;
    case 'eyebrow-txt':
      CONTENT_DATA.home.eyebrow[t] = newContent;
      break;
    case 'tagline-txt':
      CONTENT_DATA.home.tagline[t] = newContent;
      break;
    case 'desc-txt':
      CONTENT_DATA.home.description[t] = newContent;
      break;
    case 'stack-label-txt':
      CONTENT_DATA.home.stack_label[t] = newContent;
      break;
    case 'exp-title':
      CONTENT_DATA.experience.title[t] = newContent;
      break;
    case 'exp-sub':
      CONTENT_DATA.experience.subtitle[t] = newContent;
      break;
    case 'proj-title':
      CONTENT_DATA.projects.title[t] = newContent;
      break;
    case 'btn-code-txt':
      CONTENT_DATA.projects.toggles.code[t] = newContent;
      break;
    case 'btn-demo-txt':
      CONTENT_DATA.projects.toggles.demo[t] = newContent;
      break;
    case 'proj-sub-code':
      CONTENT_DATA.projects.subtitles.code[t] = newContent;
      break;
    case 'proj-sub-demo':
      CONTENT_DATA.projects.subtitles.demo[t] = newContent;
      break;
    case 'load-more-btn':
      CONTENT_DATA.projects.load_more[t] = newContent;
      break;
    case 'cert-title':
      CONTENT_DATA.certifications.title[t] = newContent;
      break;
    case 'cert-sub':
      CONTENT_DATA.certifications.subtitle[t] = newContent;
      break;
  }
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: ${type === 'success' ? 'var(--green)' : 'var(--blue)'};
    color: var(--bg);
    padding: 12px 20px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    box-shadow: var(--shadow);
    animation: slideIn 0.3s ease;
  `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
  [data-editable].editing {
    outline: 2px solid var(--green);
    background: rgba(74, 222, 128, 0.1);
    border-radius: 4px;
  }
`;
document.head.appendChild(style);

// Add keyboard shortcut for edit mode (Ctrl+E)
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 'e') {
    e.preventDefault();
    toggleEditMode();
    showNotification(EDIT_MODE ? 'Edit mode enabled! Click any text to edit.' : 'Edit mode disabled.', 'info');
  }
});

let CONTENT_DATA = null;

async function loadContentData() {
  try {
    const response = await fetch('content.json');
    if (!response.ok) throw new Error('Failed to fetch content.json');
    CONTENT_DATA = await response.json();
    
    // Apply initial language
    applyContent(window.currentLang || 'en');
    return true;
  } catch (error) {
    console.error('Error loading content:', error);
    return false;
  }
}

/**
 * Apply content to DOM based on current language
 * @param {string} lang - Language code ('en' or 'fr')
 */
function applyContent(lang) {
  if (!CONTENT_DATA) {
    console.warn('Content data not loaded yet');
    return;
  }

  const c = CONTENT_DATA;
  const t = lang === 'fr' ? 'fr' : 'en';

  // ── Logo
  const logoEl = document.querySelector('.logo');
  if (logoEl) {
    logoEl.innerHTML = `${c.personal.logo_text}<em>${c.personal.logo_suffix}</em>`;
  }

  // ── Top bar - Availability
  const availTxt = document.getElementById('avail-txt');
  if (availTxt) availTxt.textContent = c.availability[t];

  // ── Home section
  const eyebrowTxt = document.getElementById('eyebrow-txt');
  if (eyebrowTxt) eyebrowTxt.textContent = c.home.eyebrow[t];

  const taglineTxt = document.getElementById('tagline-txt');
  if (taglineTxt) taglineTxt.textContent = c.home.tagline[t];

  const descTxt = document.getElementById('desc-txt');
  if (descTxt) descTxt.innerHTML = c.home.description[t];

  const stackLabelTxt = document.getElementById('stack-label-txt');
  if (stackLabelTxt) stackLabelTxt.textContent = c.home.stack_label[t];

  // ── Experience section
  const expTitle = document.getElementById('exp-title');
  if (expTitle) expTitle.innerHTML = c.experience.title[t];

  const expSub = document.getElementById('exp-sub');
  if (expSub) expSub.textContent = c.experience.subtitle[t];

  // Apply experience entries
  c.experience.jobs.forEach((job, idx) => {
    const roleEl = document.getElementById(`role-${idx}`);
    if (roleEl) roleEl.textContent = job.role[t];

    const bulletsList = document.getElementById(`bullets-${idx}`);
    if (bulletsList) {
      const lis = bulletsList.querySelectorAll('li');
      lis.forEach((li, bulletIdx) => {
        if (job.bullets[t] && job.bullets[t][bulletIdx]) {
          li.innerHTML = job.bullets[t][bulletIdx];
        }
      });
    }
  });

  // ── Projects section
  const projTitle = document.getElementById('proj-title');
  if (projTitle) projTitle.innerHTML = c.projects.title[t];

  const btnCodeTxt = document.getElementById('btn-code-txt');
  if (btnCodeTxt) btnCodeTxt.textContent = c.projects.toggles.code[t];

  const btnDemoTxt = document.getElementById('btn-demo-txt');
  if (btnDemoTxt) btnDemoTxt.textContent = c.projects.toggles.demo[t];

  const projSubCode = document.getElementById('proj-sub-code');
  if (projSubCode) projSubCode.textContent = c.projects.subtitles.code[t];

  const projSubDemo = document.getElementById('proj-sub-demo');
  if (projSubDemo) projSubDemo.textContent = c.projects.subtitles.demo[t];

  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn) loadMoreBtn.textContent = c.projects.load_more[t];

  // ── Certifications section
  const certTitle = document.getElementById('cert-title');
  if (certTitle) certTitle.innerHTML = c.certifications.title[t];

  const certSub = document.getElementById('cert-sub');
  if (certSub) certSub.textContent = c.certifications.subtitle[t];

  // Apply certification descriptions
  c.certifications.certs.forEach((cert, idx) => {
    const certDesc = document.getElementById(`cert-desc-${idx}`);
    if (certDesc) certDesc.textContent = cert.description[t];
  });

  // Regenerate demos with updated language
  if (window._demosLoaded) {
    window._demosLoaded = false;
    renderDemosFromData();
  }
}

/**
 * Render demos using content data instead of hardcoded DEMOS array
 */
function renderDemosFromData() {
  if (!CONTENT_DATA) return;

  const lang = window.currentLang || 'en';
  const gifSoon = lang === 'fr' ? 'GIF bientôt disponible' : 'GIF coming soon';
  const grid = document.getElementById('demos-grid');
  
  if (!grid) return;
  
  grid.innerHTML = '';

  CONTENT_DATA.projects.demos.forEach(function(d) {
    const desc = lang === 'fr' ? d.description.fr : d.description.en;
    const thumb = d.gif 
      ? `<img src="${d.gif}" alt="${d.title}" loading="lazy">`
      : `<div class="demo-thumb-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>${gifSoon}</span></div>`;
    
    const tags = d.stack.map(function(t) { return `<span class="demo-tag">${t}</span>`; }).join('');
    const ghBtn = d.repo ? `<a href="${d.repo}" target="_blank" class="demo-link demo-link-gh">GitHub</a>` : '';
    const playBtn = d.repo ? `<a href="${d.repo}" target="_blank" class="demo-play"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg></a>` : '';

    const card = `
      <div class="demo-card">
        <div class="demo-thumb">
          ${thumb}
          <span class="demo-badge ${d.badge}">${d.badge_label}</span>
          ${playBtn}
        </div>
        <div class="demo-body">
          <div class="demo-title">${d.title}</div>
          <div class="demo-desc">${desc}</div>
          <div class="demo-stack">${tags}</div>
          <div class="demo-links">${ghBtn}</div>
        </div>
      </div>
    `;
    
    grid.innerHTML += card;
  });

  window._demosLoaded = true;
}

/**
 * Override the original setLang function to also apply content
 */
const originalSetLang = window.setLang;
window.setLang = function(lang, btn) {
  window.currentLang = lang;

  // Original language setup for nav buttons
  document.querySelectorAll('.lang-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');
  document.documentElement.lang = lang;

  // Only apply content if data is loaded and we're not preserving user changes
  if (CONTENT_DATA && !window.contentModified) {
    applyContent(lang);
  } else if (CONTENT_DATA) {
    // If content was modified, just update language-specific elements
    applyLanguageOnly(lang);
  }
};

/**
 * Apply only language-specific content without overwriting user changes
 * @param {string} lang - Language code ('en' or 'fr')
 */
function applyLanguageOnly(lang) {
  const t = lang === 'fr' ? 'fr' : 'en';

  // Only update elements that should change with language
  const availTxt = document.getElementById('avail-txt');
  if (availTxt && !availTxt.hasAttribute('data-modified')) {
    availTxt.textContent = CONTENT_DATA.availability[t];
  }

  const stackLabelTxt = document.getElementById('stack-label-txt');
  if (stackLabelTxt && !stackLabelTxt.hasAttribute('data-modified')) {
    stackLabelTxt.textContent = CONTENT_DATA.home.stack_label[t];
  }

  const expTitle = document.getElementById('exp-title');
  if (expTitle && !expTitle.hasAttribute('data-modified')) {
    expTitle.innerHTML = CONTENT_DATA.experience.title[t];
  }

  const expSub = document.getElementById('exp-sub');
  if (expSub && !expSub.hasAttribute('data-modified')) {
    expSub.textContent = CONTENT_DATA.experience.subtitle[t];
  }

  const projTitle = document.getElementById('proj-title');
  if (projTitle && !projTitle.hasAttribute('data-modified')) {
    projTitle.innerHTML = CONTENT_DATA.projects.title[t];
  }

  const btnCodeTxt = document.getElementById('btn-code-txt');
  if (btnCodeTxt && !btnCodeTxt.hasAttribute('data-modified')) {
    btnCodeTxt.textContent = CONTENT_DATA.projects.toggles.code[t];
  }

  const btnDemoTxt = document.getElementById('btn-demo-txt');
  if (btnDemoTxt && !btnDemoTxt.hasAttribute('data-modified')) {
    btnDemoTxt.textContent = CONTENT_DATA.projects.toggles.demo[t];
  }

  const projSubCode = document.getElementById('proj-sub-code');
  if (projSubCode && !projSubCode.hasAttribute('data-modified')) {
    projSubCode.textContent = CONTENT_DATA.projects.subtitles.code[t];
  }

  const projSubDemo = document.getElementById('proj-sub-demo');
  if (projSubDemo && !projSubDemo.hasAttribute('data-modified')) {
    projSubDemo.textContent = CONTENT_DATA.projects.subtitles.demo[t];
  }

  const loadMoreBtn = document.getElementById('load-more-btn');
  if (loadMoreBtn && !loadMoreBtn.hasAttribute('data-modified')) {
    loadMoreBtn.textContent = CONTENT_DATA.projects.load_more[t];
  }

  const certTitle = document.getElementById('cert-title');
  if (certTitle && !certTitle.hasAttribute('data-modified')) {
    certTitle.innerHTML = CONTENT_DATA.certifications.title[t];
  }

  const certSub = document.getElementById('cert-sub');
  if (certSub && !certSub.hasAttribute('data-modified')) {
    certSub.textContent = CONTENT_DATA.certifications.subtitle[t];
  }

  // Update demos with new language
  if (window._demosLoaded) {
    window._demosLoaded = false;
    renderDemosFromData();
  }
}

/**
 * Initialize content loader on page load
 */
document.addEventListener('DOMContentLoaded', async function() {
  const success = await loadContentData();
  if (!success) {
    console.warn('Content auto-loader: Failed to load content.json, falling back to hardcoded content');
  }
});

// Ensure content is loaded if script runs after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadContentData);
} else {
  loadContentData();
}