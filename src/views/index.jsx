var React = require('react');
class HelloMessage extends React.Component {
	render() {
		return (
			<body>
				<div
					className='app-container'
					id='app-container'
				>
					{/*Hello {this.props.name}
			<ul>
				{messages.map((message) => (
					<li key={message.id}>
						<strong>ID#{message.id} </strong>
						<br />
						{message.message}
					</li>
				))}
			</ul>*/}
				</div>
				<script src='/bundle.index.js' />
			</body>);
	}
}

module.exports = HelloMessage;