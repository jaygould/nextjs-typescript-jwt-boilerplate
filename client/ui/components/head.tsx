const css = require('./Head.style.scss');

import Head from 'next/head';
import * as React from 'react';

import GlobalAuth from './HocGlobalAuth';

import { StatusConsumer } from '../services/status.context';
import { IGlobalAuth } from '../types/global.types';

interface IProps {
	globalAuth: IGlobalAuth;
}

function Header(props: IProps) {
	const { globalAuth } = props;
	return (
		<div className={css.header}>
			<div className={css.inner}>
				<Head>
					<title>Next.js, Typescript and JWT boilerplate</title>
					<meta name="viewport" content="initial-scale=1.0, width=device-width" />
				</Head>
				{globalAuth.isLoggedIn ? (
					<div>
						<p>Logged in with user: {globalAuth.email}</p>
						<button
							onClick={() => {
								globalAuth.logout();
							}}
						>
							Log out
						</button>
					</div>
				) : null}
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

export default GlobalAuth(Header);
