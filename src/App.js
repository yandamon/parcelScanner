import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ParcelList from './components/parcelList';
import ViewOrder from './components/viewOrder';
import EditParcel from './components/editParcel';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact={true} component={ParcelList} />
        <Route path="/orders" component={ViewOrder} />
        <Route path="/edit/:id" component={EditParcel} />
      </Switch>
    </Router>
  );
}

export default App;
