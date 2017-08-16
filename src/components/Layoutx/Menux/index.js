import React from 'react'
import PropTypes from 'prop-types'
import styles from './index.less'
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router'
import { config } from 'utils'

const Menux = ({menu, handleClickNavMenu}) => {
	// 生成树状
  const menuTree = menu
	 // 递归生成菜单
  const getMenus = (menuTreeN) => {
    return menuTreeN.map((item, i) => {
      if (item.children) {
        return (
          <Menu.SubMenu
            key={item.id + ''}
            title={<span>
              {item.icon && <Icon type={item.icon} />}
              <span>{item.name}</span>
            </span>}
          >
            {getMenus(item.children)}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id + ''}> 
          <Link to={item.router}>
            {item.icon && <Icon type={item.icon} />}
            <span>{item.name}</span>
          </Link>
        </Menu.Item>
      )
    })
  }
  const menuItems = getMenus(menuTree)
  
	return (
		<div>
      <div className={styles.sider_logo}>
        <Link to="/" ><img alt={'logo'} src={config.logo} /></Link>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={handleClickNavMenu}>
        {menuItems}
      </Menu>
    </div>
	)
}

Menux.propTypes = {
  menu: PropTypes.array,
  handleClickNavMenu: PropTypes.func,
}

export default Menux

