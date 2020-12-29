import React from "react";
import USComposedChart from "./usChart";

function UsData() {
  return (
    <div>
      {/* <p className="text-white container mx-auto px-2 sm:px-4">
        Here is the US data
      </p> */}
      <USComposedChart timeframe="daily" />
      {/* <div className="px-16 flex flex-wrap">
        <h2>Table</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>New Tests</th>
              <th>Cases</th>
              <th>Negative PCR Test</th>
              <th>Currently hopitalized</th>
              <th>Deaths</th>
              <th>Total Test Results</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}

export default UsData;