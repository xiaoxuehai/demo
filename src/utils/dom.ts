export function observerDomResize(dom, callback) {
	const MutationObserver = window.MutationObserver;
	const observer = new MutationObserver(callback);

	observer.observe(dom, {
		attributes: true,
		attributeFilter: ['style'],
		attributeOldValue: true
	});

	return observer;
}
export function co(gen) {
	let destroyed = false;

	// 处理 return 之后 resume 的问题
	let stop = false;

	let val = null;

	if (typeof gen === 'function') gen = gen();

	if (!gen || typeof gen.next !== 'function') return () => ({});

	Promise.resolve().then(() => {
		destroyed || next(gen.next());
	});

	return {
		end() {
			destroyed = true;

			Promise.resolve().then(() => {
				gen.return();

				gen = null;
			});
		},
		pause() {
			if (!destroyed) {
				stop = true;
			}
		},
		resume() {
			const oldVal = val;

			if (!destroyed && stop) {
				stop = false;

				Promise.resolve(val).then(function () {
					if (!destroyed && !stop && oldVal === val) {
						next(gen.next());
					}
				});
			}
		}
	};

	function next(ret) {
		if (ret.done) return ret.value;

		val = ret.value;

		return Promise.resolve(ret.value).then(() => {
			!destroyed && !stop && next(gen.next());
		});
	}
}
