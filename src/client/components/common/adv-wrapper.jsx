import React from 'react';

export const AdvWrapper = (props)=>(
	<div className='panel panel-default'>
		<div className='panel-body'>
			{props.children}
		</div>
	</div>
);