import React from 'react';
const searchInput = () => (
	<input type='text' class='form-control' placeholder='Например, iPhone 7' />
);
const searchBtn = () => (<button type='submit' className='btn btn-default'>Найти</button>);
export default () => (
	<form className='navbar-form navbar-left' role='search'>
		<div className='form-group'>
			<searchInput />
		</div>
		<searchBtn />
	</form>
)