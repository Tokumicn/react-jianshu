# react-jianshu
入门学习React所做的记录



### 1.项目前准备

##### 查看源信息
```
yarn config get registry
```

##### 设置yarn源为淘宝镜像
```

```

##### 设置npm源为淘宝镜像
```
npm config set registry 'https://registry.npm.taobao.org'
```



#### 2. yarn add styled-components  

######管理css的模块，将css控制在单个组件内，互相之间不收影响

###### 使用方法：将css写在一个style.js的文件里，通过导出的方式作用于单个组件上；



#### 3.使用全局css：https://meyerweb.com/eric/tools/css/reset/



#### 4.yarn add react-transition-group  #动画模块



#### 5.引入图标： 

```
css -->styled.js
cot
svg
ttf
woff
```



#### 6.引入Redux ：

```
yarn add redux

yarn  add react-redux
```


##### (1) /src/store/index.js：创建Store
```
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);
export default store;
```

###### (2) /src/store/reducer.js：创建Reducer
```
const defaultState = {
    focused: false
}

export default (state = defaultState, action) => {
    if(action.type === 'search_focus'){
        return {
            focused: true
        }
    }

    if(action.type === 'search_blur'){
        return {
            focused: false
        }
    }
    return state;
}

```


###### (3) /rc/store/reducer.js：添加引用并使用store
```
import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <GlobalStyle />
          <GlobalIconfontStyle />
          <Header />
        </Provider>
      </div>
    );
  }
}
```


###### (4) /src/common/header/index.js：具体使用时
```
import { connect } from 'react-redux';

const Header = (props) => {
    return ()
}

const mapStateToProps = (state) => {
   return  {
        focused: state.focused
    }
}

// 修改Store中的值
const mapDispathToProps = (dispatch) => {
   return  {
        handleInputFocus() {
            const action = {
                type: 'search_focus'
            };
            dispatch(action);
        },
        handleInputBlur(){
            const action = {
                type: 'search_blur'
            };
            dispatch(action);
        }
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);
```



#### 7.yarn add immutable  #安装（yarn add immutable.js），不可修改对象，将reducer总的state被变更为不可修改对象，防止编码时修改造成错误。

/src/common/header/store/reducer.js：将state 变为immutable

```
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

// 将对象变为immutable类型的对象
const defaultState = fromJS({
    focused: false
});

export default (state = defaultState, action) => {
    // immutable对象的set方法：会结合之前immutable对象的值和设置的值，返回一个全新的对象
    if(action.type === actionTypes.SEARCH_FOCUS){
        return state.set('focused', true)
    }
    if(action.type === actionTypes.SEARCH_BLUR){
        return state.set('focused', false)
    }
    return state;
}
```


使用的时候也要变了：

```
// 原来：
const mapStateToProps = (state) => {
    return  {
        focused: state.header.focused
    }
}
```

```
// 现在：
const mapStateToProps = (state) => {
    return  {
        focused: state.header.get('focused')
    }
}
```

##### 7.1 yarn add redux-immutable  #安装redux-immutable 让state获取的方式更佳统一

/src/common/store/reducer.js：将combineReducers变为immutable

```
import { combineReducers } from 'redux-immutable';
import {reducer as headerReducer} from '../common/header/store';

// 合并Reducer
const reducer =  combineReducers({
    header: headerReducer
})

export default reducer;
```


那么，使用的时候就更佳统一：

```
const mapStateToProps = (state) => {
    return  {
        focused: state.get('header').get('focused')
    }
}
```



#### 8.yarn add redux-thunk  #管理ajax请求

src/store/index.js：使用redux中的applyMiddleware，引入thunk

```
import {
    createStore,
    compose,
    applyMiddleware
} from 'redux';

import thunk from 'redux-thunk';
import reducer from './reducer';

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default store;
```



使用了redux-thunk 返回时不一定要是对象()  也可以是一个函数{}

```
export const getList = () => {
    return (dispatch) => { }
}
```



##### 8.1  yarn add  axios #引入axios模块，管理ajax请求

/src/common/header/store/actionCreators.js  #使用axios

```
这里有个点需要注意：reducer中list属性是一个immutable的对象，所以这里要统一这个对象类型，因此需要{fromJS}将data转换为immutable对象

const changeHotSearchList = (data) => ({
    type: actionTypes.SEARCH_HOTLIST,
    data: fromJS(data) // 为了统一reducer中list这个值也要是immutable
})
```

使用了redux-thunk 返回时不一定要是对象()  也可以是一个函数{}

```
export const getHotSearchList = () => {
    return (dispatch) => {
        axios.get('/api/header/hotsearchlist.json').then((res) => {
            const data = res.data;
            dispatch(changeHotSearchList(data.data));
        }).catch(() => {
            console.log('error');
        })
    }
}
```



#### 一个技巧： /src/public/api/hotsearch.json

```
在public文件夹下的json文件可以Dev Server可以提供给请求使用，前端测试时可用
```



#### 9.yarn add react-touter-dom #安装React路由模块

/src/App.js ： 使用router,Provider 和 BrowserRouter 都只能有一个子控件，因此要用div包着多个

exact表示 ：是要求路由要完全匹配才显示

```
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { GlobalStyle } from './style.js';
import { GlobalIconfontStyle } from './statics/iconfont/iconfont';
import Header from './common/header';

class App extends Component {
  render() {
    return (
      <div>
        <GlobalStyle />
        <GlobalIconfontStyle />
        <Provider store={store}>
          <div>
            <Header />
            <BrowserRouter>
              <div>
                <Route path='/' exact render={() => <div>home</div>}></Route>
                <Route path='/defail' exact render={() => <div>defail</div>}></Route>
              </div>
            </BrowserRouter>
          </div>
        </Provider>
      </div>
    );
  }
}

export default App;
```

Router如何使用组件：

```
import Home from './pages/home';
import Detail from './pages/defail';

<Route path='/' exact component={Home}></Route>
<Route path='/defail' exact component={Detail}></Route>
```



#### 10.使用PureComponent 代替原来的Component 做优化：

```
Pure内部实现了shouldComponentUpdate，对state中的值进行了判断，如果值没有改变，就不必要去重新渲染界面上的组件。但使用PureComponent 一定要避开修改state的这个坑，因此一定要配合immutable.js来使用，将state修改为immutable的对象，保证使用的安全。
```



##### 



#### 11.异步加载组件：  yarn add react-loadable
###### (1) /src/pages/detail/loadable.js：只需要创建一个loadable.js

```
import React from 'react';
import Loadable from 'react-loadable';

const LoadableComponent = Loadable({
  loader: () => import('./'),
  loading() {
    return <div>正在加载</div>
  }
});

export default () => <LoadableComponent/>
```



###### (2) App.js ：只需要将原先引入index.js修改为引入我们的loadable.js文件即可，路由的使用没有任何变化

```
import Detail from './pages/detail/loadable.js';

<Route path='/detail/:id' exact component={Detail}></Route>
```



###### (3) 由于detail页面路由有参数，修改为异步加载后需要调整路由参数传入方式：
/src/pages/detail/index.js： connect导出时使用withRouter()将参数传入

```
// 由于引入了异步组件（loadable.js）因此需要这种方式传递参数

export default connect(mapState, mapDispatch)(withRouter(Detail));
```

