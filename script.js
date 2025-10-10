// Basic navigation interactions & active state handling
document.addEventListener('DOMContentLoaded', () => {
	const navToggle = document.querySelector('.nav-toggle');
	const navList = document.querySelector('.nav-list');
	const subToggles = document.querySelectorAll('.sub-toggle');
	const page = document.body.getAttribute('data-page');

	// Mobile main nav toggle
	if (navToggle) {
		navToggle.addEventListener('click', () => {
			const open = navList.classList.toggle('open');
			navToggle.setAttribute('aria-expanded', open);
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