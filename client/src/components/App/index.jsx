import { Routes, Route, Link } from 'react-router-dom';
import { Col, Row } from 'antd';
import styles from './styles.module.css';

import HeaderMenu from './HeaderMenu';

// Pages
import Home from 'pages/Home';
import NewPost from 'pages/NewPost';

function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span={14}>
          <HeaderMenu />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<NewPost />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
