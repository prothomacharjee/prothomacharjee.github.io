(function () {
	'use strict';

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	document.getElementById('year').textContent = new Date().getFullYear();

	// Sticky nav shadow
	var nav = document.querySelector('.nav');
	function onScroll() { nav.classList.toggle('scrolled', window.scrollY > 8); }
	window.addEventListener('scroll', onScroll, { passive: true });
	onScroll();

	// Mobile menu
	var toggle = document.querySelector('.nav-toggle');
	var links = document.getElementById('nav-links');
	function setMenu(open) {
		toggle.setAttribute('aria-expanded', open);
		links.classList.toggle('open', open);
	}
	toggle.addEventListener('click', function () { setMenu(toggle.getAttribute('aria-expanded') !== 'true'); });
	links.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

	// Count-up numbers
	function countUp(el) {
		var end = +el.dataset.count;
		if (reduceMotion) return;
		var start = null;
		function step(t) {
			if (!start) start = t;
			var p = Math.min((t - start) / 1400, 1);
			el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US');
			if (p < 1) requestAnimationFrame(step);
		}
		requestAnimationFrame(step);
	}

	// Scroll reveal
	var items = document.querySelectorAll('.reveal');
	if (!('IntersectionObserver' in window)) {
		items.forEach(function (el) { el.classList.add('in'); });
	} else {
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (!entry.isIntersecting) return;
				entry.target.classList.add('in');
				entry.target.querySelectorAll('[data-count]').forEach(countUp);
				io.unobserve(entry.target);
			});
		}, { threshold: 0.15 });
		items.forEach(function (el, i) {
			el.style.transitionDelay = (i % 4) * 80 + 'ms';
			io.observe(el);
		});
	}

	// Resume tabs (WAI-ARIA tabs pattern)
	var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
	function select(tab) {
		tabs.forEach(function (t) {
			var on = t === tab;
			t.setAttribute('aria-selected', on);
			t.tabIndex = on ? 0 : -1;
			document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
		});
		tab.focus();
	}
	tabs.forEach(function (tab, i) {
		tab.addEventListener('click', function () { select(tab); });
		tab.addEventListener('keydown', function (e) {
			var next = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
			if (!next) return;
			e.preventDefault();
			select(tabs[(i + next + tabs.length) % tabs.length]);
		});
	});
})();
