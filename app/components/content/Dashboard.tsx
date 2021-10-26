import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Header from '../Header';
import Chart from './Chart';
import { Stitch, UserPasswordCredential } from 'mongodb-stitch-browser-sdk'
import { useRealmApp, RealmAppProvider } from "../../RealmApp";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

// const rows = [
//   {"_id":"61780ee9a3b534cfbf7cad81","DeviceId":"Glucose1234","DeviceType":"Glocose Monitor","value":68.87,"DeviceDate":"2021-10-26 10:21:29.426603"},
//   {"_id":"61780ee9a3b534cfbf7cad81","DeviceId":"Glucose1234","DeviceType":"Glocose Monitor","value":68.87,"DeviceDate":"2021-10-26 10:21:29.426603"},
//   {"_id":"61780ee9a3b534cfbf7cad81","DeviceId":"Glucose1234","DeviceType":"Glocose Monitor","value":68.87,"DeviceDate":"2021-10-26 10:21:29.426603"},
//   {"_id":"61780ee9a3b534cfbf7cad81","DeviceId":"Glucose1234","DeviceType":"Glocose Monitor","value":68.87,"DeviceDate":"2021-10-26 10:21:29.426603"},
//   {"_id":"61780ee9a3b534cfbf7cad81","DeviceId":"Glucose1234","DeviceType":"Glocose Monitor","value":68.87,"DeviceDate":"2021-10-26 10:21:29.426603"},
// ];

export default function Dashboard({ client }) {

  const [data, setData] = useState<any[]>([])
  const app = useRealmApp()

  const refreshInterval = useRef<any | null>()

  useEffect(() => {
    refreshReadings()
    refreshInterval.current = setInterval(() => {
      refreshReadings()
    }, 10000)
    console.log(`id`, app.currentUser.id);
    
  }, [])

  const refreshReadings = () =>{
    axios.get(`/api/iot?limit=10&userId=${app.currentUser.id}`).then(response => {
      // axios.get(`/api/iot?DeviceId=${"Glucose1234"}&limit=10`).then(response => {
      console.log(`data`, response);
      setData(response.data.result);
    }).catch(error => {
      console.log(error.response)
    })
  }
  const chartsClient = useRealmApp();
  // const chartsClient = Stitch.initializeAppClient(client)
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Chart height={'300px'} width={'800px'} filter={{ "meta.UserId": app.currentUser.id}} chartId={'f5377be7-21f7-41b3-8ef5-01df1d4ef685'} client={chartsClient} />
      <Chart height={'300px'} width={'800px'} filter={{ "meta.UserId": app.currentUser.id}} chartId={'454bdb48-2b98-4f22-bd58-51110623ccf2'} client={chartsClient} />
      <Chart height={'300px'} width={'800px'} filter={{ "meta.UserId": app.currentUser.id}} chartId={'0188e15e-b5be-471f-9776-c694c2e76203'} client={chartsClient} />
      <TableContainer sx={{ m: 4 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Device Date</TableCell>
              <TableCell align="right">Device Id</TableCell>
              <TableCell align="right">Device Type</TableCell>
              <TableCell align="right">Measurement Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.DeviceDate}
                </TableCell>
                <TableCell align="right">{row.meta.DeviceId}</TableCell>
                <TableCell align="right">{row.meta.DeviceType}</TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>

        {/* <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }}>
                  Add user
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          No users for this project yet
        </Typography> */}
      </Paper>
    </Grid>


  );
}