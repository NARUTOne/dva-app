const APIV1 = '/api/v1'

module.exports = {
  name: 'ANTD DEMO',
  prefix: 'antdDemo',
  footerText: 'Ant Design && Dva  Demo  © 2017 by NARUTOne',
  logo: '/code.png',
  openPages: ['/login'],
  homePages: ['/home', '/'],
  apiPrefix: '/api/v1',
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    user: `${APIV1}/user/:id`,
  },
}
