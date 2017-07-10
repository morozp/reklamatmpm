import React from 'react';

export const NamedHandledTextArea = (props) => {
	var { handleChangeByName, value, name, id ,className } = props;
	return (
		<textarea
			id={id}
			value={value}
			onChange={handleChangeByName}
			name={name}
			className={className}
			placeholder={props.placeholder}
		/>
	);
};
