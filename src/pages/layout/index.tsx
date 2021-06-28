import React, { Fragment } from 'react';
import { observer, inject } from 'mobx-react';
import Utils from '../../services/utils';

import './index.less';

interface iProps extends iReactRoute {
    nickname: string;
    isLogin(): boolean;
}
interface IState {
    active: string;
    layout: boolean;
}

@inject((models: any) => ({}))
@observer
export default class extends React.Component<iProps, IState> {
    constructor(props: any) {
        super(props);
        const curr = Utils.checkUrl(props.location.pathname);
        this.state = {
            active: curr.name,
            layout: !curr.hideLayout,
        };
        if (curr.title) document.title = curr.title + ' | 后缀';
    }

    render() {
        if (!this.state.layout) return this.props.children;
        return (
            <Fragment>
                <div id="main">{this.props.children}</div>
            </Fragment>
        );
    }
}
