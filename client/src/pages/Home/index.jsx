import { useQuery } from '@apollo/client';
import { List, Spin } from 'antd';
import { GET_EVENTS } from './queries';
import { Link } from 'react-router-dom';

function Home() {
  const { loading, error, data } = useQuery(GET_EVENTS);

  if (loading || !data) {
    return (
      <div className="loading">
        <Spin size="middle" tip="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <List className="demo-loadmore-list" itemLayout="horizontal">
        {data.events.map((item, i) => (
          <List.Item key={i}>
            <List.Item.Meta title={<Link to={`/event/${item.id}`}>{item.title}</Link>} description={`${item.desc.substring(0, 400)}...`} />
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default Home;
