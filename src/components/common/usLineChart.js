import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DateTime } from "luxon";

function USLineChart({ timeframe }) {
  const [totalCases, setTotalCases] = useState(null);
  const [selectedType, setSelectedType] = useState("newCases");

  const today = DateTime.local().minus({ day: 1 }).toFormat("LLL d");
  useEffect(() => {
    async function fetchTotals() {
      try {
        const data = await axios.get(
          `https://api.covidtracking.com/v1/us/${timeframe}.json`
        );

        data.data.forEach((item) => {
          item.date = DateTime.fromISO(item.date).toFormat("LLL d");
        });
        setTotalCases(data.data);
      } catch (error) {
        console.log("error fetching api data: ", error);
      }
    }

    fetchTotals();
  }, [timeframe]);

  //   const handleChange = (e) => {
  //     // e.preventDefault();
  //     console.log("selected state: ", e.target.value);
  //     setSelectedState(e.target.value);
  //   };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <div className="flex flex-col items-center px-12 my-12 ">
      <div className="p-12">
        <div>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="newCases">New Cases</option>
            <option value="newDeaths">New Deaths</option>
          </select>
        </div>
      </div>

      {totalCases ? <h1>New Positive Cases in US</h1> : "nothing to see here"}
      {totalCases && (
        <ResponsiveContainer width="99%" height={300} className="bg-gray-300">
          <LineChart
            width={500}
            height={500}
            data={totalCases}
            margin={{
              top: 10,
              right: 0,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              reversed
              dataKey="date"
              interval="preserveStartEnd"
              ticks={[
                // "Mar 4",
                "Apr 1",
                "May 1",
                "Jun 1",
                "Jul 1",
                "Aug 1",
                "Sep 1",
                today,
              ]}
            />
            <YAxis domain={["dataMin", "dataMax"]} />
            <Tooltip
              itemStyle={{ color: "purple" }}
              wrapperStyle={{ backgroundColor: "pink", color: "black" }}
              isAnimationActive={false}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey={
                selectedType === "newCases"
                  ? "positiveIncrease"
                  : "deathIncrease"
              }
              name={
                selectedType === "newCases"
                  ? `New Cases in the US`
                  : `New Deaths in the US`
              }
              stroke="#88844d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default USLineChart;
