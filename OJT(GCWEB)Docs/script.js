// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });

    // Initialize charts
    initializeCharts();
    
    // Set default active section
    showSection('home');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
});

const mobileMenu = document.getElementById('mobileMenu');

// Navigation functions
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-content').forEach(section => {
        section.classList.add('hidden');
    });

    // Show selected section
    document.getElementById(sectionId).classList.remove('hidden');

    // Update active nav button
    document.querySelectorAll('.nav-btn, .mobile-nav-btn').forEach(btn => {
        btn.classList.remove(
            'bg-primary-100', 'text-primary-700',
            'dark:bg-primary-900', 'dark:text-primary-300',
            'text-gray-600', 'dark:text-gray-300',
            'hover:bg-gray-100', 'dark:hover:bg-gray-700'
        );
        btn.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
    });

    // Set active state for clicked button
    document.querySelectorAll(`[onclick*="${sectionId}"]`).forEach(btn => {
        if (btn.classList.contains('nav-btn') || btn.classList.contains('mobile-nav-btn')) {
            btn.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
            btn.classList.add('bg-primary-100', 'text-primary-700', 'dark:bg-primary-900', 'dark:text-primary-300');
        }
    });

    // FIXED: Close mobile menu if it exists and is currently visible
   
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
        }
    });
});
// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
});

// Mobile menu toggle
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('hidden');
    }
}

document.getElementById('mobileMenuBtn').addEventListener('click', toggleMobileMenu);




// Image Gallery Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}


// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        });
    }
});

function toggleAllReports() {
    const allDetails = document.querySelectorAll('#daily details');
    const btn = document.getElementById('viewAllBtn');
    const icon = btn.querySelector('svg');
    
    // Toggle all accordions
    const shouldExpand = !Array.from(allDetails).every(d => d.open);
    allDetails.forEach(detail => detail.open = shouldExpand);
    
    // Update button text/icon
    if(shouldExpand) {
      btn.querySelector('.relative').innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
        </svg>
        Collapse All
      `;
    } else {
      btn.querySelector('.relative').innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
        </svg>
        View All Reports
      `;
    }
  }

//   image modal

function expandImage(img) {
    const modal = document.getElementById('imageModal');
    const expandedImg = document.getElementById('expandedImage');
    expandedImg.src = img.src;
    expandedImg.alt = img.alt;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside the image
document.getElementById('imageModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeImageModal();
    }
});

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
});