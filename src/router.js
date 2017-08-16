import React from 'react';
import PropTypes from 'prop-types'
import { Router, Route, IndexRedirect, browserHistory } from 'dva/router';
import App from './routes/app'

//注入model
const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}

// 用户登录验证
function requireAuth(nextState, replace) {
  const path = nextState.location.pathname
  const loginPath = '/login'
//if (!auth.isLoginIn()) {
//  path !== loginPath && replace({
//    pathname: '/login',
//    state: {
//      referrer: path
//    }
//  })
//}
}


function Routers({ history, app }) {
	return (
    <Router history={history}>
    	<Route
	      path='/'
	      onEnter={(...args) => {
	        requireAuth(...args)
	      }}
	      component={App}
	    >
		    <IndexRedirect to="/home" />
	      <Route 
	      	path="home" 
	      	getComponent={(nextState, cb) => {
		        require.ensure([], require => {
		        	registerModel(app, require('./models/home'))
		          cb(null, require('./routes/home/'))
		        })
      	}} />
      	<Route 
	      	path="dashboard" 
	      	getComponent={(nextState, cb) => {
		        require.ensure([], require => {
		        	registerModel(app, require('./models/dashboard'))
		          cb(null, require('./routes/dashboard/'))
		        })
      	}} />
      	<Route path='todo'>
      		<Route 
		      	path="list" 
		      	getComponent={(nextState, cb) => {
			        require.ensure([], require => {
			        	registerModel(app, require('./models/todo/list'))
			          cb(null, require('./routes/todo/list/'))
			        })
	      	}} />
      	</Route>      	
      	<Route 
	      	path="login" 
	      	getComponent={(nextState, cb) => {
		        require.ensure([], require => {
		        	registerModel(app, require('./models/login'))
		          cb(null, require('./routes/login/'))
		        })
      	}} />
      	<Route 
	      	path="*" 
	      	getComponent={(nextState, cb) => {
		        require.ensure([], require => {
		          cb(null, require('./routes/error/'))
		        })
      	}} />
	    </Route>
    </Router>
	);
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}


export default Routers;
