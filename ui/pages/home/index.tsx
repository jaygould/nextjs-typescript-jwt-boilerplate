import { Field, Form, Formik, FormikActions } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';

import GlobalStatus from '../../components/globalStatus';
import Header from '../../components/head';
const css = require('./index.scss');

import authService from '../../services/auth.service';
import { ILoginIn } from '../../types/auth.types';

function Home({ globalStatus }) {
	return (
		<div>
			<Header />
			<h2 className={css.example}>Welcome to Jlympics!</h2>
			<Formik
				initialValues={{
					email: '',
					password: ''
				}}
				onSubmit={(
					values: ILoginIn,
					{ setSubmitting }: FormikActions<ILoginIn>
				) => {
					authService
						.loginUser(values.email, values.password)
						.then(resp => {
							setSubmitting(false);
							if (resp.success) {
								authService.saveTokens(resp.authToken).then(() => {
									Router.push('/dashboard');
								});
							} else {
								globalStatus.addMessage(resp.message);
							}
						})
						.catch();
				}}
				render={() => (
					<Form>
						<label htmlFor="email">Email</label>
						<Field id="email" name="email" placeholder="" type="email" />

						<label htmlFor="password">Password</label>
						<Field id="password" name="password" placeholder="" type="password" />

						<button type="submit" style={{ display: 'block' }}>
							Submit
						</button>
					</Form>
				)}
			/>

			<div>
				Click{' '}
				<Link href="/about">
					<a>here</a>
				</Link>{' '}
				to read more
			</div>
			<div>
				Click{' '}
				<Link href="/register">
					<a>here</a>
				</Link>{' '}
				to register
			</div>
		</div>
	);
}

export default GlobalStatus(Home);
