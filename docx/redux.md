1.什么是 redux？  
 redux 是一个状态管理库

2.什么是 reducer？  
 reducer 是一个纯函数，和数组的方法 reduce 类似，接受一个函数，纯函数就是不带有副作用的函数，他接受旧的 state 和 action，返回一个新的 state

数组的 reduce  
 Array.prototype.reduce(reducer, initialValue?)
3.createStore 接收一个 reducer 参数，返回三个值，dispatch(分发，改变 store 的事件)、getState(获取 store 中的 state)、 subscribe(监听)
（还可以接受其他参数，比如中间件和初始值这些，具体要看源码怎么处理）

-只在项目中使用 redux 不是很适合，因为没有使用 react-redux 将 store 放在项目中，导致 store 不能通过 props 传递到组件中，因此在出发 dispatch 时由于 props 没有变化导致组件感知不到变化，因此不会发生渲染
