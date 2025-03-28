import Htag from '@/components/Htag/Htag'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Главная',
}

export default function Home() {
	return (
		<div className='cont h-full relative'>
			<Htag
				tag='h1'
				className='text-3xl md:text-5xl md:mt-8 lg:text-7xl lg:mt-12'
			>
				Вячеслав <br />
				<span className='ml-24'>Ветров</span>
			</Htag>
			<div className='absolute -bottom-3 md:bottom-4 lg:bottom-4 right-8 lg:right-16 text-6xl lg:text-9xl font-dance text-gray-800'>
				Психолог
			</div>
		</div>
	)
}
