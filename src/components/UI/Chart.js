import React, { useEffect, useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';
import { ConvertNumber } from '../util/function';
import FeatherIcon from 'feather-icons-react';

const Chart = (props) => {

  const CustomTooltip = ({ payload, label, active }) => {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`Week of ${moment(new Date(label)).format("MMM DD, YYYY")}`}</p>
          <p className="label"><b><FeatherIcon icon="git-commit" size={20} style={{ verticalAlign: "text-top", marginRight: "5px" }} />{`${payload[0]?.payload?.name} ${JSON.stringify(payload[0].value)} commits`}</b></p>
        </div>
      );
    }

    return null;
  }

  return (<>
    <LineChart width={600} height={500} data={props?.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      {props?.data?.map((item, i) =>
        <Line key={i} type="monotone" data={item} dataKey="commit" stroke={item.color} activeDot={{ r: 8 }} />
      )}
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip
        content={<CustomTooltip />}
      />
    </LineChart>
  </>)
}

export default Chart;