import React from 'react';
import {Route, Switch} from 'react-router-dom';
import AdvItem from './item';
import {EditItem} from './edit-item';
import {AdvWrapper} from '../common/adv-wrapper';
import advService from '../../api-services/adv';

const advList = [
	{
		price: 16000000,
		currency: 'TMT',
		images: ['bmw'],
		description: `
		<div>
			Ady: BMW F10 <br>
			Ýeri: Ashgabat <br>
			Reňki: gok<br>
			FASTER THAN THE FASTEST<br>
			Bahasy: 160.000,00 TMT <br>
			Telefon: 99362606945 <br>
			Line ID: @reklama.tm <br>
		</div>`,
		id :'item',
		publishDate : 'Сегодня, в 14:28',
		viewsCount: 1202020202,
		isEditable: true,
	},
];

class AdvList extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			advList: advList,
		}
	}

	componentDidMount() {
		advService.getAll()
		.then((advList)=>{
			this.setState({advList});
		}).catch((err)=>{
			console.log(err);
		})
	}

	render() {
		const {
			advList = [],
		} = this.state;

		return (
			<div className='adv-list'>
				{
					advList.map(
						(advItem) => (
							<AdvWrapper key={advItem.id}>
								<Switch>
								<Route
									path={`/edit/${advItem.id}`}
									render={()=>(<EditItem {...advItem}/>)}
								/>
								<Route
									path={`/`}
									render={()=>(<AdvItem {...advItem} />)}>
								</Route>
								</Switch>
							</AdvWrapper>
						)
					)
				}
			</div>
		)
	}
}

export {
	AdvList
};