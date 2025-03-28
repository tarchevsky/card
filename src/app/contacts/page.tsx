import Htag from '@/components/Htag/Htag'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
	title: 'Контакты',
}

export default function ContactsPage() {
	return (
		<div className='cont'>
			<Htag
				tag='h1'
				className='text-3xl md:text-5xl md:mt-8 lg:text-7xl lg:mt-12'
			>
				Контакты
			</Htag>
			<div className='flex flex-col gap-4 md:text-[10px] lg:text-base'>
				<div>
					Тел.: <Link href='tel:+79999999999'>+7 (999) 999-99-99</Link>
				</div>
				<div>
					Email: <Link href='mailto:test@test.com'>test@test.com</Link>
				</div>
			</div>
		</div>
	)
}
