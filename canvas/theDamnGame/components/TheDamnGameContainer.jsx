import React, { Component } from 'react';
import Link from 'next/link';
import LevelController from './LevelController';

import GameStore from '../store/GameStore';
import { Provider } from 'react-redux';
import styles from './TheDamnGameContainer.scss';

export default class TheDamnGameContainer extends Component {
    render() {
        return (
            <Provider store={GameStore}>
                <Link href="/">
                    <a className={styles.pauseBtn}>Escape</a>
                </Link>
                <LevelController />
            </Provider>
        );
    }
}
