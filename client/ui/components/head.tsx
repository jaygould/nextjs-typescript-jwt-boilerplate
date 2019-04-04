const css = require('./Head.style.scss');

import Head from 'next/head';
import * as React from 'react';
import authService from '../services/auth.service';
import { StatusConsumer } from '../services/status.context';

function Header() {
	return (
		<div className={css.header}>
			<div className={css.inner}>
				<Head>
					<title>Next.js, Typescript and JWT boilerplate</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				<button onClick={() => authService.logout()}>Log out</button>
				<StatusConsumer>
					{globalStatus => {
						return globalStatus ? (
							<p className="globalStatus">{globalStatus.message}</p>
						) : null;
					}}
				</StatusConsumer>
				<h1 className={'h1'}>Next.js, Typescript and JWT boilerplate</h1>
			</div>
		</div>
	);
}

export default Header;
