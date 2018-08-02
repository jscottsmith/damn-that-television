import React, { PureComponent, Fragment } from 'react';
import HomeLanding from '../../components/sections/HomeLanding/HomeLanding';
import WhatsUp from '../../components/sections/WhatsUp/WhatsUp';

export default class Home extends PureComponent {
    render() {
        return (
            <Fragment>
                <HomeLanding />
                <WhatsUp />
            </Fragment>
        );
    }
}
