function bindActionCreator(creator, dispatch) {
  return (...args) => {
    return dispatch(creator(...args));
  };
}

function bindActionCreators(creators, dispatch) {
  let obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

export default bindActionCreators;
