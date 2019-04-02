import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import levelConfigs from '../constants/levelConfigs';
import { nextLevel } from '../actions/levelActions';
import LevelInterface from './LevelInterface';
import LoadGameAssets from './LoadGameAssets';
import Level from './Level';

class LevelController extends Component {
    static propTypes = {
        currentLevel: PropTypes.number.isRequired,
        handleComplete: PropTypes.func.isRequired,
        kills: PropTypes.number.isRequired,
        nextLevel: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps) {
        if (
            this.props.kills > prevProps.kills &&
            this.props.kills >= this.config.killsToAdvance
        ) {
            this.levelComplete();
        }
    }

    levelComplete = () => {
        this.props.nextLevel();
        this.props.handleComplete();
        this.setState({ hasLoaded: true });
    };

    get config() {
        return levelConfigs[this.props.currentLevel];
    }

    _getLevel() {
        const { currentLevel } = this.props;

        switch (currentLevel) {
            case 0: {
                return (
                    <LoadGameAssets assetUrls={this.config.assetUrls}>
                        {({ hasLoaded, assets }) =>
                            hasLoaded ? (
                                <Fragment>
                                    <LevelInterface />
                                    <Level
                                        config={this.config}
                                        assets={assets}
                                    />
                                </Fragment>
                            ) : (
                                <p>Loading...</p>
                            )
                        }
                    </LoadGameAssets>
                );
            }
            case 1: {
                return (
                    <LoadGameAssets assetUrls={this.config.assetUrls}>
                        {({ hasLoaded, assets }) =>
                            hasLoaded ? (
                                <Fragment>
                                    <LevelInterface />
                                    <Level
                                        config={this.config}
                                        assets={assets}
                                    />
                                </Fragment>
                            ) : (
                                <p>Loading...</p>
                            )
                        }
                    </LoadGameAssets>
                );
            }
        }
        return null;
    }

    render() {
        return this._getLevel();
    }
}

const mapStateToProps = ({ level: { currentLevel }, score: { kills } }) => ({
    currentLevel,
    kills,
});

const mapDispatchToProps = (dispatch) => ({
    nextLevel: bindActionCreators(nextLevel, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LevelController);
