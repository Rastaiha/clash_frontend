import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  Container,
  Grid,
  Segment,
  Header,
  Divider,
  Label,
  Image,
} from 'semantic-ui-react'

class Card extends Component {
  render() {
    return (
      <div
        style={{
          height: '20%',
          width: '20%',
        }}
      >
        <h3 style={{ marginBottom: '0.5rem' }}>
          «هاشم‌‌ جنگجو»
        </h3>
        <Image
          src={process.env.PUBLIC_URL + '/images/cards/index.jpeg'}
        />
        <h5 style={{ marginTop: '0.5rem' }}>
          قدرت: ۱۳
        </h5>
      </div>
    )
  }

}

const mapSateToProps = (state) => ({

})

export default connect(
  mapSateToProps,
  {

  }
)(Card)