import Htag from '@/components/Htag/Htag'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Контакты',
}

export default function AboutPage() {
	return (
		<div className='cont'>
			<Htag
				tag='h1'
				className='text-3xl md:text-5xl md:mt-8 lg:text-7xl lg:mt-12'
			>
				Обо мне
			</Htag>
			<div className='prose md:text-[10px] lg:text-base'>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime
					reiciendis facilis impedit nemo amet, autem enim nisi odit, distinctio
					adipisci iste molestiae architecto fugit quae omnis veritatis aperiam
					voluptates animi? Veniam, deleniti! Incidunt esse ab laborum
					praesentium aut. Vel atque reiciendis quaerat soluta dolorum, ab vero
					perspiciatis id quasi?{' '}
				</p>
				<p>
					Similique illum consequuntur repudiandae perferendis quis pariatur
					porro tenetur sed vel? Blanditiis adipisci rerum eos soluta sequi
					atque earum minima dolor explicabo suscipit, nemo ab optio unde
					repudiandae quod fugit nobis porro, tempore ipsum fugiat totam
					inventore.
				</p>
			</div>
		</div>
	)
}
