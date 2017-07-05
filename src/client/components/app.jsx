import React from 'react';
import {
	BrowserRouter as Router,
} from 'react-router-dom'

import TopPanel from './top-panel';
import Footer from './footer';

import {AddItemForm} from './adv/add-item';


class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<TopPanel />
					<div className='page-content' style={{marginTop:80}}>
						<AddItemForm/>
					</div>
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;