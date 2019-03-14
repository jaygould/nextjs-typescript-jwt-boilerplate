import Link from 'next/link';
import Header from '../../components/head';
const css = require('./index.scss');

function Home() {
	return (
		<div>
			<Header />
			<h2 className={css.example}>Welcome to next!</h2>
			<div>
				Click{' '}
				<Link href="/about">
					<a>here</a>
				</Link>{' '}
				to read more
			</div>
		</div>
	);
}

export default Home;
