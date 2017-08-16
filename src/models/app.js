import { query, logout } from '../services/app'
import { routerRedux } from 'dva/router'
import { config, auth } from 'utils'
import { parse } from 'qs'

export default {
  namespace: 'app',
  state: {
    user: {},
    isCollapsed: false,
    menu: [
      { 
        id: 1,
        icon: 'laptop',
        name: 'Dashboard',
        router: '/dashboard',
      },
      {
        id: 2,
        icon: 'appstore-o',
        name: 'ToDo',
        children: [
          {
            id: 21,
            bpid: 2,
            icon: 'bars',
            name: 'list',
            router: '/todo/list',
          }
        ]
      }
    ],
    isNavbar: document.body.clientWidth < 769,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      //登录验证
      // dispatch({ type: 'query' })

      history.listen(location => {
        if ((config.homePages.indexOf(location.pathname) < 0 && config.openPages.indexOf(location.pathname) < 0) && !auth.isLoginIn() ) {
          dispatch({ type: 'init' })
        }
      })
      
      // 移动 端导航
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },
  },
  effects: {
    *init({
      payload
    },{call, put}) {
      yield put(routerRedux.push('/home'))
    },
    *query ({ 
      payload,
    }, { call, put }) {
      
      // const { success, user } = yield call(query, payload)
      let user = null
      if(auth.isLoginIn()) {
        user = parse(auth.user)
      }

      const success = true 
           
      if (success && user) {
        
        yield put({
          type: 'updateState',
          payload: {
            user 
          },
        })
          
        auth.register(user)

        if (location.pathname === '/login') {
          yield put(routerRedux.push('/home'))
        }
      } else {
        if (config.homePages.indexOf(location.pathname) < 0 && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname
          window.location = `${location.origin}/login?from=${from}`
        }
      }
    }, 

    *logout ({
      payload,
    }, { call, put }) {
      auth.destroy()
      yield put({ type: 'query' })
    },
    *login ({
      payload,
    }, { call, put }) {
      let from = location.pathname
      window.location = `${location.origin}/login?from=${from}`
    },
     *changeNavbar ({
      payload,
    }, { put, select }) {
      const { app } = yield(select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },
    
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
    toggle (state, { payload }) {
      return {
        ...state,
        isCollapsed: payload.isCollapsed,
      }
    },
    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },
  }
}
