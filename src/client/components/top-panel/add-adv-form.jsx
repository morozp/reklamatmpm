import React from 'react';
import { Link } from 'react-router-dom';

const AddBtn = () => {
	return (
		<Link to={'#'} className='btn default'>
			Добавить объявление
		</Link>
	);
};


export default () => (
	<form className="navbar-form navbar-center">
		<AddBtn />
	</form>
)