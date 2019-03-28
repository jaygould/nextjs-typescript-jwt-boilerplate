import Head from 'next/head';
import authService from '../services/auth.service';
import { StatusConsumer } from '../services/status.context';

function Header() {
	return (
		<div>
			<StatusConsumer>
				{globalStatus => {
					const message = globalStatus.message.message;
					return message ? <p>{message}</p> : null;
				}}
			</StatusConsumer>
			<button onClick={() => authService.logout()}>Log out</button>
			<Head>
				<title>My page title</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>

			<p>Header</p>
		</div>
	);
}

export default Header;
