import css from './Head.style.css';

import Head from 'next/head';
import * as React from 'react';

import { useAuth } from '../services/Auth.context';
import { useGlobalMessaging } from '../services/GlobalMessaging.context';

interface IProps {}

function Header(props: IProps) {
	const [globalMessaging, messageDispatch] = useGlobalMessaging();
	const [auth, authDispatch] = useAuth();

	return (
		<div className={css.header}>
			<div className={css.inner}>
				<Head>
					<title>Next.js, Typescript and JWT boilerplate</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				{auth.email ? (
					<div>
						<p>Logged in with user: {auth.email}</p>
					</div>
				) : null}
				{globalMessaging.message ? (
					<p className="globalStatus">{globalMessaging.message}</p>
				) : null}
				<h1 className={'h1'}>Next.js, Typescript and JWT boilerplate</h1>
			</div>
		</div>
	);
}

export default Header;
