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
		// Функция для скрытия панелей браузера с несколькими попытками
		const hideAddressBar = () => {
			// Серия попыток с разными задержками для повышения шансов скрытия панели
			setTimeout(() => window.scrollTo(0, 1), 100)
			setTimeout(() => window.scrollTo(0, 0), 150)
			setTimeout(() => window.scrollTo(0, 1), 300)
			setTimeout(() => window.scrollTo(0, window.innerHeight / 2), 400)
			setTimeout(() => window.scrollTo(0, 1), 500)

			// На iOS 15+ требуются дополнительные попытки
			if (isIOS) {
				setTimeout(() => {
					// Попытка имитировать резкий свайп вниз для скрытия панели
					window.scrollTo(0, 20)
					setTimeout(() => window.scrollTo(0, 1), 50)
				}, 600)
			}
		}

		// Принудительное изменение высоты для скрытия панелей
		const forceFull = () => {
			// Для Safari в iOS управляем через CSS и метаэлементы
			document.documentElement.style.height = '100%'
			document.body.style.height = '100%'
			document.body.style.maxHeight = 'none' // Убираем ограничение максимальной высоты
			document.body.style.overflow = 'hidden' // Предотвращаем стандартную прокрутку

			// Принудительно обновляем высоту окна
			setTimeout(() => {
				document.body.style.height = window.innerHeight + 'px'
				hideAddressBar()
			}, 100)
		}

		// Выполняем действия после полной загрузки страницы
		const initFullscreen = () => {
			// Установка начальных стилей
			forceFull()

			// Скрываем панели с разными интервалами для повышения надежности
			hideAddressBar()
			setTimeout(hideAddressBar, 1000)
			setTimeout(hideAddressBar, 2000)

			// На iPhone в альбомной ориентации требуется особая обработка
			if (window.orientation === 90 || window.orientation === -90) {
				hideAddressBar()
				setTimeout(hideAddressBar, 1500)
			}
		}

		// Запускаем при разных событиях
		window.addEventListener('load', initFullscreen)
		window.addEventListener('resize', forceFull)
		window.addEventListener('orientationchange', () => {
			// Для изменения ориентации нужно несколько попыток с задержкой
			setTimeout(initFullscreen, 100)
			setTimeout(forceFull, 300)
			setTimeout(hideAddressBar, 500)
			setTimeout(hideAddressBar, 1000)
			setTimeout(hideAddressBar, 1500)
		})

		// Регулярно проверяем и скрываем панели
		setInterval(hideAddressBar, 2000)

		// Добавляем обнаружение скролла и повторно скрываем панели
		window.addEventListener(
			'scroll',
			() => {
				// Если скролл близок к верху, пытаемся скрыть адресную строку
				if (window.scrollY < 50) {
					setTimeout(hideAddressBar, 100)
				}
			},
			{ passive: true }
		)

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

		// Когда страница готова, пытаемся скрыть панели
		if (document.readyState === 'complete') {
			initFullscreen()
		} else {
			document.addEventListener('DOMContentLoaded', initFullscreen)
		}

		// Публичный метод для вызова из основного приложения
		window.hideIOSSafariBars = hideAddressBar
	}
})()
