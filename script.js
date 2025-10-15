// Basic navigation interactions & active state handling
document.addEventListener('DOMContentLoaded', () => {
	const navToggle = document.querySelector('.nav-toggle');
	const navList = document.querySelector('.nav-list');
	const subToggles = document.querySelectorAll('.sub-toggle');
	const page = document.body.getAttribute('data-page');

	// Mobile-only hero image reposition (image between badges and motivation boxes)
	(function(){
		const BREAKPOINT = 900; // must match CSS max-width used
		const hero = document.querySelector('.hero');
		if(!hero) return;
		const heroMedia = hero.querySelector('.hero-media');
		const motivation = hero.querySelector('.motivation-boxes');
		const badges = hero.querySelector('.badges');
		if(!heroMedia || !motivation || !badges) return;
		// Store original position (parent + next sibling) so we can restore on desktop
		const originalParent = heroMedia.parentElement;
		const originalNext = heroMedia.nextElementSibling;

		function applyMobileOrder(){
			if(window.innerWidth <= BREAKPOINT){
				// Ensure heroMedia sits before motivation boxes but after badges
				if(motivation.previousElementSibling !== heroMedia){
					// Insert heroMedia right before motivation boxes
					motivation.parentElement.insertBefore(heroMedia, motivation);
				}
			} else {
				// Restore original DOM order if changed
				if(heroMedia.parentElement !== originalParent || (originalNext && heroMedia.nextElementSibling !== originalNext)){
					if(originalNext){
						originalParent.insertBefore(heroMedia, originalNext);
					} else {
						originalParent.appendChild(heroMedia);
					}
				}
			}
		}

		// Initial run & resize listener (debounced minimal)
		let resizeTimer;
		window.addEventListener('resize',()=>{
			clearTimeout(resizeTimer);
			resizeTimer = setTimeout(applyMobileOrder,120);
		});
		applyMobileOrder();
	})();

	// Mobile main nav toggle with outside click + escape close
	if (navToggle && navList) {
		function closeMenu(){
			navList.classList.remove('open');
			navToggle.setAttribute('aria-expanded','false');
		}
		function openMenu(){
			navList.classList.add('open');
			navToggle.setAttribute('aria-expanded','true');
		}
		navToggle.addEventListener('click', () => {
			const isOpen = navList.classList.contains('open');
			isOpen ? closeMenu() : openMenu();
		});
		document.addEventListener('click',e=>{
			if(!navList.classList.contains('open')) return;
			if(e.target === navToggle || navToggle.contains(e.target)) return;
			if(navList.contains(e.target)) return;
			closeMenu();
		});
		document.addEventListener('keydown',e=>{
			if(e.key==='Escape' && navList.classList.contains('open')) closeMenu();
		});
		// Close on resize above breakpoint
		window.addEventListener('resize',()=>{
			if(window.innerWidth > 880 && navList.classList.contains('open')) closeMenu();
		});
	}

	// Submenu toggles (mobile)
	subToggles.forEach(btn => {
		btn.addEventListener('click', e => {
			const parent = e.currentTarget.closest('.has-sub');
			const isOpen = parent.classList.toggle('open');
			btn.setAttribute('aria-expanded', isOpen);
		});
	});

	// Active link highlight
	if (page) {
		document.querySelectorAll('.nav-list a[data-nav]').forEach(a => {
			if (a.dataset.nav === page) {
				a.classList.add('active');
			}
		});
	}
});

// Simple form placeholder (no backend)
function simulateFormSubmission(form){
	const btn = form.querySelector('button[type="submit"]');
	if(!btn) return;
	btn.disabled = true;btn.textContent = 'Lähetetään…';
	setTimeout(()=>{btn.textContent='Lähetetty!';btn.classList.add('sent');},1200);
}
document.addEventListener('submit',e=>{
	const form = e.target;
	if(form.matches('.js-contact-form')){
		e.preventDefault();
		simulateFormSubmission(form);
	}
});