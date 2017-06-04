import React from 'react';
import TopPanel from './top-panel';
import Footer from './footer';
import {
	BrowserRouter as Router,
} from 'react-router-dom'



class App extends React.Component {
	render() {
		return (
			<Router>
				<div>
					<TopPanel />
					<div>
						BODY
					</div>
					<Footer />
				</div>
			</Router>
		)
	}
}

export default App;