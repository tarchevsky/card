import Htag from '@/components/Htag/Htag'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Главная',
}

export default function Home() {
	return (
		<div className='cont h-full relative'>
			<Htag tag='h1' className='text-3xl md:text-7xl md:mt-12'>
				Вячеслав <br />
				<span className='ml-24'>Ветров</span>
			</Htag>
			<div className='absolute -bottom-3 md:bottom-4 right-8 md:right-16 text-6xl md:text-9xl font-dance text-gray-800'>
				Психолог
			</div>
		</div>
	)
}
