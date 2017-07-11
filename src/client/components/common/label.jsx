import React from 'react';

class Label extends React.Component {

	render(){
		return (
			<label
				ref={(elem)=>{console.log(elem)}}
				className={this.props.className}
				for={this.props.for}
			>
				{ this.props.children }
			</label>
		);
	}
}
