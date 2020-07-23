import React, { useState, useEffect } from 'react';
import database from '../firebase';
import ListItem from './listItem';
import { Table } from 'antd';

const columns = [
  {
    title: 'BarCode',
    dataIndex: 'barCode',
    key: 'barcode',
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
  },
  {
    title: 'Recevied',
    key: 'signedTime',
    render: (parcel) => {
      return parcel.signedTime.length > 0 ? 'recived' : 'ready for pick';
    },
    sorter: (a, b) => a.signedTime.length - b.signedTime.length,
    sortDirections: ['descend', 'ascend'],
  },
];

const ParcelList = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [parcelList, setParcelList] = useState([]);
  const [searched, setSearched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearched(!searched);
    setSubmitted(true);
    database
      .ref('users')
      .once('value')
      .then((snapshot) => {
        let list = [];
        snapshot.forEach((parcel) => {
          parcel.val().firstName.toUpperCase() === firstName.toUpperCase() &&
            parcel.val().lastName.toUpperCase() === lastName.toUpperCase() &&
            list.push({
              id: parcel.key,
              ...parcel.val(),
            });
        });
        setParcelList(list);
      });
  };

  useEffect(() => {
    console.log('running');
  }, [searched]);

  console.log(parcelList);

  return (
    <div>
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
            />
          </div>
          <button>Search</button>
        </form>
      </div>
      <div>
        <Table columns={columns} dataSource={parcelList} />
      </div>
    </div>
  );
};

export default ParcelList;
