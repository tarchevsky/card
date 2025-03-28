'use client'

import cn from 'clsx'
import Link from 'next/link'
import styles from './Header.module.scss'

const Header = () => {
	const menuItems = [
		{ path: '/', label: 'Титульная сторона' },
		{ path: '/about', label: 'Обо мне' },
		{ path: '/contacts', label: 'Контакты' },
	]

	return (
		<header className='cont md:pt-6'>
			<nav>
				<ul
					tabIndex={0}
					className='menu flex justify-center gap-5 menu-horizontal'
				>
					{menuItems.map((item, index) => (
						<li key={index} className={cn(styles.item)}>
							<Link
								className='px-[10px] btn btn-ghost font-normal text-xs'
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
