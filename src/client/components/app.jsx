import React from 'react';
import {
	BrowserRouter as Router,
} from 'react-router-dom'

import TopPanel from './top-panel';
import Footer from './footer';


import { AddItemForm } from './adv/add-item';
import { AdvWrapper } from './common/adv-wrapper';


class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<TopPanel />
					<div className='page-content' style={{ padding:50,marginTop:80 }}>
						<AdvWrapper>
							<AddItemForm/>
						</AdvWrapper>
					</div>
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;