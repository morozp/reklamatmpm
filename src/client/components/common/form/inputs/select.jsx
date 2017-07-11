import React from 'react';

export const NamedHandledSelect = (props) => {
	var { handleChangeByName, value, name, nameValueOptions, className,id } = props;
	return (
		<select 
			id={id}
			className={className}
			value={value}
			onChange={handleChangeByName}
			name={name}
		>
			{nameValueOptions.map(
				(option, index) => {
					return (
						<option value={option.value} key={option.value || 'null'}>
							{option.name}
						</option>
					)
				}
			)}
		</select>
	);
};
