// ===========================
//  ARTVISION — APP.JS
//  Created by Nayyar Hussain
// ===========================

// ── State ──────────────────
let cart = JSON.parse(localStorage.getItem('artvision_cart') || '[]');
let currentPage = 'home';

// ── Gallery Data ────────────
const paintings = [
  {
    id: 1, title: 'Violet Dreams', medium: 'Oil on Canvas', size: '48" × 60"',
    price: 4800, category: 'oil', available: true,
    gradient: 'linear-gradient(135deg, #1a0533 0%, #6b21a8 40%, #c084fc 70%, #fde68a 100%)'
  },
  {
    id: 2, title: 'Ocean Silence', medium: 'Acrylic on Canvas', size: '36" × 36"',
    price: 2200, category: 'acrylic', available: true,
    gradient: 'linear-gradient(160deg, #0f2027 0%, #203a43 50%, #2c5364 100%)'
  },
  {
    id: 3, title: 'Crimson Horizon', medium: 'Oil on Canvas', size: '30" × 40"',
    price: 3100, category: 'oil', available: true,
    gradient: 'linear-gradient(145deg, #7f1d1d 0%, #dc2626 40%, #fca5a5 70%, #fef3c7 100%)'
  },
  {
    id: 4, title: 'Morning Gold', medium: 'Watercolor', size: '18" × 24"',
    price: 950, category: 'watercolor', available: true,
    gradient: 'linear-gradient(135deg, #78350f 0%, #d97706 50%, #fde68a 100%)'
  },
  {
    id: 5, title: 'Midnight Forest', medium: 'Oil on Canvas', size: '40" × 50"',
    price: 3800, category: 'oil', available: false,
    gradient: 'linear-gradient(160deg, #052e16 0%, #166534 50%, #4ade80 100%)'
  },
  {
    id: 6, title: 'Desert Wind', medium: 'Acrylic on Canvas', size: '24" × 30"',
    price: 1600, category: 'acrylic', available: true,
    gradient: 'linear-gradient(135deg, #431407 0%, #c2410c 40%, #fed7aa 80%, #fffbeb 100%)'
  },
  {
    id: 7, title: 'Arctic Light', medium: 'Watercolor', size: '22" × 30"',
    price: 1100, category: 'watercolor', available: true,
    gradient: 'linear-gradient(145deg, #0c4a6e 0%, #0ea5e9 50%, #e0f2fe 100%)'
  },
  {
    id: 8, title: 'City Rain', medium: 'Oil on Canvas', size: '36" × 48"',
    price: 4200, category: 'oil', available: true,
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 40%, #818cf8 70%, #e0e7ff 100%)'
  },
  {
    id: 9, title: 'Sunflower Study', medium: 'Acrylic on Canvas', size: '20" × 20"',
    price: 890, category: 'acrylic', available: false,
    gradient: 'linear-gradient(145deg, #713f12 0%, #ca8a04 50%, #fef08a 100%)'
  },
  {
    id: 10, title: 'Still Waters', medium: 'Watercolor', size: '16" × 20"',
    price: 720, category: 'watercolor', available: true,
    gradient: 'linear-gradient(135deg, #164e63 0%, #0891b2 50%, #a5f3fc 100%)'
  },
  {
    id: 11, title: 'The Red Chair', medium: 'Oil on Canvas', size: '24" × 24"',
    price: 2100, category: 'oil', available: true,
    gradient: 'linear-gradient(160deg, #450a0a 0%, #b91c1c 50%, #fca5a5 100%)'
  },
  {
    id: 12, title: 'Harvest Moon', medium: 'Acrylic on Canvas', size: '30" × 30"',
    price: 1850, category: 'acrylic', available: true,
    gradient: 'linear-gradient(135deg, #1c1917 0%, #78350f 30%, #d97706 60%, #fef3c7 100%)'
  },
];

// ── Navigation ──────────────
function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById('page-' + page);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // Update nav active state
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });
  currentPage = page;
  // Close mobile nav
  document.getElementById('navLinks')?.classList.remove('open');

  // Page-specific init
  if (page === 'gallery') renderGallery(paintings);
  if (page === 'cart') renderCart();
}

// ── Nav links click handler ─
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.page);
  });
});

// ── Hamburger ───────────────
const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  navLinks.id = 'navLinks';
  navLinks.classList.toggle('open');
});

// ── Navbar scroll effect ────
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Gallery Render ──────────
function renderGallery(items) {
  const grid = document.getElementById('galleryGrid');
  grid.innerHTML = '';
  items.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.animationDelay = (i * 0.07) + 's';
    card.innerHTML = `
      <div class="gallery-card-img" style="background: ${p.gradient};">
        <div class="art-overlay-shapes">
          <div class="shape s${(i % 6) + 1}"></div>
        </div>
      </div>
      <div class="gallery-card-info">
        <h3>${p.title}</h3>
        <p class="medium">${p.medium} · ${p.size}</p>
      </div>
      <div class="gallery-card-footer">
        <span class="g-price">$${p.price.toLocaleString()}</span>
        ${p.available
          ? `<button class="btn-cart-sm" onclick="addToCart('${p.title}', ${p.price}, '${p.medium}', '${p.gradient}')">Add to Cart</button>`
          : `<span class="sold-badge">Sold</span>`
        }
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── Gallery Filter ──────────
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = cat === 'all' ? paintings : paintings.filter(p => p.category === cat);
  renderGallery(filtered);
}

// ── Cart System ─────────────
function addToCart(title, price, medium, gradient) {
  const existing = cart.find(item => item.title === title);
  if (existing) {
    showToast('✦ Already in your cart!');
    return;
  }
  cart.push({ title, price, medium, gradient: gradient || 'linear-gradient(135deg, #1a0f05, #c8a96e)' });
  saveCart();
  updateCartCount();
  showToast(`✦ "${title}" added to cart`);
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

function saveCart() {
  localStorage.setItem('artvision_cart', JSON.stringify(cart));
}

function updateCartCount() {
  document.getElementById('cartCount').textContent = cart.length;
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const emptyEl = document.getElementById('cartEmpty');
  const summaryEl = document.getElementById('cartSummary');

  if (cart.length === 0) {
    itemsEl.style.display = 'none';
    emptyEl.style.display = 'block';
    summaryEl.style.display = 'none';
    return;
  }

  itemsEl.style.display = 'flex';
  emptyEl.style.display = 'none';
  summaryEl.style.display = 'block';

  itemsEl.innerHTML = '';
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-thumb" style="background: ${item.gradient}; position:relative; overflow:hidden; border-radius:4px;">
        <div style="position:absolute;inset:0;background:rgba(0,0,0,0.1);"></div>
      </div>
      <div class="cart-item-details">
        <h4>${item.title}</h4>
        <p>${item.medium} · Original Painting</p>
        <p style="margin-top:0.3rem; font-size:0.75rem; color: var(--gold-dark);">Includes Certificate of Authenticity</p>
      </div>
      <div class="cart-item-price">$${item.price.toLocaleString()}</div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})" title="Remove">×</button>
    `;
    itemsEl.appendChild(el);
  });

  document.getElementById('summarySubtotal').textContent = '$' + total.toLocaleString();
  document.getElementById('summaryTotal').textContent = '$' + total.toLocaleString();
}

function checkout() {
  showToast('✦ Redirecting to secure checkout...');
  setTimeout(() => {
    alert('Secure checkout would launch here.\n\nAll paintings ship with:\n• Certificate of Authenticity\n• Professional art packaging\n• Full insurance coverage\n• International shipping available');
  }, 600);
}

// ── Commission Form ─────────
function submitCommission() {
  const name = document.getElementById('cName').value.trim();
  const email = document.getElementById('cEmail').value.trim();
  const vision = document.getElementById('cVision').value.trim();

  if (!name || !email || !vision) {
    showToast('⚠ Please fill in all required fields');
    return;
  }
  if (!email.includes('@')) {
    showToast('⚠ Please enter a valid email address');
    return;
  }

  // Show success
  document.getElementById('commissionSuccess').style.display = 'block';
  showToast('✦ Inquiry sent! Marcus will be in touch soon.');

  // Reset form after delay
  setTimeout(() => {
    document.getElementById('cName').value = '';
    document.getElementById('cEmail').value = '';
    document.getElementById('cPhone').value = '';
    document.getElementById('cSize').value = '';
    document.getElementById('cMedium').value = '';
    document.getElementById('cBudget').value = '';
    document.getElementById('cTimeline').value = '';
    document.getElementById('cVision').value = '';
  }, 2000);
}

// ── Toast Notification ──────
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── Logo click → home ───────
document.querySelector('.nav-logo').addEventListener('click', () => navigateTo('home'));

// ── Init ────────────────────
updateCartCount();
renderGallery(paintings);
