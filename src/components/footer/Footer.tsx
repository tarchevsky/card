import Link from 'next/link'

const Footer = () => {
	return (
		<footer className='footer footer-center text-neutral-400 pb-4 md:pb-10'>
			<p className='block text-[8px]'>
				Production by{' '}
				<Link
					className='link'
					href='https://tezis.digital'
					aria-label='Ссылка на производилетля'
				>
					tezis.digital
				</Link>
			</p>
		</footer>
	)
}

export default Footer
