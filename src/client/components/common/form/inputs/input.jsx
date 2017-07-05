import React from 'react';

export const NamedHandledInput = (props) => {
	var { handleChangeByName, value, name, type } = props;
	return (
		<input
			type={type}
			value={value}
			onChange={handleChangeByName}
			name={name}
		/>
	);
};
