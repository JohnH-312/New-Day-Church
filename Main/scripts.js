// Placeholder for custom JS
// You can add smooth scrolling here or other small interactions.
document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const target = document.querySelector(this.getAttribute('href'));
			if (target) {
				e.preventDefault();
				target.scrollIntoView({ behavior: 'smooth' });
			}
		});
	});
});

window.addEventListener('scroll', function () {
	const navbar = document.getElementById('mainNavbar');
	if (window.scrollY > 60) {
		navbar.classList.add('shrunk');
	} else {
		navbar.classList.remove('shrunk');
	}
});