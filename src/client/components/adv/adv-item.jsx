import React from 'react';

const propsT = {
	id:1,
	images:[1,2,3,4],
	category:'auto',
	service:'for-sale',
	place:['all'],
	description:'asdk asdkl as dkla skldakls dklas dklakls dklask ad',
	publishTime:'12/02/88  12:16:10',
	viewCount:879,
	fields:[
		{name:'Ady',value:'BMW F10'},
		{name:'Ýeri',value:'Ashgabat '},
		{name:'Ady',value:'BMW F10'},
		{name:'Ady',value:'BMW F10'},
		{name:'Ady',value:'BMW F10'},
	]

}

const AdvItem  = (props) => {	
		return (
		 <div className='adv-item'>
			<div className='images'>
				
			</div>

			<div className='price'>
			</div>

			<div className='description-fields'>
				
			</div>

			<div className='statistic'>

			</div>

			<div className='controls'>

			</div>
			
		 </div>	
		);	
}

export default App;