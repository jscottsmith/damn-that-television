import React, { PureComponent, Fragment } from 'react';
import IntroLanding from '../../components/sections/IntroLanding/IntroLanding';
import HomeLanding from '../../components/sections/HomeLanding/HomeLanding';
import WhatsUp from '../../components/sections/WhatsUp/WhatsUp';
import SeeMe from '../../components/sections/SeeMe/SeeMe';
import LinksToClick from '../../components/sections/LinksToClick/LinksToClick';

export default class Home extends PureComponent {
    render() {
        return (
            <Fragment>
                <IntroLanding />
            </Fragment>
        );
    }
}
