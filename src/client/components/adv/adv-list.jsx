import React from 'react';
import AdvItem from './adv-item';



class AdvList extends React.PureComponent {
	constructor(props) {
		super(props);
		/*this.state = {
			advList: props.advList
		}*/
	}

	componentDidMount() {
	}

	render() {
		const {
			advList = [],
		} = this.props;
		return (
			<div className='adv-list'>
				{
					adv.advList.map(
						(advItem) => (
							<AdvItem {...advItem} key={advItem.id} />
						)
					)
				}
			</div>
		)
	}
}