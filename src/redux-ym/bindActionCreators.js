function bindActionCreator(creator, dispatch) {
  return (...args) => {
    return dispatch(creator(...args));
  };
}

// 这里接受的creators是一个对象，目的是执行每个creastor方法，并将dispatch加进去，dispatch的参数就是方法执行返回的结果
function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

export default bindActionCreators;
