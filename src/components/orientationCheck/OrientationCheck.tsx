'use client'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import ScrollToTop from '@/components/scrollToTop/ScrollToTop'
import { ReactNode, useEffect, useRef, useState } from 'react'

export default function OrientationCheck({
	children,
}: {
	children: ReactNode
}) {
	const [isMobile, setIsMobile] = useState<boolean>(false)
	const [isPortrait, setIsPortrait] = useState<boolean>(false)
	const [orientation, setOrientation] = useState<string | null>(null)
	const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
	const [showFullscreenInfo, setShowFullscreenInfo] = useState<boolean>(false)
	const [isSafari, setIsSafari] = useState<boolean>(false)
	const [isIOS, setIsIOS] = useState<boolean>(false)
	const appContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		// Проверка, является ли устройство мобильным, iOS и Safari
		const checkDevice = () => {
			const userAgent = navigator.userAgent.toLowerCase()
			const mobileKeywords = [
				'android',
				'webos',
				'iphone',
				'ipad',
				'ipod',
				'blackberry',
				'windows phone',
			]

			// Проверка на iOS устройство
			const isIOSDevice = /iphone|ipad|ipod/.test(userAgent)
			setIsIOS(isIOSDevice)

			// Проверка на Safari
			const isSafariBrowser =
				/^((?!chrome|android).)*safari/i.test(userAgent) ||
				(isIOSDevice && /crios|fxios|edgios/.test(userAgent) === false)
			setIsSafari(isSafariBrowser)

			// Исключаем планшеты
			const isTablet =
				/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(
					userAgent
				)

			const isMobileDevice =
				mobileKeywords.some(keyword => userAgent.includes(keyword)) && !isTablet
			setIsMobile(isMobileDevice)
		}

		checkDevice()

		// Для Safari на iOS добавляем обработчик прокрутки, чтобы скрыть панели браузера
		const handleScroll = () => {
			if (isIOS && isSafari) {
				window.scrollTo(0, 1)
			}
		}

		if (isIOS && isSafari) {
			setTimeout(() => {
				window.scrollTo(0, 1)
			}, 500)

			window.addEventListener('resize', handleScroll)
			window.addEventListener('orientationchange', () => {
				setTimeout(handleScroll, 500)
			})
		}

		return () => {
			if (isIOS && isSafari) {
				window.removeEventListener('resize', handleScroll)
				window.removeEventListener('orientationchange', handleScroll)
			}
		}
	}, [isIOS, isSafari])

	// Функция для запроса полноэкранного режима
	const requestFullscreen = () => {
		if (!appContainerRef.current) return

		if (!isFullscreen) {
			try {
				// Специальная обработка для Safari на iOS
				if (isIOS || isSafari) {
					// Для iOS и Safari применяем альтернативный подход
					setIsFullscreen(true)
					setShowFullscreenInfo(true)

					// Скрываем панели браузера
					setTimeout(() => {
						window.scrollTo(0, 1)
					}, 100)

					setTimeout(() => {
						setShowFullscreenInfo(false)
					}, 5000)
					return
				}

				// Для других устройств используем стандартный Fullscreen API
				if (appContainerRef.current.requestFullscreen) {
					try {
						appContainerRef.current.requestFullscreen()
						setIsFullscreen(true)
					} catch (err) {
						console.error('Ошибка Fullscreen API:', err)
						setIsFullscreen(true)
					}
				} else if ((appContainerRef.current as any).webkitRequestFullscreen) {
					try {
						;(appContainerRef.current as any).webkitRequestFullscreen()
						setIsFullscreen(true)
					} catch (err) {
						console.error('Ошибка Fullscreen API (webkit):', err)
						setIsFullscreen(true)
					}
				} else if ((appContainerRef.current as any).mozRequestFullScreen) {
					try {
						;(appContainerRef.current as any).mozRequestFullScreen()
						setIsFullscreen(true)
					} catch (err) {
						console.error('Ошибка Fullscreen API (moz):', err)
						setIsFullscreen(true)
					}
				} else if ((appContainerRef.current as any).msRequestFullscreen) {
					try {
						;(appContainerRef.current as any).msRequestFullscreen()
						setIsFullscreen(true)
					} catch (err) {
						console.error('Ошибка Fullscreen API (ms):', err)
						setIsFullscreen(true)
					}
				} else {
					// Если API не поддерживается, просто имитируем полноэкранный режим
					setIsFullscreen(true)
				}

				// Показываем информацию после входа в полноэкранный режим
				setShowFullscreenInfo(true)
				setTimeout(() => {
					setShowFullscreenInfo(false)
				}, 5000) // Скрываем через 5 секунд
			} catch (error) {
				console.error('Не удалось включить полноэкранный режим:', error)
				// В случае ошибки, все равно обновляем состояние UI
				setIsFullscreen(true)
				setShowFullscreenInfo(true)
				setTimeout(() => {
					setShowFullscreenInfo(false)
				}, 5000)
			}
		}
	}

	// Функция для выхода из полноэкранного режима
	const exitFullscreen = () => {
		if (isFullscreen) {
			try {
				// Для iOS/Safari просто обновляем состояние
				if (isIOS || isSafari) {
					setIsFullscreen(false)
					return
				}

				// Для других устройств используем стандартный API
				if (document.exitFullscreen) {
					try {
						document.exitFullscreen()
						setIsFullscreen(false)
					} catch (err) {
						console.error('Ошибка при выходе из полноэкранного режима:', err)
						setIsFullscreen(false)
					}
				} else if ((document as any).webkitExitFullscreen) {
					try {
						;(document as any).webkitExitFullscreen()
						setIsFullscreen(false)
					} catch (err) {
						console.error(
							'Ошибка при выходе из полноэкранного режима (webkit):',
							err
						)
						setIsFullscreen(false)
					}
				} else if ((document as any).mozCancelFullScreen) {
					try {
						;(document as any).mozCancelFullScreen()
						setIsFullscreen(false)
					} catch (err) {
						console.error(
							'Ошибка при выходе из полноэкранного режима (moz):',
							err
						)
						setIsFullscreen(false)
					}
				} else if ((document as any).msExitFullscreen) {
					try {
						;(document as any).msExitFullscreen()
						setIsFullscreen(false)
					} catch (err) {
						console.error(
							'Ошибка при выходе из полноэкранного режима (ms):',
							err
						)
						setIsFullscreen(false)
					}
				} else {
					// Если API не поддерживается, просто обновляем состояние
					setIsFullscreen(false)
				}
			} catch (error) {
				console.error('Не удалось выйти из полноэкранного режима:', error)
				// В случае ошибки, все равно обновляем состояние UI
				setIsFullscreen(false)
			}
		}
	}

	// Слушатель события изменения полноэкранного режима
	useEffect(() => {
		const handleFullscreenChange = () => {
			// Если это iOS/Safari, мы управляем состоянием вручную
			if (isIOS || isSafari) return

			const newFullscreenState =
				document.fullscreenElement !== null ||
				(document as any).webkitFullscreenElement !== null ||
				(document as any).mozFullScreenElement !== null ||
				(document as any).msFullscreenElement !== null

			setIsFullscreen(newFullscreenState)

			// Если вышли из полноэкранного режима, скрываем инструкцию
			if (!newFullscreenState) {
				setShowFullscreenInfo(false)
			}
		}

		document.addEventListener('fullscreenchange', handleFullscreenChange)
		document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
		document.addEventListener('mozfullscreenchange', handleFullscreenChange)
		document.addEventListener('MSFullscreenChange', handleFullscreenChange)

		return () => {
			document.removeEventListener('fullscreenchange', handleFullscreenChange)
			document.removeEventListener(
				'webkitfullscreenchange',
				handleFullscreenChange
			)
			document.removeEventListener(
				'mozfullscreenchange',
				handleFullscreenChange
			)
			document.removeEventListener('MSFullscreenChange', handleFullscreenChange)
		}
	}, [isIOS, isSafari])

	useEffect(() => {
		if (!isMobile) return // Если не мобильное устройство, прекращаем выполнение

		// Функция для проверки ориентации
		const checkOrientation = (): void => {
			if (window.screen && window.screen.orientation) {
				const isPortraitOrientation =
					window.screen.orientation.type.includes('portrait')
				setIsPortrait(isPortraitOrientation)
				setOrientation(window.screen.orientation.type)

				// Если ориентация горизонтальная (landscape), запрашиваем полноэкранный режим
				if (!isPortraitOrientation && !isFullscreen) {
					requestFullscreen()

					// Для Safari дополнительно вызываем scrollTo с задержкой
					if (isSafari || isIOS) {
						setTimeout(() => {
							window.scrollTo(0, 1)
						}, 300)
					}
				} else if (isPortraitOrientation && isFullscreen) {
					exitFullscreen()
				}
			}
		}

		// Первоначальная проверка
		checkOrientation()

		// Добавляем слушатель событий изменения ориентации
		if (window.screen && window.screen.orientation) {
			window.screen.orientation.addEventListener('change', checkOrientation)
		}

		// Очистка слушателей при размонтировании компонента
		return () => {
			if (window.screen && window.screen.orientation) {
				window.screen.orientation.removeEventListener(
					'change',
					checkOrientation
				)
			}
			if (isFullscreen) {
				exitFullscreen()
			}
		}
	}, [isMobile, isFullscreen, isSafari, isIOS])

	// Для мобильных устройств проверяем ориентацию
	if (isMobile && isPortrait) {
		return (
			<div className='h-screen flex items-center cont text-center'>
				<div>Пожалуйста, переверните устройство горизонтально!</div>
			</div>
		)
	}

	// Добавляем специальный класс для iOS/Safari устройств в полноэкранном режиме
	const fullscreenSpecialClass =
		(isIOS || isSafari) && isFullscreen
			? 'fixed top-0 left-0 w-full h-full z-50 bg-white'
			: ''

	return (
		<div
			ref={appContainerRef}
			className={`h-screen flex flex-col items-center justify-between ${fullscreenSpecialClass}`}
			style={
				isFullscreen && (isIOS || isSafari)
					? {
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							zIndex: 9999,
					  }
					: {}
			}
		>
			<Header />
			{children}
			<ScrollToTop />
			<Footer />

			{/* Инструкции по выходу из полноэкранного режима */}
			{showFullscreenInfo && (
				<div className='fixed top-4 left-0 right-0 mx-auto w-max px-4 py-2 bg-gray-800 bg-opacity-80 text-white rounded-lg shadow-lg z-[9999] text-sm transition-opacity duration-300'>
					{isIOS || isSafari
						? 'Приложение работает в режиме полного экрана. Нажмите на кнопку выхода в правом верхнем углу.'
						: 'Для выхода из полноэкранного режима: свайп вниз или нажмите кнопку "Назад"'}
				</div>
			)}

			{/* Кнопка для входа в полноэкранный режим */}
			{isMobile && !isPortrait && !isFullscreen && (
				<button
					onClick={requestFullscreen}
					className='fixed bottom-4 right-4 flex items-center justify-center p-3 bg-gray-800 text-white rounded-full shadow-lg z-[9999] transition-transform hover:scale-110'
					aria-label='Полноэкранный режим'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					>
						<path d='M8 3H5a2 2 0 0 0-2 2v3'></path>
						<path d='M21 8V5a2 2 0 0 0-2-2h-3'></path>
						<path d='M3 16v3a2 2 0 0 0 2 2h3'></path>
						<path d='M16 21h3a2 2 0 0 0 2-2v-3'></path>
					</svg>
				</button>
			)}

			{/* Кнопка для выхода из полноэкранного режима (для iOS/Safari) */}
			{(isIOS || isSafari) && isFullscreen && (
				<button
					onClick={exitFullscreen}
					className='fixed top-4 right-4 flex items-center justify-center p-2 bg-gray-800 text-white rounded-lg shadow-lg z-[9999] text-sm'
				>
					Выйти из полноэкранного режима
				</button>
			)}
		</div>
	)
}
