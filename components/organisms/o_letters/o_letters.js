document.querySelectorAll('.o_letters').forEach(function(section) {
	const rows = section.querySelectorAll('.scorecard .score-buttons');
	const summary = section.querySelector('.score-summary');
	const total = section.querySelector('.score-header .score-total');
	if (!rows.length || !summary || !total) return;

	const bars = summary.querySelector('.score-bars');
	const verdict = summary.querySelector('.score-verdict');
	if (!bars || !verdict) return;

	const scores = new Array(rows.length).fill(0);
	const max = rows.length * 3;
	const incomplete = summary.dataset.summaryIncomplete || '';

	bars.innerHTML = Array.from(rows).map(function(btns, i) {
		const item = btns.closest('.scorecard').previousElementSibling;
		const l = item ? item.querySelector('.letter').textContent : '';
		return '<div data-i="' + i + '"><em>' + l + '</em><span></span></div>';
	}).join('');

	verdict.textContent = incomplete;

	function update() {
		const sum = scores.reduce(function(a, b) { return a + b; }, 0);
		const filled = scores.filter(function(s) { return s > 0; }).length;

		total.textContent = filled ? sum + ' / ' + max : '';

		if (scores.indexOf(1) !== -1) return verdict.textContent = summary.dataset.verdictKnockout || '';
		if (filled < rows.length) return verdict.textContent = incomplete;
		if (sum === max) return verdict.textContent = summary.dataset.verdictPerfect || '';
		if (sum >= max * 0.75) return verdict.textContent = summary.dataset.verdictSolid || '';
		if (sum >= max * 0.4) return verdict.textContent = summary.dataset.verdictWeak || '';
		verdict.textContent = summary.dataset.verdictStop || '';
	}

	rows.forEach(function(btns, i) {
		btns.querySelectorAll('.score-btn').forEach(function(btn) {
			btn.addEventListener('click', function() {
				const val = Number(btn.dataset.val);
				const wasActive = btn.classList.contains('active');

				btns.querySelectorAll('.score-btn').forEach(function(b) {
					b.classList.remove('active');
					b.setAttribute('aria-pressed', 'false');
				});

				scores[i] = wasActive ? 0 : val;
				if (!wasActive) {
					btn.classList.add('active');
					btn.setAttribute('aria-pressed', 'true');
				}

				bars.querySelector('[data-i="' + i + '"] span').className = scores[i] ? 's' + scores[i] : '';
				update();
			});
		});
	});
});
