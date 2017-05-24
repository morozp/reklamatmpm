var React = require('react');

const messages = [
	{ id: 1, message: 'message name' },
	{ id: 2, message: 'message name 1' },
	{ id: 3, message: 'message name 2' },
	{ id: 4, message: 'message name 3' },
	{ id: 5, message: 'message name 4' },
	{ id: 6, message: 'message name 5' },
]
class HelloMessage extends React.Component {
	render() {
		return (<div>

		<script src='~/dist/bundle.index.js'/>
			Hello {this.props.name}
			<ul>
				{messages.map((message) => (
					<li key={message.id}>
						<strong>ID#{message.id} </strong>
						<br />
						{message.message}
					</li>
				))}
			</ul>
		</div>);
	}
}

module.exports = HelloMessage;