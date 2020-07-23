import React, { useState, useEffect } from 'react';
import database from '../firebase';

const EditParcel = (props) => {
  const [parcel, setParcel] = useState({});
  const [flag, setFlag] = useState(false);

  let url = props.match.params.id;

  const handleChecked = (e) => {
    if (parcel.signedTime) setParcel({ ...parcel, signedTime: '' });
    else setParcel({ ...parcel, signedTime: new Date().toISOString() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    database
      .ref(`users/${url}`)
      .set({
        ...parcel,
      })
      .then(setFlag(!flag));
  };

  useEffect(() => {
    database
      .ref(`users/${url}`)
      .once('value')
      .then((snapshot) => {
        setParcel(snapshot.val());
      });
  }, [flag]);

  console.log(parcel);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Barcode
          <p>{parcel.barCode}</p>
        </label>
        <label>
          First Name
          <input
            type="text"
            defaultValue={parcel.firstName}
            onChange={(e) =>
              setParcel({ ...parcel, firstName: e.currentTarget.value })
            }
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            defaultValue={parcel.lastName}
            onChange={(e) =>
              setParcel({ ...parcel, firstName: e.currentTarget.value })
            }
          />
        </label>
        <label>
          Received
          <input
            type="checkbox"
            checked={parcel.signedTime ? true : false}
            onChange={handleChecked}
          />
        </label>
        <button>update</button>
      </form>
    </div>
  );
};

export default EditParcel;
