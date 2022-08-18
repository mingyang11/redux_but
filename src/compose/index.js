function fn1(arg) {
  console.log('f1', arg);
  return arg;
}
function fn2(arg) {
  console.log('f2', arg);
  return arg;
}
function fn3(arg) {
  console.log('f3', arg);
  return arg;
}

// 上一个函数的返回值是下一个函数的参数,可读性比较差
// fn1(fn2(fn3('12')));

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
const res = compose(fn1, fn2, fn3)(12);
console.log(res, 'res');
