import React, { PureComponent, Fragment } from 'react';
import Fade from '../../canvas/theDamnGame/components/Fade';
import IntroLanding from '../../components/sections/IntroLanding/IntroLanding';
// Old Sections
// import HomeLanding from '../../components/sections/HomeLanding/HomeLanding';
// import WhatsUp from '../../components/sections/WhatsUp/WhatsUp';
// import SeeMe from '../../components/sections/SeeMe/SeeMe';
// import LinksToClick from '../../components/sections/LinksToClick/LinksToClick';

export default class Home extends PureComponent {
    render() {
        return (
            <Fade in>
                <IntroLanding />
            </Fade>
        );
    }
}
