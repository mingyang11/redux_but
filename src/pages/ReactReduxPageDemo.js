import React, { Component } from 'react';
import { connect } from '../react-redux-ym';
import bindActionCreators from '../redux-ym/bindActionCreators';

class ReactReduxPageDemo extends Component {
  render() {
    console.log(this.props, 'props');

    return (
      <div>
        <h2>ReactReduxPageDemo</h2>
        <h3>{this.props?.count}</h3>
        <button onClick={() => this.props.add()}>增加</button>
        <button onClick={() => this.props.delete()}>减少</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  let creators = {
    add: () => ({ type: 'ADD' }),
    delete: () => ({ type: 'DELETE' }),
  };
  creators = bindActionCreators(creators, dispatch);
  return creators;
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPageDemo);
