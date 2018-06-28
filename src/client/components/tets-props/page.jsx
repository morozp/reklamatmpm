import React from 'react';

const LessState = ({ text, value }) => {
    console.log('less render');
    return <div>
        <span>{text}</span>
        <span>{value}</span>
    </div>
}

class ExtendComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('component render');
        const { text, value } = this.props;
        return <div>
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
        console.log('less render');
        const { text, value } = this.props;
        return <div>
            <span>{text}</span>
            <span>{value}</span>
        </div>
    }
}

class ExtendShouldComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    shouldComponentUpdate(prevProps, prevState) {
        return this.props !== prevProps;
    }
    render() {
        const { text, value } = this.props;
        return (<div>
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

        return (<div>
            <div>
                <span>{text}</span>
                <span>{value}</span>
            </div>
            <button
                onClick={this.changeParrentStateValue}>change parrent state value</button>
            <LessState
                text={this.state.less.text}
                value={this.state.less.value}
                onClick={()=>({})}
            />
            <ExtendComponent
                text={this.state.component.text}
                value={this.state.component.value}
            />
             <ExtendPureComponent
                text={this.state.pure.text}
                value={this.state.pure.value}
            />
        </div>);
    }
}

export { Page };