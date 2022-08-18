// 聚合函数
function compose(...funcs) {
  if (!funcs.length) {
    return (args) => {
      return args;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reverse().reduce((a, b) => {
    return (args) => b(a(args));
  });
}

export default compose;
