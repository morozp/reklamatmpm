import React from 'react';
import {
    Route,
} from 'react-router-dom';
import { TopPanel } from './top-panel';
import Footer from './footer';
import { AddItemForm } from './adv/add-item';
import { AdvList } from './adv/list';
import {Page} from './tets-props/page';
import { CloudinaryContext } from 'cloudinary-react';
const cloudName = require("../../common/config").cloudinary_config.cloud_name;

class App extends React.Component {

    render() {
        return (
            <div>
                <TopPanel />
                <CloudinaryContext cloudName={cloudName}>
                    <div className='page-content' style={{ margin: '0 auto', padding: 50, marginTop: 80, maxWidth: 610, minWidth: 200 }}>
                        <Route exact path='/' component={AdvList} />
                        <Route path='/edit' component={AdvList} />
                        <Route path='/new' component={AddItemForm} />
                        <Route path='/test-props' component={Page} />
                    </div>
                </CloudinaryContext>
                <Footer />
                

            </div>
        );
    }
}

export default App;