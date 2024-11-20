'use client'

import Link from 'next/link'
import cn from 'clsx'
import styles from './Header.module.scss'
import Burger from '@/components/burger/Burger'
import { useEffect, useState } from 'react'
import ThemeToggle from '@/components/themeToggle/ThemeToggle'

const Header = () => {
	const [isMenuActive, setIsMenuActive] = useState(false)

	const menuItems = [
		{ path: '/', label: 'Главная' },
		{ path: '/contacts', label: 'Контакты' }
	]

	const toggleMenu = () => {
		setIsMenuActive(!isMenuActive)
	}

	useEffect(() => {
		if (isMenuActive) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
	}, [isMenuActive])

	return (
		<header className='cont md:pt-6'>
			<nav
				className={cn(
					{ [styles.active]: isMenuActive }
				)}
			>
				<ul
					tabIndex={0}
					className='menu flex justify-center gap-5 menu-horizontal'
				>
					{menuItems.map((item, index) => (
						<li
							key={index}
							className={cn(
								styles.item
							)}
						>
							<Link
								className='px-[10px] btn btn-ghost font-normal'
								href={item.path}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}

export default Header
