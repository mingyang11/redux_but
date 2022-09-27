// 聚合函数，执行方式为compose(fn1, fn2, fn3)(12)
// 顺序执行作为参数的函数，将执行结果返回给下一个函数作为参数
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
