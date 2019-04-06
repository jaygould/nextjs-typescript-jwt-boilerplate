import { NextContext } from 'next';

export interface IGlobalStatus {
	message: string;
	addMessage: (message: string) => any;
}

export interface IGlobalAuth {
	isLoggedIn: boolean;
	email: string | null;
	addUserDetails: ({ email }: { email: string }) => void;
	logout: () => void;
}

export interface IAppContext {
	Component: any;
	ctx: NextContext;
}

export interface IRedirectOptions {
	ctx: NextContext;
	status: number;
}
