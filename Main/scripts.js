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
const emailForm = document.getElementById('emailForm');
if (emailForm) {
  emailForm.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from reloading page

    const form = e.target;
    const formData = new FormData(form);

    // Optional: Convert form data to URL-encoded string if using express.urlencoded
    const data = new URLSearchParams(formData);

    try {
      const response = await fetch('/send-email', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'text/plain'
        }
      });
      const message = await response.text();

      showEmailAlert(message, response.ok ? 'success' : 'danger');
      if (response.ok) form.reset();
    } catch (err) {
      showEmailAlert('Failed to send email. Please try again.', 'danger');
    }
  });
}

function showEmailAlert(message, type) {
	const alert = document.getElementById('emailAlert');
	alert.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3 show`;
	alert.textContent = message;
	alert.classList.remove('d-none');
	setTimeout(() => {
		alert.classList.add('d-none');
	}, 4000);
}
function revealAndScrollToNew() {
  var newSection = document.getElementById('new');
  if (newSection) {
    newSection.classList.remove('d-none');
    setTimeout(function() {
      newSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
}

if (
  window.location.pathname === '/' ||
  window.location.pathname.endsWith('/index.html')
) {
  // On initial load
  document.addEventListener('DOMContentLoaded', function() {
    if (window.location.hash === '#new') {
      revealAndScrollToNew();
    }
  });

  // If user changes the hash (e.g., clicks the button again)
  window.addEventListener('hashchange', function() {
    if (window.location.hash === '#new') {
      revealAndScrollToNew();
    }
  });

  // Optional: If you have direct control over the button, you can force the hash
  var btn = document.getElementById('new-here-btn');
  if (btn) {
    btn.addEventListener('click', function(e) {
      // Only preventDefault if already on the index page
      if (
        window.location.pathname === '/' ||
        window.location.pathname.endsWith('/index.html')
      ) {
        e.preventDefault();
        window.location.hash = '#new'; // updates the hash, triggers hashchange
        // Optionally: call revealAndScrollToNew() directly for instant feedback
      }
    });
  }
}