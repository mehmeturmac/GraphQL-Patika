import { Menu } from 'antd';
import styles from './styles.module.css';

import { Link, useLocation } from 'react-router-dom';

function HeaderMenu() {
  const location = new useLocation();
  return (
    <Menu mode="horizontal" className={styles.headerMenu} selectedKeys={[location.pathname]}>
      <Menu.Item key="/" className={styles.menuItem}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/new" className={styles.menuItem}>
        <Link to="/new">New</Link>
      </Menu.Item>
    </Menu>
  );
}

export default HeaderMenu;
