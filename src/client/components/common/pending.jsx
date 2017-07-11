import React from 'react';

const setParentPosition = (context) => {
	if (context.ref) {
		context.parentPosition = context.ref.parentNode.style.position;
		if (context.parentPosition !== 'absolute' && context.parentPosition !== 'relative') {
			context.ref.parentNode.style.position = 'relative';
		}
	}
}

export class Pending extends React.PureComponent {
	constructor(props) {
		super(props);

		this.ref = null;
		this.parentPosition = '';
		this.setRef = this.setRef.bind(this);
	}

	setRef(elem) {
		this.ref = elem;
	}

	componentDidMount() {
		setParentPosition(this);
	}

	componentWillUnmount() {
		if (this.ref) {
			this.ref.parentNode.style.position = this.parentPosition;
		}
	}

	render() {
		const {
			id = null,
			isPending = false,
		} = this.props;

		return (
			<div
				id={id}
				className='pending'
				ref={this.setRef}
				style={{
					position: 'absolute',
					background: 'blue',
					opacity: 0.3,
					zIndex: 1,
					top: 0,
					bottom: 0,
					left: 0,
					right: 0,
					display:(isPending ? 'block' : 'none'),
				}}
			>
				{isPending.toString()}
			</div>
		)

	}
}