import React, { PureComponent } from 'react';
import Fade from '../../components/Fade';
import IntroLanding from '../../components/sections/IntroLanding/IntroLanding';

export default class Home extends PureComponent {
    render() {
        return (
            <Fade in>
                <IntroLanding />
            </Fade>
        );
    }
}
