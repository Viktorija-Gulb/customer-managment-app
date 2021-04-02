import React from 'react';
import './App.scss';
import CustomerRegistration from './pages/CustomerRegistration';

function App() {
  return (
    <div className="App">
      <h1>Customer management app</h1>
      {/* <Form />
      <CustomerTable /> */}

      <CustomerRegistration />
    </div>
  );
}

export default App;
