import React from 'react';
const searchInput = () => (
	<input type='text' class='form-control' placeholder='Например, iPhone 7' />
);
const searchBtn = () => (<button type='submit' class='btn btn-default'>Найти</button>);
export default () => (
	<form class='navbar-form navbar-left' role='search'>
		<div class='form-group'>
			<searchInput />
		</div>
		<searchBtn />
	</form>
)