// =========================================================================
// Main Application Scripts: Listings, Filters, Modal, Forms & Interactions
// =========================================================================

// Sample Real Estate Properties Data
const PROPERTIES_DATA = [
  {
    id: 1,
    title: 'The Azure Horizon Villa',
    type: 'villa',
    price: 1850000,
    priceFormatted: '$1,850,000',
    location: 'Malibu Coast, CA',
    beds: 5,
    baths: 6,
    sqft: '5,400 sq ft',
    tag: 'Featured',
    tagColor: 'bg-emerald-500',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
    description: 'An architectural marvel offering uninterrupted panoramic ocean views, private infinity pool, wine cellar, and private beach access. Smart home automation throughout.'
  },
  {
    id: 2,
    title: 'Skyline Luminary Penthouse',
    type: 'penthouse',
    price: 2400000,
    priceFormatted: '$2,400,000',
    location: 'Downtown Manhattan, NY',
    beds: 4,
    baths: 4.5,
    sqft: '4,200 sq ft',
    tag: 'Exclusive',
    tagColor: 'bg-sky-500',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    description: 'Breathtaking 360-degree skyline views featuring floor-to-ceiling glass, wrap-around private terrace, private elevator entrance, and bespoke Italian marble finishes.'
  },
  {
    id: 3,
    title: 'The Modernist Woodland Retreat',
    type: 'villa',
    price: 980000,
    priceFormatted: '$980,000',
    location: 'Aspen Valley, CO',
    beds: 3,
    baths: 3,
    sqft: '3,100 sq ft',
    tag: 'New Listing',
    tagColor: 'bg-amber-500',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'A serene mountain sanctuary with minimalist Nordic design, geothermal heating, floor-to-ceiling forest windows, custom stone fireplace, and heated outdoor spa.'
  },
  {
    id: 4,
    title: 'Harbor Point Waterfront Residence',
    type: 'apartment',
    price: 760000,
    priceFormatted: '$760,000',
    location: 'Biscayne Bay, Miami, FL',
    beds: 2,
    baths: 2,
    sqft: '1,850 sq ft',
    tag: 'Waterfront',
    tagColor: 'bg-blue-600',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    description: 'Prime bayfront living complete with private marina slip, modern open-concept European kitchen, expansive balcony, and resort-style wellness amenities.'
  },
  {
    id: 5,
    title: 'Crown Heights Modern Townhouse',
    type: 'townhouse',
    price: 1250000,
    priceFormatted: '$1,250,000',
    location: 'Brooklyn, NY',
    beds: 4,
    baths: 3.5,
    sqft: '3,450 sq ft',
    tag: 'Hot Demand',
    tagColor: 'bg-rose-500',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    description: 'Completely renovated historic brownstone combining original exposed brick with modern Scandinavian luxury, private landscaped backyard, and solar roof.'
  },
  {
    id: 6,
    title: 'Palm Grove Contemporary Estate',
    type: 'villa',
    price: 3200000,
    priceFormatted: '$3,200,000',
    location: 'Scottsdale, AZ',
    beds: 6,
    baths: 7,
    sqft: '6,800 sq ft',
    tag: 'Luxury',
    tagColor: 'bg-purple-600',
    image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    description: 'Resort-style desert living boasting a 4-car showroom garage, guest casita, outdoor kitchen pavilion, putting green, and cascading negative-edge pool.'
  }
];

// Document Ready Handler
document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupPropertyGrid();
  setupFilterControls();
  setupContactForm();
  setupNewsletterForm();
  setupQuickChatTriggers();
});

// -------------------------------------------------------------------------
// Mobile Navigation
// -------------------------------------------------------------------------
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (window.trackCustomerAction) {
        window.trackCustomerAction('mobile_menu_toggled', { open: !mobileMenu.classList.contains('hidden') });
      }
    });
  }
}

// -------------------------------------------------------------------------
// Properties Grid Rendering & Filtering
// -------------------------------------------------------------------------
function setupPropertyGrid() {
  const container = document.getElementById('properties-container');
  if (!container) return;

  const isHomePage = container.dataset.limit ? true : false;
  const listToRender = isHomePage ? PROPERTIES_DATA.slice(0, 3) : PROPERTIES_DATA;

  renderProperties(listToRender, container);
}

function renderProperties(properties, container) {
  if (!container) return;

  if (properties.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center text-slate-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-slate-400 stroke-current" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <h3 class="text-xl font-semibold text-slate-700">No properties match your filter</h3>
        <p class="text-sm mt-1">Try adjusting your price range or property category criteria.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = properties.map(p => `
    <div class="property-card bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200/80 flex flex-col group">
      <div class="relative h-64 overflow-hidden bg-slate-100">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy">
        <span class="absolute top-4 left-4 ${p.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
          ${p.tag}
        </span>
        <div class="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-lg text-sm shadow">
          ${p.priceFormatted}
        </div>
      </div>
      
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center text-xs text-sky-600 font-semibold uppercase tracking-wider mb-2">
            <svg class="w-4 h-4 mr-1 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
            </svg>
            ${p.location}
          </div>
          <h3 class="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
            ${p.title}
          </h3>
          <p class="text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            ${p.description}
          </p>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100">
          <div class="grid grid-cols-3 text-center text-xs text-slate-600 pb-4">
            <div class="border-r border-slate-100">
              <span class="block font-bold text-slate-900 text-sm">${p.beds}</span> Beds
            </div>
            <div class="border-r border-slate-100">
              <span class="block font-bold text-slate-900 text-sm">${p.baths}</span> Baths
            </div>
            <div>
              <span class="block font-bold text-slate-900 text-sm">${p.sqft.split(' ')[0]}</span> SqFt
            </div>
          </div>
          <div class="flex gap-2">
            <button onclick="openPropertyModal(${p.id})" class="flex-1 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition duration-200 text-center shadow-sm">
              View Details
            </button>
            <button onclick="inquireProperty(${p.id}, '${p.title.replace(/'/g, "\\'")}')" class="py-2.5 px-3 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold rounded-xl transition duration-200 text-center border border-sky-200">
              Inquire
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function setupFilterControls() {
  const typeFilter = document.getElementById('filter-type');
  const priceFilter = document.getElementById('filter-price');
  const priceDisplay = document.getElementById('price-value-display');
  const searchInput = document.getElementById('filter-search');

  if (!typeFilter && !priceFilter && !searchInput) return;

  function applyFilters() {
    let filtered = [...PROPERTIES_DATA];

    if (typeFilter && typeFilter.value !== 'all') {
      filtered = filtered.filter(p => p.type === typeFilter.value);
    }

    if (priceFilter) {
      const maxPrice = parseInt(priceFilter.value, 10);
      filtered = filtered.filter(p => p.price <= maxPrice);
      if (priceDisplay) {
        priceDisplay.textContent = `$${(maxPrice / 1000).toLocaleString()}k`;
      }
    }

    if (searchInput && searchInput.value.trim() !== '') {
      const query = searchInput.value.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.location.toLowerCase().includes(query)
      );
    }

    const container = document.getElementById('properties-container');
    renderProperties(filtered, container);

    if (window.trackCustomerAction) {
      window.trackCustomerAction('property_filtered', {
        type: typeFilter ? typeFilter.value : 'all',
        maxPrice: priceFilter ? priceFilter.value : null,
        query: searchInput ? searchInput.value : ''
      });
    }
  }

  if (typeFilter) typeFilter.addEventListener('change', applyFilters);
  if (priceFilter) priceFilter.addEventListener('input', applyFilters);
  if (searchInput) {
    searchInput.addEventListener('input', debounce(applyFilters, 300));
  }
}

// -------------------------------------------------------------------------
// Property Modal Details
// -------------------------------------------------------------------------
window.openPropertyModal = function(id) {
  const property = PROPERTIES_DATA.find(p => p.id === id);
  if (!property) return;

  // Track customer viewing specific property (Key for Hotjar & customer analytics)
  if (window.trackCustomerAction) {
    window.trackCustomerAction('view_property_details', {
      propertyId: property.id,
      title: property.title,
      price: property.price
    });
  }

  const modal = document.createElement('div');
  modal.id = 'property-modal';
  modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in';
  modal.innerHTML = `
    <div class="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 transform transition-all flex flex-col max-h-[90vh]">
      <div class="relative h-72">
        <img src="${property.image}" alt="${property.title}" class="w-full h-full object-cover">
        <button onclick="closeModal()" class="absolute top-4 right-4 bg-slate-900/70 hover:bg-slate-900 text-white rounded-full p-2 transition">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
        <span class="absolute top-4 left-4 ${property.tagColor} text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
          ${property.tag}
        </span>
      </div>
      <div class="p-6 overflow-y-auto">
        <div class="flex justify-between items-start gap-4">
          <div>
            <span class="text-xs font-semibold text-sky-600 uppercase tracking-wider">${property.location}</span>
            <h2 class="text-2xl font-bold text-slate-900 font-serif mt-1">${property.title}</h2>
          </div>
          <div class="text-2xl font-extrabold text-sky-600">${property.priceFormatted}</div>
        </div>
        
        <p class="mt-4 text-slate-600 leading-relaxed text-sm">${property.description}</p>
        
        <div class="grid grid-cols-3 gap-3 my-6 p-4 bg-slate-50 rounded-2xl text-center">
          <div><div class="text-lg font-bold text-slate-800">${property.beds}</div><div class="text-xs text-slate-500 uppercase">Bedrooms</div></div>
          <div><div class="text-lg font-bold text-slate-800">${property.baths}</div><div class="text-xs text-slate-500 uppercase">Bathrooms</div></div>
          <div><div class="text-lg font-bold text-slate-800">${property.sqft}</div><div class="text-xs text-slate-500 uppercase">Living Space</div></div>
        </div>

        <div class="border-t border-slate-100 pt-5 flex flex-col sm:flex-row gap-3">
          <button onclick="inquireProperty(${property.id}, '${property.title.replace(/'/g, "\\'")}')" class="flex-1 py-3 px-6 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-semibold text-sm transition shadow-md">
            Schedule Private Tour
          </button>
          <button onclick="openPureChatSupport()" class="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-sm transition flex items-center justify-center gap-2">
            <span>💬 Live Chat Agent</span>
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
};

window.closeModal = function() {
  const modal = document.getElementById('property-modal');
  if (modal) modal.remove();
};

window.inquireProperty = function(id, title) {
  closeModal();
  if (window.trackCustomerAction) {
    window.trackCustomerAction('inquire_click', { propertyId: id, title: title });
  }
  window.location.href = `contact.html?property=${encodeURIComponent(title)}`;
};

// -------------------------------------------------------------------------
// Live Chat Trigger
// -------------------------------------------------------------------------
window.openPureChatSupport = function() {
  if (window.purechatApi && typeof window.purechatApi.set === 'function') {
    // PureChat open widget
    try {
      window.purechatApi.set('chat:open', true);
    } catch (e) {
      console.log('PureChat trigger', e);
    }
  } else {
    showToast('💬 PureChat widget initialized. When your PureChat ID is inserted, the live agent chat will popup instantly!');
  }
};

function setupQuickChatTriggers() {
  const chatButtons = document.querySelectorAll('.trigger-purechat');
  chatButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPureChatSupport();
    });
  });
}

// -------------------------------------------------------------------------
// Contact & Inquiry Form Handling
// -------------------------------------------------------------------------
function setupContactForm() {
  const form = document.getElementById('inquiry-form');
  if (!form) return;

  // Pre-fill property inquiry if passed in query param
  const urlParams = new URLSearchParams(window.location.search);
  const propertyParam = urlParams.get('property');
  if (propertyParam) {
    const propField = document.getElementById('property-interest');
    if (propField) {
      propField.value = propertyParam;
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name')?.value || '',
      email: document.getElementById('email')?.value || '',
      phone: document.getElementById('phone')?.value || '',
      property: document.getElementById('property-interest')?.value || 'General Inquiry',
      budget: document.getElementById('budget')?.value || 'Any',
      message: document.getElementById('message')?.value || ''
    };

    // Track lead capture event in Hotjar and PureChat
    if (window.trackCustomerAction) {
      window.trackCustomerAction('lead_form_submitted', formData);
    }

    // Success UI feedback
    form.reset();
    showToast('🎉 Thank you! Your inquiry has been received. Our luxury property advisor will contact you within 2 business hours.');
  });
}

function setupNewsletterForm() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput ? emailInput.value : '';

    if (window.trackCustomerAction) {
      window.trackCustomerAction('newsletter_subscribed', { email: email });
    }

    form.reset();
    showToast('✨ Subscribed to luxury market insights and off-market drops.');
  });
}

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------
function showToast(message) {
  const existing = document.getElementById('site-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'site-toast';
  toast.className = 'fixed top-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 text-sm max-w-md animate-slide-up flex items-center justify-between gap-3';
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white font-bold ml-2">&times;</button>
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 5000);
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
