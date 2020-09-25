import React from "react";
import USLineChart from "./usLineChart";

function UsData() {
  return (
    <div>
      <p>Here is the US data</p>
      <USLineChart timeframe="daily" />
    </div>
  );
}

export default UsData;
