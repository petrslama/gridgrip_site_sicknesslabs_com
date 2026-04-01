document.querySelectorAll('.o_letters').forEach(function(section) {
	const rows = section.querySelectorAll('.item .score-buttons');
	const summary = section.querySelector('.score-panel');
	const total = summary ? summary.querySelector('.score-total') : null;
	if (!rows.length || !summary || !total) return;

	const bars = summary.querySelector('.score-bars');
	const verdict = summary.querySelector('.score-verdict');
	if (!total) return;
	if (!bars || !verdict) return;

	const scores = new Array(rows.length).fill(0);
	const max = rows.length * 3;
	const incomplete = summary.dataset.summaryIncomplete || '';

	var allItems = section.querySelectorAll('.item');
	var lastItem = allItems.length ? allItems[allItems.length - 1] : null;
	var lastEyebrow = lastItem ? lastItem.querySelector('.a_eyebrow') : null;
	var lastText = lastEyebrow ? lastEyebrow.textContent : '';

	bars.innerHTML = Array.from(rows).map(function(btns, i) {
		const item = btns.closest('.item');
		const eyebrow = item ? item.querySelector('.a_eyebrow') : null;
		const text = eyebrow ? eyebrow.textContent : '';
		return '<div data-i="' + i + '"><b>' + text.charAt(0) + '</b><span></span><em>' + text + '</em></div>';
	}).join('') + '<div data-i="stripped"><b>' + lastText.charAt(0) + '</b><span></span><em>' + lastText + '</em></div>';

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
				var worst = scores.filter(function(s) { return s > 0; });
				var strippedVal = worst.length ? Math.min.apply(null, worst) : 0;
				bars.querySelector('[data-i="stripped"] span').className = strippedVal ? 's' + strippedVal : '';
				update();
			});
		});
	});
});
