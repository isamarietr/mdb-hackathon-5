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

const rows = [
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
];

export default function Dashboard({client}) {
  
  const chartsClient = useRealmApp();
  // const chartsClient = Stitch.initializeAppClient(client)
  return (
    <Grid container spacing={2} alignItems="center">
      <Chart height={'600px'} width={'800px'} filter={null} chartId={'f5377be7-21f7-41b3-8ef5-01df1d4ef685'} client={chartsClient} />
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Field1</TableCell>
            <TableCell align="right">Field2</TableCell>
            <TableCell align="right">Field3</TableCell>
            <TableCell align="right">Field4</TableCell>
            <TableCell align="right">Field5</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={'fieldvalue'}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {'fieldvalue'}
              </TableCell>
              <TableCell align="right">{row.field1}</TableCell>
              <TableCell align="right">{row.field2}</TableCell>
              <TableCell align="right">{row.field3}</TableCell>
              <TableCell align="right">{row.field4}</TableCell>
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