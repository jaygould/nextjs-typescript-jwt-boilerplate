import { Field, Form, Formik, FormikActions } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';

import PageContent from '../../components/PageContent';

import { useAuth } from '../../services/Auth.context';
import FetchService from '../../services/Fetch.service';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';
import TokenService from '../../services/Token.service';

import { ILoginIn } from '../../types/auth.types';

interface IProps {}

function Home(props: IProps) {
	const [messageState, messageDispatch] = useGlobalMessaging();
	const [authState, authDispatch] = useAuth();

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
						FetchService.isofetch(
							'/auth/login',
							{
								email: values.email,
								password: values.password
							},
							'POST'
						)
							.then((res: any) => {
								setSubmitting(false);
								if (res.success) {
									// save token in cookie for subsequent requests
									const tokenService = new TokenService();
									tokenService.saveToken(res.authToken);

									authDispatch({
										type: 'setAuthDetails',
										payload: {
											email: res.email
										}
									});

									Router.push('/dashboard');
								} else {
									messageDispatch({
										type: 'setMessage',
										payload: {
											message: res.message
										}
									});
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

export default Home;
