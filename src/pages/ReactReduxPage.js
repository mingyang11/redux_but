import { Component } from 'react';
import { connect } from 'react-redux';

class ReactReduxPage extends Component {
  render() {
    const { dispatch, count } = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <button onClick={() => dispatch({ type: 'ADD' })}>{count}</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};
// connect就是一个高阶组件，本质就是一个函数，接受组件作为参数，返回新的组件
export default connect(mapStateToProps)(ReactReduxPage);
// mapDispatchToProps
