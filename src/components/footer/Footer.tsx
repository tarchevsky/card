import Link from "next/link";

const Footer = () => {
	return (
		<footer className='footer footer-center text-neutral-400 pb-6 md:pb-8'>
			<p className='block'>Production by <Link className='link' href='https://tezis.digital' aria-label='Ссылка на производилетля'>tezis.digital</Link></p>
		</footer>
	)
}

export default Footer;