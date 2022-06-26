import { useQuery } from '@apollo/client';
import { List, Spin } from 'antd';
import { GET_EVENTS } from './queries';

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
            <List.Item.Meta title={item.title} description={item.desc} />
          </List.Item>
        ))}
      </List>
    </div>
  );
}

export default Home;
