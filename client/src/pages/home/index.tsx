import { Field, Form, Formik, FormikActions } from 'formik';
import Link from 'next/link';
import Router from 'next/router';
import * as React from 'react';
import { NextPageContext } from 'next';

import PageContent from '../../components/PageContent';

import { useAuth } from '../../services/Auth.context';
import FetchService from '../../services/Fetch.service';
import { useGlobalMessaging } from '../../services/GlobalMessaging.context';
import TokenService from '../../services/Token.service';

import { ILoginIn } from '../../types/auth.types';

interface IProps {
  action: string;
}

function Home(props: IProps) {
  const tokenService = new TokenService();
  const [messageState, messageDispatch] = useGlobalMessaging();
  const [authState, authDispatch] = useAuth();

  // Log user out when they are directed to the /l=t URL - caught in the getInitialProps at the
  // bottom of the page
  React.useEffect(() => {
    if (props.action && props.action == 'logout') {
      authDispatch({
        type: 'removeAuthDetails'
      });

      tokenService.deleteToken();

      Router.push('/');
    }
  }, []);

  return (
    <PageContent>
      <div>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={(values: ILoginIn, { setSubmitting }: FormikActions<ILoginIn>) => {
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

Home.getInitialProps = async (ctx: NextPageContext) => {
  if (ctx.query && ctx.query.l == 't') {
    return { action: 'logout' };
  }
  return {};
};

export default Home;
