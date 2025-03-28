// app/layout.tsx
import { dance, rockstar } from '@/app/fonts'
import OrientationCheck from '@/components/orientationCheck/OrientationCheck'
import { Metadata } from 'next'
import Script from 'next/script'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
	title: 'Психолог Вячеслав Ветров',
	description: 'Психологическая помощь и консультирование',
	viewport:
		'width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=no, maximum-scale=1.0',
	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
		title: 'Психолог Вячеслав Ветров',
	},
	other: {
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style': 'black-translucent',
	},
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang='ru' className={`${dance.variable} ${rockstar.variable}`}>
			<head>
				{/* Специальные стили для iOS Safari */}
				<link
					rel='stylesheet'
					href='/ios-fixes.css'
					media='(max-width: 844px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2)'
				/>
			</head>
			<body className='font-rockstar'>
				<Script src='/safari-fullscreen.js' strategy='afterInteractive' />
				<OrientationCheck>
					<div
						className='h-[60vh] w-[60vw]'
						style={{
							background: 'rgba(255, 255, 255, 0.21)',
							boxShadow: '14px 30px 28px -14px rgba(0, 0, 0, 0.16)',
						}}
					>
						{children}
					</div>
				</OrientationCheck>
			</body>
		</html>
	)
}
