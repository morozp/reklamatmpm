import React, { PropTypes } from 'react';
import { Route, Switch } from 'react-router-dom';
import AdvItem from './item';
import { EditItem } from './edit-item';
import { AdvWrapper } from '../common/adv-wrapper';
import advService from '../../api-services/adv';
import Spinner from 'react-spinkit';
import InfiniteScroll from 'react-infinite-scroller';
const {
	categories,
	regions,
	services,
} = require('../../../common/enums/adv');
import advService from '../../api-services/adv';

const {
	orderTypes,
} = require('../../../common/enums/order');

const getFilter = (props, state, pageIndex) => {
	const {
		search = null,
		region = regions.all,
		category = categories.all,
		service = services.all,
		orderType = orderTypes.newest,
		itemsPerPage = 5,
	} = props;

	return {
		search,
		region,
		category,
		service,
		orderType,
		itemsPerPage,
		pageIndex: state.pageIndex,
	}
}

const loadItems = (pageIndex,comp) => {

	comp.setState({ pageIndex, hasMore: false });
	const filter = getFilter(comp.props, comp.state);

	return advService.getAll(filter)
		.then((advList) => {
			if (Array.isArray(advList) && advList.length > 0) {
				const onlyNewAds = advList.filter((advItem)=>{
					if(comp.loadedIds[advItem.id]){
						return false;
					}
					comp.loadedIds[advItem.id] = true;
					return true;
				})
				if(onlyNewAds.length > 0){
					let newAdvList = [...comp.state.advList, ...onlyNewAds];
					comp.setState({ advList: newAdvList, hasMore:true});
				}
			}
			else{
				setTimeout(()=>{
					comp.setState({hasMore:true})
				}, 10000);
			}
		}).catch((err) => {
			console.log(err);
			setTimeout(()=>{
					comp.setState({hasMore:true})
				}, 2000);
		});
}

class AdvList extends React.PureComponent {

	constructor(props) {
		super(props);
		this.loadedIds = {};
		this.state = {
			advList: [],
			pageIndex: 0,
			hasMore: true,
		}

		this.loadMore = this.loadMore.bind(this);
	}

	loadMore(pageIndex) {
		loadItems(pageIndex,this);
	};


	componentDidMount() {
		//loadItems(this.props, this.state);
	};



	render() {
		const {
			advList = [],
			hasMore = false,
		} = this.state;

		return (
			<div className='adv-list'>
				<InfiniteScroll
					pageStart={0}
					loadMore={this.loadMore}
					hasMore={hasMore}
					threshold={0}
					loader={
						(<div className="loader">
							<Spinner name="three-bounce" color="purple" />
						</div>)}
				>
					{
						advList.map(
							(advItem) => (
								<AdvWrapper key={advItem.id}>
									<Switch>
										<Route
											path={`/edit/${advItem.id}`}
											render={() => (<EditItem {...advItem} />)}
										/>
										<Route
											path={`/`}
											render={() => (<AdvItem {...advItem} />)}>
										</Route>
									</Switch>
								</AdvWrapper>
							)
						)
					}
				</InfiniteScroll>
			</div>
		)
	}
}

AdvList.propTypes = {
	search: PropTypes.string,
	region: PropTypes.string,
	category: PropTypes.string,
	service: PropTypes.string,
	order: PropTypes.string,
}
export {
	AdvList
};
