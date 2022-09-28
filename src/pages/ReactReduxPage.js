import { Component } from 'react';
// import { connect } from 'react-redux';
import { connect } from '../react-redux-nut';
// import { bindActionCreators } from 'redux';
import { bindActionCreators } from '../redux-nut';

class ReactReduxPage extends Component {
  render() {
    const { count } = this.props;
    return (
      <div>
        <h3>ReactReduxPage</h3>
        <button
          onClick={() => {
            // this.props.dispatch({ type: 'ADD' });
            this.props.add();
          }}
        >
          add{count}
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state;
};
// const mapDispatchToProps = (dispatch) => {
//   let creators = {
//     add: () => ({ type: 'ADD' }),
//     delete: () => ({ type: 'DELETE' }),
//   };
//   // bindActionCreators这个方法作用是将dispatch绑定到方法上
//   creators = bindActionCreators(creators, dispatch);
//   return creators;
// };
const mapDispatchToProps = {
  add: () => ({ type: 'ADD' }),
  delete: () => ({ type: 'DELETE' }),
};
// connect就是一个高阶组件，本质就是一个函数，接受组件作为参数，返回新的组件
export default connect(mapStateToProps, mapDispatchToProps)(ReactReduxPage);
// mapDispatchToProps
