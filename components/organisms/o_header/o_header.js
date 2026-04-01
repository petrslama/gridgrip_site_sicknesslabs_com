document.addEventListener('DOMContentLoaded', () => {
	let lastY = window.scrollY;
	let scrollUpDistance = 0;
	window.addEventListener('scroll', () => {
		var y = window.scrollY;
		if (y <= 128) {
			document.body.classList.remove('header_hidden');
			scrollUpDistance = 0;
		} else if (y < lastY) {
			scrollUpDistance += lastY - y;
			if (scrollUpDistance >= 64) {
				document.body.classList.remove('header_hidden');
			}
		} else {
			scrollUpDistance = 0;
			document.body.classList.add('header_hidden');
		}
		lastY = y;
	});

	function closeMenu() {
		document.body.classList.remove('menu_opened');
		document.querySelector('.o_header .menu-toggle').setAttribute('aria-expanded', 'false');
	}

	document.querySelectorAll('.o_header .theme-toggle').forEach((btn) => {
		btn.addEventListener('click', () => {
			var html = document.documentElement;
			var isDark = html.classList.contains('dark') ||
				(!html.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
			html.classList.remove('light', 'dark');
			html.classList.add(isDark ? 'light' : 'dark');
			localStorage.theme = isDark ? 'light' : 'dark';
		});
	});

	document.querySelectorAll('.o_header .menu-toggle').forEach((toggle) => {
		toggle.addEventListener('click', () => {
			var opened = document.body.classList.toggle('menu_opened');
			toggle.setAttribute('aria-expanded', opened);
		});
	});

	document.querySelectorAll('#main-nav a').forEach((link) => {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			closeMenu();
		}
	});
});
