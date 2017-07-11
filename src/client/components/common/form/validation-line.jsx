import React from 'react';

export const ValidationError = (props) => {
	var { error } = props;
	return (error && (<p className='vallidation-error'>{error}</p>)) || null;
};

export const ValidationErrors = (props) => {
	var { errors } = props;

	return errors && errors.length && (errors.map(
		(error, index) => (
			<ValidationError key={index} error={error} />
		))) || null;
};