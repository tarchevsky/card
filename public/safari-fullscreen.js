// Скрипт для управления полноэкранным режимом в Safari
;(function () {
	// Скрипт будет выполняться только на клиенте
	if (typeof window === 'undefined') return

	// Проверяем, запущен ли браузер на iOS или в Safari
	const isIOS = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
	const isSafari =
		/^((?!chrome|android).)*safari/i.test(navigator.userAgent.toLowerCase()) ||
		(isIOS && !/crios|fxios|edgios/.test(navigator.userAgent.toLowerCase()))

	if (isIOS || isSafari) {
		// Функция для скрытия панелей браузера
		const hideAddressBar = () => {
			setTimeout(function () {
				// Для iOS и Safari требуется немного задержки
				window.scrollTo(0, 1)
			}, 300)
		}

		// Выполняем при загрузке страницы и при изменении ориентации
		window.addEventListener('load', hideAddressBar)
		window.addEventListener('orientationchange', () => {
			// Для изменения ориентации нужно больше времени
			setTimeout(hideAddressBar, 500)
		})

		// Периодически проверяем, не появились ли панели обратно
		setInterval(hideAddressBar, 3000)

		// Блокируем прокрутку для предотвращения появления панелей
		document.addEventListener(
			'touchmove',
			function (e) {
				// Позволяем прокрутку только внутри элементов с классом 'scrollable'
				if (!e.target.closest('.scrollable')) {
					e.preventDefault()
				}
			},
			{ passive: false }
		)

		// Отключаем масштабирование двойным тапом
		let lastTouchEnd = 0
		document.addEventListener(
			'touchend',
			function (e) {
				const now = Date.now()
				if (now - lastTouchEnd <= 300) {
					e.preventDefault()
				}
				lastTouchEnd = now
			},
			{ passive: false }
		)
	}
})()
