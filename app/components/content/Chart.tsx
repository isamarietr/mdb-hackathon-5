import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK, { getRealmUserToken } from "@mongodb-js/charts-embed-dom";
import { useRealmApp, RealmAppProvider } from "../../RealmApp";

import { Stitch, UserPasswordCredential } from 'mongodb-stitch-browser-sdk'


const Chart = ({filter, chartId, height, width, client}) => {
  // const chartsClient = Stitch.initializeAppClient('iot_data-nkiiw')

  const app = useRealmApp()

  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-team-5-tyesn'});
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

// import ChartsEmbedSDK, { getRealmUserToken }from "@mongodb-js/charts-embed-dom";
// import { Stitch, UserPasswordCredential } from 'mongodb-stitch-browser-sdk'

// const client = Stitch.initializeAppClient(
//   'iot_data-nkiiw', // Optional: ~REPLACE~ with your Realm App ID
// );

// // function getUser() {
// //   return document.getElementById("username").value;
// // }

// // function getPass() {
// //   return document.getElementById("password").value;
// // }

// // function logOut() {
// //   document.body.classList.toggle("logged-in", false);
// // }

// // document
// //   .getElementById("login-page")
// //   .addEventListener("input", () => document.body.classList.toggle("error", false));

// // document
// //   .getElementById("loginButton")
// //   .addEventListener("click", () => tryLogin());

// // document
// //   .getElementById("logoutButton")
// //   .addEventListener("click", () => logOut());

// async function tryLogin() {
//   const credential = new UserPasswordCredential(getUser(), getPass())
//   client.auth.loginWithCredential(credential).then(() =>
//   {
//     const sdk = new ChartsEmbedSDK({
//       baseUrl: "https://charts.mongodb.com/charts-team-5-tyesn", // Optional: ~REPLACE~ with your Charts URL
//       getUserToken: () => getRealmUserToken(client),
//     });

//     const chart = sdk.createChart({
//       chartId: "f5377be7-21f7-41b3-8ef5-01df1d4ef685", // Optional: ~REPLACE~ with your Chart ID
//     });

//     chart.render(document.getElementById("chart"));
//     // document.body.classList.toggle("logged-in", true);

//   }).catch(err => {
//     console.error("Authentication failed. If you are using the pre-built sample, please use one of the listed email addresses and use 'password' as the password.")
//     document.body.classList.toggle("error", true);
//   });
// }