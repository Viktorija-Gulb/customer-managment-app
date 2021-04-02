import React from 'react';

const CustomerTable = () => {
  console.log('table');
  return (
    <div>
      <h2>table</h2>
      <table>
        <tr>
          <th>Full Name</th>
          <th>Email</th>
          <th>City</th>
          <th>Street</th>
          <th>House number</th>
          <th>Zip code</th>
          <th>Coordinates</th>
        </tr>
        <tr>
          <td>Alfreds Futterkiste</td>
          <td>Maria Anders</td>
          <td>Germany</td>
        </tr>
      </table>
    </div>
  );
};

export default CustomerTable;
