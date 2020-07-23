import React from 'react';
import { Link } from 'react-router-dom';

const ListItem = (parcel) => (
  <div>
    <Link to={`edit/${parcel.detail.id}`}>
      <div>{parcel.detail.barCode}</div>
    </Link>
    <div>{parcel.detail.firstName}</div>
    <div>{parcel.detail.lastName}</div>
    {parcel.detail.signedTime ? (
      <div>received</div>
    ) : (
      <div>not assigned yet</div>
    )}
  </div>
);

export default ListItem;
