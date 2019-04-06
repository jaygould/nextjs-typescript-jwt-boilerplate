import '../global.scss';
const css = require('./index.scss');

import { Field, Form, Formik, FormikActions } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';

import GlobalAuth from '../../components/HocGlobalAuth';
import GlobalStatus from '../../components/HocGlobalStatus';
import PageContent from '../../components/PageContent';

import authService from '../../services/auth.service';
import { ILoginIn } from '../../types/auth.types';
import { IGlobalAuth, IGlobalStatus } from '../../types/global.types';

interface IProps {
	globalStatus: IGlobalStatus;
	globalAuth: IGlobalAuth;
}

function Home(props: IProps) {
	const { globalStatus, globalAuth } = props;
	return (
		<PageContent>
			<div>
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
							.loginUser({ email: values.email, password: values.password })
							.then(resp => {
								setSubmitting(false);
								if (resp.success) {
									authService.saveTokens(resp.authToken).then(() => {
										globalAuth.addUserDetails({ email: values.email });
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
							<div className="inputWrap">
								<label htmlFor="email">Email</label>
								<Field id="email" name="email" placeholder="" type="email" />
							</div>

							<div className="inputWrap">
								<label htmlFor="password">Password</label>
								<Field id="password" name="password" placeholder="" type="password" />
							</div>

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
		</PageContent>
	);
}

Home.getInitialProps = async ({ Component, router, ctx }: any) => {
	let pageProps = {};

	if (Component.getInitialProps) {
		pageProps = await Component.getInitialProps(ctx);
	}

	return { pageProps };
};

export default GlobalAuth(GlobalStatus(Home));
