import React from 'react';

import { Avatar, List, Skeleton } from 'antd';

const data = [
  {
    gender: 'female',
    name: {
      title: 'Miss',
      first: 'Carolina',
      last: 'Casper',
    },
    email: 'carolina.casper@example.com',
    picture: {
      large: 'https://randomuser.me/api/portraits/women/56.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/56.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/56.jpg',
    },
    nat: 'DE',
  },
  {
    gender: 'female',
    name: {
      title: 'Miss',
      first: 'Carolina',
      last: 'Casper',
    },
    email: 'carolina.casper@example.com',
    picture: {
      large: 'https://randomuser.me/api/portraits/women/56.jpg',
      medium: 'https://randomuser.me/api/portraits/med/women/56.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/women/56.jpg',
    },
    nat: 'DE',
  },
];

function Home() {
  return (
    <div>
      <List
        className="demo-loadmore-list"
        loading={false}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name?.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Home;
