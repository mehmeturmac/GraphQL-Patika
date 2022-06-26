import { Routes, Route } from 'react-router-dom';
import { Col, Row } from 'antd';
import styles from './styles.module.css';

import HeaderMenu from './HeaderMenu';

// Pages
import Home from 'pages/Home';
import NewEvent from 'pages/NewEvent';
import Event from 'pages/Event';

function App() {
  return (
    <div className={styles.container}>
      <Row justify="center">
        <Col span={10}>
          <HeaderMenu />
          <div className={styles.content}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<NewEvent />} />
              <Route path="/event/:id" element={<Event />} />
            </Routes>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default App;
