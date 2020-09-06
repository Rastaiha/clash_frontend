import React from 'react';
import { Image } from 'react-konva';
import loadedImages from './loadedImages';

export default class URLImage extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }

  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }

  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }

  loadImage() {
    // console.log("loading image", this.props.src, loadedImages[this.props.src])
    if (!!loadedImages[this.props.src]) {
      this.image = loadedImages[this.props.src];
      this.handleLoad();
    } else {
      loadedImages[this.props.src] = new window.Image();
      this.image = loadedImages[this.props.src];
      this.image.src = this.props.src;
      this.image.addEventListener('load', this.handleLoad);
    }
  }

  handleLoad = () => {
    this.setState({
      image: this.image,
    });
  };
  
  render() {
    return (
      <Image
        {...this.props}
        image={this.state.image}
        ref={(node) => {
          this.imageNode = node;
        }}
      />
    );
  }
}
