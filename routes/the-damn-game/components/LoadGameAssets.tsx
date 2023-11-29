import { PureComponent } from 'react';
import GameAssets from '../GameAssets';

export default class LoadGameAssets extends PureComponent {
  assets: any;
  props: any;

  // static propTypes = {
  //   assetUrls: PropTypes.object.isRequired,
  //   children: PropTypes.func.isRequired,
  // };

  state = { hasLoaded: false };

  componentDidMount() {
    this._loadLevelAssets();
  }

  handleAssetsLoaded = () => {
    this.setState({ hasLoaded: true });
  };

  _loadLevelAssets() {
    this.assets = new GameAssets(this.props.assetUrls, this.handleAssetsLoaded);
  }

  render() {
    const { hasLoaded } = this.state;

    return this.props.children({
      hasLoaded,
      assets: this.assets,
    });
  }
}
