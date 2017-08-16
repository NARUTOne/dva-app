import { routerRedux } from 'dva/router'
import { queryURL, auth } from 'utils'
import { parse } from 'qs'
import { login } from '../services/login'

export default {
  namespace: 'login',
  state: {
    loginLoading: false,
  }, 

  effects: {
    *login ({
      payload,
    }, { put, call }) {
      yield put({ type: 'showLoginLoading' })
  		
      // const user = yield call(login, payload)

      const user = parse(payload)
      
      yield put({ type: 'hideLoginLoading' })
      if (user) {
        auth.register(user)
        const from = queryURL('from')
        yield put({ type: 'app/query' })
        if (from) {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/home'))
        }
      } else {
        throw user
      }
    },
  },
  reducers: {
    showLoginLoading (state) {
      return {
        ...state,
        loginLoading: true,
      }
    },
    hideLoginLoading (state) {
      return {
        ...state,
        loginLoading: false,
      }
    },
  },
}
