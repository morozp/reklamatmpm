import React from 'react';
import { Link } from 'react-router';

import Logo from './logo';
import LineLink from './line-link-btn';
import VkLin from './vk-link-btn';
import SearchForm from './search-form';
import AddAdvForm from './add-adv-form';
import MobileMenuBtn from './mobile-menu-btn';

export default () => {
	return (
		<nav className='navbar navbar-default navbar-fixed-top'>
			<div class="container-fluid">
				<div class="navbar-header">
					<MobileMenuBtn />
					<Logo />
				</div>
				<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul class="nav navbar-nav">
						<li><LineLink /></li>
						<li><VkLin /></li>
					</ul>
					<SearchForm />
					<AddAdvForm />
				</div>
			</div>
		</nav>
	)
}