import React from 'react';
import AdvItem from './item';
import {AdvWrapper} from '../common/adv-wrapper';

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
	{
		price: 10,
		currency: 'TMT',
		images: ['bmw'],
		description: `<div>
			Ady: BMW F10 <br>
			Ýeri: Ashgabat <br>
			Reňki: gok<br>
			FASTER THAN THE FASTEST<br>
			Bahasy: 160.000,00 TMT <br>
			Telefon: 99362606945 <br>
			Line ID: @reklama.tm <br>
			</div>`,
		id :'item2',
		publishDate : 'Сегодня, в 14:28',
		viewsCount: 1202020202,
		isEditable: true,
	},
	{
		price: 10,
		currency: 'TMT',
		images: ['bmw'],
		description: `
		<div>
			<br>
			TMT 160.000,00 
			<hr>
			Ady: BMW F10 <br>
			Ýeri: Ashgabat <br>
			Reňki: gok<br>
			FASTER THAN THE FASTEST<br>
			Bahasy: 160.000,00 TMT <br>
			Telefon: 99362606945 <br>
			Line ID: @reklama.tm <br>
		</div>`,
		id :'item3',
		publishDate : 'Сегодня, в 14:28',
		viewsCount: 1202020202,
		isEditable: false,
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
								<AdvItem {...advItem} />
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