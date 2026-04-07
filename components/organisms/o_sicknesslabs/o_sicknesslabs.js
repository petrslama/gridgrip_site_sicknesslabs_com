document.querySelectorAll('.o_sicknesslabs').forEach(section => {
	const groups = section.querySelectorAll('.question .answers');
	const panel = section.querySelector('.diagnosis');
	const countEl = panel.querySelector('.count');
	const verdictEl = panel.querySelector('.verdict');
	const incomplete = verdictEl.textContent;
	const verdicts = Object.keys(panel.dataset)
		.filter(k => k.startsWith('verdict'))
		.map(k => panel.dataset[k]);
	const answers = new Array(groups.length).fill(-1);

	const setBar = (i, val) => {
		const bar = panel.querySelector(`[data-i="${i}"]`);
		val >= 0 ? bar.dataset.val = val : delete bar.dataset.val;
	};

	const refresh = () => {
		const active = answers.filter(a => a >= 0);
		const worst = active.length ? Math.max(...active) : -1;

		countEl.textContent = active.length
			? active.length + ' / ' + groups.length
			: '';

		setBar(groups.length, worst);

		if (worst === verdicts.length - 1)
			return verdictEl.textContent = verdicts[worst];
		if (active.length < groups.length)
			return verdictEl.textContent = incomplete;
		verdictEl.textContent = verdicts[worst] || incomplete;
	};

	groups.forEach((group, i) => {
		group.addEventListener('click', e => {
			const btn = e.target.closest('button');
			if (!btn) return;
			panel.classList.add('sticky');
			const wasActive = btn.classList.contains('active');

			group.querySelectorAll('button').forEach(b => {
				b.classList.remove('active');
				b.setAttribute('aria-pressed', 'false');
			});

			answers[i] = wasActive ? -1 : Number(btn.dataset.val);
			if (!wasActive) {
				btn.classList.add('active');
				btn.setAttribute('aria-pressed', 'true');
			}

			setBar(i, answers[i]);
			refresh();
		});
	});
});
