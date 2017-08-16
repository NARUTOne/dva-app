import { routerRedux } from 'dva/router'
import { query, logout } from '../services/app'
import {config, auth} from 'utils'

export default {

  namespace: 'home',

  state: {},

  subscriptions: {
    
  },

  effects: {
    *go ({
      payload,
    }, { call, put }) {
    	// const { success, user } = yield call(query, payload)
      const success = true
      const user = auth.isLoginIn() && auth.user
    	if (success && user) {
        yield put(routerRedux.push('/dashboard'))
      } else {
        if (config.openPages && config.openPages.indexOf(location.pathname) < 0) {
          let from = location.pathname
          window.location = `${location.origin}/login?from=${from}`
        }
      }
      
    },
  },

  reducers: {
    
  },

};
