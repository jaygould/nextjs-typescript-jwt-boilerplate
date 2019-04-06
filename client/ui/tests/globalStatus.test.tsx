require('dotenv').config();
import { mount, shallow } from 'enzyme';
import React from 'react';
import AuthService from '../services/auth.service';

import GlobalStatus from '../components/HocGlobalStatus';
import Home from '../pages/home/index';

const incorrectUserDetails: any = {
	email: '--',
	password: '--'
};
const correctUserDetails: any = {
	email: process.env.TEST_EMAIL,
	password: process.env.TEST_PASSWORD
};

describe('Logging in global status', () => {
	beforeEach(() => {
		return AuthService.loginUser({
			email: correctUserDetails.email,
			password: correctUserDetails.password
		});
	});
	it('attempt with correct login details', () => {
		setTimeout(() => {
			const GlobalStatusComponent = GlobalStatus(Home);
			const wrapper = mount(shallow(<GlobalStatusComponent />).get(0));
			expect(wrapper.exists('.globalStatus')).toEqual(false);
		}, 100);
	});
	beforeEach(() => {
		return AuthService.loginUser({
			email: incorrectUserDetails.email,
			password: incorrectUserDetails.password
		});
	});
	it('attempt with incorrect login details', () => {
		setTimeout(() => {
			const GlobalStatusComponent = GlobalStatus(Home);
			const wrapper = mount(shallow(<GlobalStatusComponent />).get(0));
			expect(wrapper.exists('.globalStatus')).toEqual(true);
		}, 100);
	});
});
