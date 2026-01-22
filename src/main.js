const app = document.getElementById('app');
let currentLang = 'en';

const translations = {
  en: {
    welcome: 'RESEA Resource Hub',
    hillsborough: 'Hillsborough County',
    pinellas: 'Pinellas County',
    enter: 'Enter Portal',
    warning: 'ATTENTION: Failure to appear for your scheduled appointment or complete required services will result in a disqualification of your Reemployment Assistance benefits.',
    process: 'The RESEA Process',
    checklist: 'Pre-Appointment Checklist',
    locations: 'Office Locations',
    faq: 'FAQ & Compliance',
    employFlorida: 'Employ Florida Portal',
    babelNotice: 'Language Assistance / Babel Notice'
  },
  es: {
    welcome: 'Centro de Recursos RESEA',
    hillsborough: 'Condado de Hillsborough',
    pinellas: 'Condado de Pinellas',
    enter: 'Entrar al Portal',
    warning: 'ATENCIÓN: Si no se presenta a su cita programada o no completa los servicios requeridos, se le descalificará de sus beneficios de Asistencia para el Reempleo.',
    process: 'El Proceso RESEA',
    checklist: 'Lista de Verificación Previa',
    locations: 'Ubicaciones de Oficinas',
    faq: 'Preguntas Frecuentes y Cumplimiento',
    employFlorida: 'Portal de Employ Florida',
    babelNotice: 'Asistencia Lingüística / Aviso de Babel'
  },
  ht: {
    welcome: 'Sant Resous RESEA',
    hillsborough: 'Konte Hillsborough',
    pinellas: 'Konte Pinellas',
    enter: 'Antre nan Pòtal la',
    warning: 'ATANSYON: Si w pa prezante nan randevou w la oswa si w pa konplete sèvis yo mande yo, sa ap lakòz ou pèdi benefis Asistans Reyanplwa w yo.',
    process: 'Pwosesis RESEA a',
    checklist: 'Lis Verifikasyon anvan Randevou',
    locations: 'Kote Biwo yo ye',
    faq: 'Kesyon yo poze souvan ak Konfòmite',
    employFlorida: 'Pòtal Employ Florida',
    babelNotice: 'Asistans Lang / Avi Babel'
  }
};

function t(key) {
  return translations[currentLang][key] || key;
}

function toggleLanguage() {
  const langs = ['en', 'es', 'ht'];
  const nextIndex = (langs.indexOf(currentLang) + 1) % langs.length;
  currentLang = langs[nextIndex];

  const labelMap = { 'en': 'Español', 'es': 'Kreyòl', 'ht': 'English' };
  document.getElementById('btn-es').textContent = labelMap[currentLang];
  handleRoute();
}

const routes = {
  '/': renderHome,
  '/hillsborough': renderHillsborough,
  '/hillsborough/orientation': renderHillsboroughOrientation,
  '/pinellas': renderPinellas,
  '/pinellas/orientation': renderPinellasOrientation,
  '/resea-process': renderReseaProcess,
  '/checklist': renderChecklist,
  '/locations': renderLocations,
  '/faq': renderFaq,
  '/babel-notice': renderBabelNotice
};

function navigate(path) {
  window.history.pushState({}, '', path);
  handleRoute();
}

function handleRoute() {
  const path = window.location.pathname;
  const renderer = routes[path] || renderHome;
  app.innerHTML = renderer();
  window.scrollTo(0, 0);
}

// Event delegation for links and language toggle
document.addEventListener('click', (e) => {
  const link = e.target.closest('a');
  if (link && link.getAttribute('href') && link.getAttribute('href').startsWith('/')) {
    e.preventDefault();
    navigate(link.getAttribute('href'));
  }

  if (e.target.id === 'btn-es') {
    toggleLanguage();
  }
});

window.onpopstate = handleRoute;

function renderHome() {
  return `
    <section class="unified-hero">
      <div class="container">
        <a href="/checklist" class="start-here-box">
          <i class="fa-solid fa-circle-play"></i> NEW HERE? START WITH THE CHECKLIST
        </a>
        <h1>${t('welcome')}</h1>
        <p>Unofficial resource hub for claimants in Hillsborough and Pinellas counties.</p>
        <div class="hero-options">
          <div class="hero-card">
            <h2>Hillsborough</h2>
            <p style="margin-bottom: var(--spacing-md);">CareerSource Tampa Bay</p>
            <a href="/hillsborough" class="btn btn-accent">${t('enter')}</a>
          </div>

          <!-- Reschedule Card -->
          <div class="hero-card" style="border: 1px solid rgba(255,255,255,0.4);">
            <h3 style="color: var(--white); margin-bottom: var(--spacing-xs); font-size: 1.1rem;">🗓️ Reschedule Request</h3>
            <p style="font-size: 0.75rem; line-height: 1.4; margin-bottom: var(--spacing-sm); opacity: 0.9;">
              Unable to attend or returned to work? Please refer to your <strong>appointment letter or email</strong> and scan the barcode provided to request a reschedule.
            </p>
            <p style="font-size: 0.7rem; line-height: 1.3; opacity: 0.8; font-style: italic;">
              Note: Failure to complete your RESEA appointment within 30 days from your original date may adversely impact your benefits.
            </p>
          </div>

          <div class="hero-card">
            <h2>Pinellas</h2>
            <p style="margin-bottom: var(--spacing-md);">CareerSource Tampa Bay</p>
            <a href="/pinellas" class="btn btn-accent">${t('enter')}</a>
          </div>
        </div>
      </div>
    </section>
    <section class="container section">
      <div class="home-grid">
        <!-- Main Column: Video -->
        <div class="main-content">
          <div class="card" style="border-top: 5px solid var(--accent-color); height: 100%;">
            <h2 style="margin-bottom: var(--spacing-sm);">📺 Featured: Decoding RESEA</h2>
            <p style="margin-bottom: var(--spacing-lg); color: var(--text-secondary);">Watch our comprehensive walkthrough to understand how to successfully navigate your RESEA appointment.</p>
            <div class="video-player-container">
              <video controls>
                <source src="/Decoding_RESEA.mp4" type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <!-- Sidebar: Info & Warning -->
        <div class="sidebar">
          <div class="warning-banner">
            <p><strong>${t('warning')}</strong></p>
          </div>
          
          <div class="card">
            <h3>General Information</h3>
            <ul style="list-style: none; margin-top: var(--spacing-md); display: grid; gap: var(--spacing-md);">
              <li><i class="fa-solid fa-arrow-right" style="color: var(--accent-color);"></i> <a href="/resea-process">${t('process')}</a></li>
              <li><i class="fa-solid fa-arrow-right" style="color: var(--accent-color);"></i> <a href="/checklist">${t('checklist')}</a></li>
              <li><i class="fa-solid fa-arrow-right" style="color: var(--spacing-accent);"></i> <a href="/locations">${t('locations')}</a></li>
              <li><i class="fa-solid fa-arrow-right" style="color: var(--spacing-accent);"></i> <a href="/faq">${t('faq')}</a></li>
              <li><i class="fa-solid fa-arrow-right" style="color: var(--spacing-accent);"></i> <a href="/babel-notice">${t('babelNotice')}</a></li>
              <li><i class="fa-solid fa-external-link" style="color: var(--spacing-accent);"></i> <a href="https://www.employflorida.com" target="_blank" rel="noopener">${t('employFlorida')} &nearr;</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderHillsborough() {
  return `
    <section class="container section">
      <h1>Hillsborough County (CareerSource Tampa Bay)</h1>
      <p class="text-secondary">Welcome, Hillsborough claimant. This portal provides specific information for your appointment at CareerSource Tampa Bay.</p>
      
      <div class="card" style="margin-top: var(--spacing-lg);">
        <h3>Local Programs & Tools</h3>
        <ul style="margin-top: var(--spacing-md);">
          <li>
            <strong>Orientation:</strong> <a href="/hillsborough/orientation" style="text-decoration: underline;">View Orientation PDF Online &rarr;</a>
            <div style="margin-top: var(--spacing-sm);">
              <a href="/hillsborough/orientation">
                <img src="/orientation_preview.png" alt="Hillsborough Orientation Preview" style="width: 100%; max-width: 400px; border-radius: var(--border-radius); border: 1px solid var(--text-muted); box-shadow: var(--shadow-sm);">
              </a>
            </div>
            <div style="margin-top: var(--spacing-md); display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
              <a href="/RESEA Hillsborough.pdf" download class="btn btn-primary" style="gap: 0.5rem;"><i class="fa-solid fa-file-pdf"></i> Download/Print PDF</a>
            </div>
          </li>
          <li style="margin-top: var(--spacing-md);"><strong>CLIFF Dashboard:</strong> Financial forecasting tool used to help you understand how changes in income might affect your benefits.</li>
          <li><strong>OAS Wizard:</strong> Objective Assessment Summary tool used during your interview.</li>
          <li><strong>Veteran Services:</strong> Priority assistance for military veterans.</li>
        </ul>
        <div style="margin-top: var(--spacing-lg); display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
          <a href="tel:8139307400" class="action-btn"><i class="fa-solid fa-phone"></i> Call Office (813) 930-7400</a>
        </div>
      </div>

      <div style="margin-top: var(--spacing-xl);">
        <h3>Centers</h3>
        <p>Tampa, Brandon, Ruskin, Plant City</p>
        <a href="/locations" class="btn btn-primary" style="margin-top: var(--spacing-md);">View Map & Details</a>
      </div>
    </section>
  `;
}

function renderHillsboroughOrientation() {
  return `
    <section class="container section">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg); flex-wrap: wrap; gap: var(--spacing-md);">
        <h1>Hillsborough Orientation</h1>
        <a href="/hillsborough" class="btn btn-primary">&larr; Back to Portal</a>
      </div>
      
      <div class="card" style="margin-bottom: var(--spacing-md); background: #e9ecef; border-left: 4px solid var(--primary-color);">
        <p><strong>Mobile Tip:</strong> If the document doesn't display below, tap the button to view it directly.</p>
        <a href="/RESEA Hillsborough.pdf" target="_blank" class="btn btn-accent" style="margin-top: var(--spacing-sm);">
          <i class="fa-solid fa-file-pdf"></i> View Full PDF (Mobile-Friendly)
        </a>
      </div>

      <div class="card" style="padding: 0; overflow: hidden; height: 80vh; border: 1px solid #dee2e6;">
        <iframe src="/RESEA Hillsborough.pdf" width="100%" height="100%" style="border: none;"></iframe>
      </div>
      
      <div style="margin-top: var(--spacing-md); text-align: center;">
        <p>Problem viewing? <a href="/RESEA Hillsborough.pdf" download style="text-decoration: underline;">Download the PDF directly</a></p>
      </div>
    </section>
  `;
}

function renderPinellas() {
  return `
    <section class="container section">
      <h1>Pinellas County (CareerSource Tampa Bay)</h1>
      <p class="text-secondary">Welcome, Pinellas claimant. This portal provides specific information for your appointment at CareerSource Tampa Bay.</p>
      
      <div class="card" style="margin-top: var(--spacing-lg);">
        <h3>Local Programs & Tools</h3>
        <ul style="margin-top: var(--spacing-md);">
          <li>
            <strong>Orientation:</strong> <a href="/pinellas/orientation" style="text-decoration: underline;">View Orientation PDF Online &rarr;</a>
            <div style="margin-top: var(--spacing-sm);">
              <a href="/pinellas/orientation">
                <img src="/orientation_preview.png" alt="Pinellas Orientation Preview" style="width: 100%; max-width: 400px; border-radius: var(--border-radius); border: 1px solid var(--text-muted); box-shadow: var(--shadow-sm);">
              </a>
            </div>
            <div style="margin-top: var(--spacing-md); display: flex; gap: var(--spacing-sm); flex-wrap: wrap;">
              <a href="/RESEA Pinellas.pdf" download class="btn btn-primary" style="gap: 0.5rem;"><i class="fa-solid fa-file-pdf"></i> Download/Print PDF</a>
            </div>
          </li>
          <li style="margin-top: var(--spacing-md);"><strong>CLIFF Dashboard:</strong> Financial forecasting tool used to help you understand how changes in income might affect your benefits.</li>
          <li><strong>OAS Wizard:</strong> Objective Assessment Summary tool used during your interview.</li>
          <li><strong>Veteran Services:</strong> Priority assistance for military veterans.</li>
        </ul>
      </div>

      <div class="card" style="margin-top: var(--spacing-lg); display: flex; gap: var(--spacing-lg); align-items: center; flex-wrap: wrap;">
        <img src="/sothr_contact.png" alt="Ranya Soth" style="width: 120px; height: 150px; object-fit: cover; object-position: top; border-radius: var(--border-radius); border: 2px solid var(--accent-color);">
        <div>
          <h3>Reschedule Contact</h3>
          <p style="margin-top: var(--spacing-xs);"><strong>Ranya Soth, RESEA Lead</strong></p>
          <div style="display: flex; gap: var(--spacing-sm); flex-wrap: wrap; margin-top: var(--spacing-sm);">
            <a href="tel:7276082443" class="action-btn"><i class="fa-solid fa-phone"></i> Call Now</a>
            <a href="mailto:sothr@careersourcetb.com" class="action-btn"><i class="fa-solid fa-envelope"></i> Email Now</a>
          </div>
          <p style="margin-top: var(--spacing-md); font-size: 0.85rem; color: var(--accent-color); font-weight: 600;">
            ⚠️ Failure to complete your RESEA appointment within 30 days from your original appointment date may adversely impact your benefits.
          </p>
        </div>
      </div>

      <div style="margin-top: var(--spacing-xl);">
        <h3>Centers</h3>
        <p>St. Petersburg, Clearwater, Tarpon Springs</p>
        <a href="/locations" class="btn btn-accent" style="margin-top: var(--spacing-md);">View Map & Details</a>
      </div>
    </section>
  `;
}

function renderPinellasOrientation() {
  return `
    <section class="container section">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-lg); flex-wrap: wrap; gap: var(--spacing-md);">
        <h1>Pinellas Orientation</h1>
        <a href="/pinellas" class="btn btn-primary">&larr; Back to Portal</a>
      </div>

      <div class="card" style="margin-bottom: var(--spacing-md); background: #e9ecef; border-left: 4px solid var(--primary-color);">
        <p><strong>Mobile Tip:</strong> If the document doesn't display below, tap the button to view it directly.</p>
        <a href="/RESEA Pinellas.pdf" target="_blank" class="btn btn-accent" style="margin-top: var(--spacing-sm);">
          <i class="fa-solid fa-file-pdf"></i> View Full PDF (Mobile-Friendly)
        </a>
      </div>

      <div class="card" style="padding: 0; overflow: hidden; height: 80vh; border: 1px solid #dee2e6;">
        <iframe src="/RESEA Pinellas.pdf" width="100%" height="100%" style="border: none;"></iframe>
      </div>
      
      <div style="margin-top: var(--spacing-md); text-align: center;">
        <p>Problem viewing? <a href="/RESEA Pinellas.pdf" download style="text-decoration: underline;">Download the PDF directly</a></p>
      </div>
    </section>
  `;
}

function renderReseaProcess() {
  return `
    <section class="container section">
      <h1>The RESEA Process</h1>
      <p class="text-secondary">RESEA is a mandatory 4-step program designed to help you return to work quickly.</p>
      
      <div class="roadmap">
        <div class="roadmap-step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h4>Orientation</h4>
            <p>Overview of CareerSource services, partner programs, and your rights/responsibilities.</p>
          </div>
        </div>
        <div class="roadmap-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h4>Assessment</h4>
            <p>One-on-one review of your skills, work history, and any potential barriers to employment.</p>
          </div>
        </div>
        <div class="roadmap-step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h4>LMI</h4>
            <p>Labor Market Information: Local data on high-demand jobs and wage expectations in Tampa Bay.</p>
          </div>
        </div>
        <div class="roadmap-step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h4>IEP</h4>
            <p>Individual Employment Plan: A customized, signed action plan with specific goals.</p>
          </div>
        </div>
        <div class="roadmap-step">
          <div class="step-number">5</div>
          <div class="step-content">
            <h4>CLIFF Dashboard (if applicable)</h4>
            <p>A financial forecasting tool used to help you understand how changes in income might affect your benefits and overall budget.</p>
          </div>
        </div>
        <div class="roadmap-step">
          <div class="step-number">6</div>
          <div class="step-content">
            <h4>Veteran Intake (if applicable)</h4>
            <p>Specialized assessment and priority service intake for military veterans and eligible spouses.</p>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderChecklist() {
  return `
    <section class="container section">
      <h1>Pre-Appointment Checklist</h1>
      <div class="warning-banner">
        <p>Complete these steps <strong>BEFORE</strong> your appointment to avoid delays or disqualification.</p>
      </div>
      
      <div class="card">
        <ul style="list-style: none; padding-left: 0;">
          <li style="margin-bottom: var(--spacing-md);">
            <input type="checkbox" id="ef-reg">
            <label for="ef-reg"><strong>Employ Florida Registration:</strong> Full registration at <a href="https://www.employflorida.com" target="_blank">EmployFlorida.com</a>.</label>
          </li>
          <li style="margin-bottom: var(--spacing-md);">
            <input type="checkbox" id="bg-wizard">
            <label for="bg-wizard"><strong>Background Wizard:</strong> Completed within the Employ Florida portal.</label>
          </li>
          <li style="margin-bottom: var(--spacing-md);">
            <input type="checkbox" id="resume">
            <label for="resume"><strong>Current Resume:</strong> Uploaded or created in the Employ Florida system.</label>
          </li>
        </ul>
      </div>
    </section>
  `;
}

function renderLocations() {
  return `
    <section class="container section">
      <h1>Office Locations</h1>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: var(--spacing-xl); margin-top: var(--spacing-lg);">
        <div>
          <h3>Hillsborough Centers</h3>
          <p><strong>Tampa:</strong> 9215 N Florida Ave, Tampa, FL 33612</p>
          <p><strong>Brandon:</strong> 9350 Bay Plaza Blvd, Tampa, FL 33619</p>
          <p><strong>Plant City:</strong> 307 N Michigan Ave, Plant City, FL 33563</p>
          <div class="card" style="margin-top: var(--spacing-md); padding: 0; height: 300px; overflow: hidden;">
            <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d112759.1388556096!2d-82.50290947761014!3d27.971708819441164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCareerSource%20Tampa%20Bay!5e0!3m2!1sen!2sus!4v1705697000000!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
        <div>
          <h3>Pinellas Centers</h3>
          <p><strong>St. Pete:</strong> 3420 8th Ave S, St. Petersburg, FL 33711</p>
          <p><strong>Clearwater:</strong> 2312 Gully-to-Bay Blvd, Clearwater, FL 33765</p>
          <p><strong>Tarpon Springs:</strong> 682 E Klosterman Rd, Tarpon Springs, FL 34689</p>
          <div class="card" style="margin-top: var(--spacing-md); padding: 0; height: 300px; overflow: hidden;">
             <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d225841.0118671689!2d-82.78345711684497!3d27.816928230554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sCareerSource%20Tampa%20Bay%20Pinellas!5e0!3m2!1sen!2sus!4v1705697000000!5m2!1sen!2sus" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>
    </section>
  `;
}

function renderFaq() {
  return `
    <section class="container section">
      <h1>${t('faq')}</h1>
      <div class="card" style="margin-top: var(--spacing-lg);">
        <h4>What happens if I miss my appointment?</h4>
        <p>Missing a mandatory RESEA appointment without an approved excuse will result in a "Failure to Report" and a hold on your benefits.</p>
        
        <h4 style="margin-top: var(--spacing-lg);">How do I reschedule?</h4>
        <p>Contact your specific CareerSource office immediately at the numbers provided on the county landing pages.</p>
        <p style="margin-top: var(--spacing-sm); color: var(--accent-color); font-weight: 600;">Please note, failure to complete your RESEA appointment within 30 days from your original appointment date may adversely impact your benefits.</p>
        
        <h4 style="margin-top: var(--spacing-lg);">What are the work search requirements?</h4>
        <p>As part of RESEA, you must complete and document 5 work search contacts per week.</p>
      </div>
      </div>
    </section>
  `;
}

function renderBabelNotice() {
  return `
    <section class="container section">
      <h1>Language Assistance / Babel Notice</h1>
      <p class="text-secondary" style="margin-bottom: var(--spacing-lg);">CareerSource Tampa Bay provides free language assistance to individuals with Limited English Proficiency. Below is the official multi-language notice of availability.</p>
      
      <div class="card" style="padding: 0; overflow: hidden; height: 80vh;">
        <iframe src="/Babel notice.pdf" width="100%" height="100%" style="border: none;"></iframe>
      </div>
      
      <div class="card" style="margin-top: var(--spacing-xl); text-align: center;">
        <h3>General Assistance Hotline</h3>
        <p style="font-size: 1.5rem; font-weight: 700; color: var(--accent-color); margin-top: var(--spacing-sm);">1-833-FL-APPLY (1-833-352-7759)</p>
        <p style="margin-top: var(--spacing-sm);">Monday - Friday: 8:00 AM - 5:00 PM EST</p>
        <p style="margin-top: var(--spacing-md);"><a href="/Babel notice.pdf" download class="btn btn-primary">Download Official PDF Notice</a></p>
      </div>
    </section>
  `;
}

// Initial route handling
handleRoute();
