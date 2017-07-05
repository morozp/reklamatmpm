import React from 'react';

export const NamedHandledTextArea = (props) => {
	var { handleChangeByName, value, name } = props;
	return (
		<textarea			
			value={value}
			onChange={handleChangeByName}
			name={name}
		/>
	);
};
