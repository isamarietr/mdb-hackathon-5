import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK, { getRealmUserToken } from "@mongodb-js/charts-embed-dom";

const Chart = ({filter, chartId, height, width, client}) => {

  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-team-5-tyesn', getUserToken: () => getRealmUserToken(client)});
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: height, width: width, theme: "dark"}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  return <div className="chart" ref={chartDiv}/>;
};

export default Chart;