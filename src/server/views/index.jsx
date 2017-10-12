var React = require('react');
class HelloMessage extends React.Component {
	render() {
		return (
			<html>
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
					<meta name="apple-mobile-web-app-capable" content="yes"/>
					<meta name="format-detection" content="telephone=no"/>
					<meta name="viewport" content="width=device-width,maximum-scale=1,initial-scale=1,user-scalable=no"/>
					<meta name="HandheldFriendly" content="True"/>
					<meta name="MobileOptimized" content="320"/>
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta http-equiv="cleartype" content="on"/>
					<title>reklama.tm</title>
				</head>
				<body>
					<link rel="stylesheet" href="/index.css" />
					<div
						className='app-container'
						id='app-container'
					>
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