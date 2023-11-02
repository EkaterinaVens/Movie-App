// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Tabs } from 'antd';
import './tabs.css';

function TabsHeader() {
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'Search',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'Rated',
      children: 'Content of Tab Pane 2',
    },
  ];
  return (
    <Tabs defaultActiveKey="1" centered items={items} onChange={onChange} />
  );
}

export default TabsHeader;
