var React = require('react');
class HelloMessage extends React.Component {
	render() {
		return (
			<html>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<title>reklama.tm</title>
				</head>
				<body>
					<link rel="stylesheet" href="/index.css" />
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
					<script src='/bundle.common.js' />
					<script src='/bundle.vendor.js' />
					<script src='/bundle.index.js' />
				</body>
			</html>
		);
	}
}

module.exports = HelloMessage;