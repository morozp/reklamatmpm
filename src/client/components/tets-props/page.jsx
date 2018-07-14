import React from 'react';

import './style.less';

const StateLess = ({ text, value,onClick}) => {
    console.log('less render');
    const onclick = ()=>{
        onClick(value);
    }

    return <div className={'child'}>
        <span>{text}</span>
        <span>{value}</span>
        <button onClick={onclick}/>
    </div>
}

class ExtendComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('component render');
        const { text, value } = this.props;
        return <div className={'child'}>
            <span>{text}</span>
            <span>{value}</span>
        </div>
    }
}

class ExtendPureComponent extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('pure render');
        const { text, value } = this.props;
        return (<div className={'child'}>
            <span>{text}</span>
            <span>{value}</span>
        </div>);
    }
}

class ExtendShouldComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(prevProps, prevState) {
        const should = this.props.value !== prevProps.value 
        && this.props.text!== this.props.text;
        return should;
    }
    render() {
        console.log('should render');
        const { text, value } = this.props;
        return (<div className={'child'}>
            <span>{text}</span>
            <span>{value}</span>
        </div>);
    }
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            text: 'parent',
            less: {
                value: 1,
                text: 'less state',
            },
            component: {
                value: 2,
                text: 'component',
            },
            pure: {
                value: 3,
                text: 'pure',
            },
            should: {
                value: 4,
                text: 'should',
            },
        };
        this.changeParrentStateValue = this.changeParrentStateValue.bind(this);
    }
    changeParrentStateValue() {
        this.setState({ value: this.state.value + 1 });
    }
    render() {
        const { text, value } = this.state;

        return (<div className={'parent'}> 
            <div className={'child'}>
                <span>{text}</span>
                <span>{value}</span>
            </div>
            <button
                onClick={this.changeParrentStateValue}>change parrent state value</button>
            <StateLess
                text={this.state.less.text}
                value={this.state.less.value}
                onClick={((value)=>{console.log(value)})}                
            />
            <ExtendComponent
                text={this.state.component.text}
                value={this.state.component.value}
            
            />
            <ExtendPureComponent
                text={this.state.pure.text}
                value={this.state.pure.value}
            />
            <ExtendShouldComponent
                text={this.state.should.text}
                value={this.state.should.value}
            />
        </div>);
    }
}

export { Page };