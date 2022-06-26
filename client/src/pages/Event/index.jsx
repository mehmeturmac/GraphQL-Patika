import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Spin, Divider } from 'antd';
import { GET_EVENT } from './queries';

function Event() {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: {
      id,
    },
  });

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
      <h2>{data.event.title}</h2>
      <p>{data.event.desc}</p>

      <span style={{ float: 'left', paddingLeft: '50px' }}>
        <b>Date:</b> {data.event.date}
      </span>
      <span style={{ float: 'right', paddingRight: '50px' }}>
        <b>Time:</b> {data.event.from}-{data.event.to}
      </span>
      <Divider>⮟ Location: {data.event.location.name} ⮟ </Divider>
      <p>{data.event.location.desc}</p>
    </div>
  );
}

export default Event;
