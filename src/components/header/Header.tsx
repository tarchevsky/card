'use client'

import Link from 'next/link'
import cn from 'clsx'
import styles from './Header.module.scss'

const Header = () => {
	const menuItems = [
		{ path: '/', label: 'Главная' },
		{ path: '/contacts', label: 'Контакты' }
	]

	return (
		<header className='cont md:pt-6'>
			<nav>
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
