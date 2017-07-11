import React from 'react';

export const NamedHandledInput = (props) => {
	var { handleChangeByName, value, name, type, id } = props;
	return (
		<input
			id={id}
			type={type}
			value={value}
			onChange={handleChangeByName}
			name={name}
		/>
	);
};
