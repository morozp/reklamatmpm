import React from 'react';
import {	
	Route,
} from 'react-router-dom'

import TopPanel from './top-panel';
import Footer from './footer';


import { AddItemForm } from './adv/add-item';
import { AdvWrapper } from './common/adv-wrapper';


class App extends React.Component {
	render() {
		return (
				<div>
					<TopPanel />
					<div className='page-content' style={{margin: '0 auto', padding:50,marginTop:80 ,maxWidth:610,minWidth:200}}>
						<Route path='/new' component={AddItemForm}>
							{/*(<AdvWrapper>
								<AddItemForm/>
							</AdvWrapper>)*/}
						</Route>
					</div>
					<Footer />
				</div>
		)
	}
}

export default App;