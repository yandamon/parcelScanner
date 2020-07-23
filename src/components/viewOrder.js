import React, { useState, useEffect } from 'react';
import database from '../firebase';
import ListItem from './listItem';
import EditParcel from './editParcel';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'BarCode',
    key: 'barcode',
    render: ({ barCode, id }) => {
      return <Link to={`edit/${id}`}> {barCode} </Link>;
    },
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    key: 'lastName',
    sorter: (a, b) => a.address.length - b.address.length,
    sortDirections: ['descend', 'ascend'],
  },
  {
    title: 'Recevied',
    key: 'signedTime',
    render: ({ signedTime, firstName }) => {
      if (signedTime.length > 0 && firstName) return 'recevied';
      else if (!signedTime.length > 0 && firstName) return 'ready for pcik';
      else return 'not ready';
    },
    sorter: (a, b) => a.signedTime.length - b.signedTime.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const filterOrder = (parcel, rule) => {
  if (rule === 'not_reocrd') return !parcel.signedTime && !parcel.firstName;
  else if (rule === 'recorded') return !parcel.signedTime && parcel.firstName;
  else if (rule === 'received') return parcel.signedTime && parcel.firstName;
  return false;
};

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('not_reocrd');

  useEffect(() => {
    database
      .ref('users')
      .once('value')
      .then((snapshot) => {
        let list = [];
        snapshot.forEach((parcel) => {
          filterOrder(parcel.val(), filter) &&
            list.push({
              id: parcel.key,
              ...parcel.val(),
            });
        });
        setOrders(list);
      });
  }, [filter]);

  console.log(orders);

  return (
    <div>
      <div>
        <h1>Search Orders</h1>
        <select onChange={(e) => setFilter(e.currentTarget.value)}>
          <option value="not_reocrd">NOT RECORD YET</option>
          <option value="recorded">RECORDED</option>
          <option value="received">ASSIGNED</option>
        </select>
      </div>

      <div>
        <Table columns={columns} dataSource={orders} />
      </div>
    </div>
  );
};

export default ViewOrder;
