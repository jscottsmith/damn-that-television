import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import levelConfigs from '../constants/levelConfigs';
import { nextLevel } from '../actions/levelActions';
import LevelInterface from './LevelInterface';
import Level from './Level';

class LevelController extends Component {
    static propTypes = {
        currentLevel: PropTypes.number.isRequired,
        kills: PropTypes.number.isRequired,
        nextLevel: PropTypes.func.isRequired,
    };

    componentDidUpdate(prevProps) {
        if (
            this.props.kills > prevProps.kills &&
            this.props.kills >= this.config.killsToAdvance
        ) {
            this.props.nextLevel();
        }
    }

    get config() {
        return levelConfigs[this.props.currentLevel];
    }

    _getLevel() {
        const { currentLevel } = this.props;
        switch (currentLevel) {
            case 0: {
                return (
                    <Fragment key="0">
                        <LevelInterface />
                        <Level config={this.config} />
                    </Fragment>
                );
            }
            case 1: {
                return (
                    <Fragment key="1">
                        <LevelInterface />
                        <Level config={this.config} />
                    </Fragment>
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
