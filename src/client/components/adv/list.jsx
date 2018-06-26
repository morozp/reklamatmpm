import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import AdvItem from './item';
import { EditItem } from './edit-item';
import { AdvWrapper } from '../common/adv-wrapper';
import Spinner from 'react-spinkit';
import InfiniteScroll from 'react-infinite-scroll-component';
const {
    categories,
    regions,
    services,
} = require('../../../common/enums/adv');
import advService from '../../api-services/adv';

const {
    orderTypes,
} = require('../../../common/enums/order');

const getFilter = (props, state) => {
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
    };
};

const pageCount = 5;
const loadItems = (x, comp) => {
    comp.setState({ pageIndex: Math.floor(comp.state.advList.length / pageCount), hasMore: false });
    const filter = getFilter(comp.props, comp.state);

    return advService.getAll(filter)
        .then((advList) => {
            if (Array.isArray(advList) && advList.length > 0) {
                /*const onlyNewAds = advList.filter((advItem)=>{
                    if(comp.loadedIds[advItem.id]){
                        return false;
                    }
                    comp.loadedIds[advItem.id] = true;
                    return true;
                })
                if(onlyNewAds.length > 0){
                    var x = comp.state.advList.concat(onlyNewAds);*/
                var x = comp.state.advList.concat(advList);
                comp.setState({ advList: x, hasMore: true });
                /*}*/
            }
            else {
                setTimeout(() => {
                    comp.setState({ hasMore: true });
                }, 10000);
            }
        }).catch((err) => {
            setTimeout(() => {
                comp.setState({ hasMore: true });
            }, 2000);
        });
};

class AdvList extends React.Component {

    constructor(props) {
        super(props);
        this.loadedIds = {};
        this.state = {
            advList: [],
            pageIndex: 0,
            hasMore: true,
        };

        this.loadMore = this.loadMore.bind(this);
    }

    loadMore(pageIndex) {
        loadItems(pageIndex, this);
    }

    componentDidMount() {
        loadItems(this.props, this);
    }

    render() {
        const {
            advList = [],
        } = this.state;

        return (
            <div className='adv-list'>
                <InfiniteScroll
                    next={this.loadMore}
                    hasMore={true}
                    loader={
                        (<h4 className="loader" style={{ height: 20 }}>
                            <Spinner name="three-bounce" color="purple" />
                        </h4>)}
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
                                            path={'/'}
                                            render={() => (<AdvItem {...advItem} />)}
                                        />
                                    </Switch>
                                </AdvWrapper>
                            )
                        )

                    }
                </InfiniteScroll>
            </div>
        );
    }
}

// AdvList.propTypes = {
//     search: PropTypes.string,
//     region: PropTypes.string,
//     category: PropTypes.string,
//     service: PropTypes.string,
//     order: PropTypes.string,
// };

export {
    AdvList
};
