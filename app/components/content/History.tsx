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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function History() {
    
  const [data, setData ] = useState<any[]>([])

  useEffect(() => {
    axios.get(`/api/iot?limit=-1`).then(response => {
      console.log(`data`, response);
      setData(response.data.result);
    }).catch(error => {
      console.log(error.response)
    })
  }, [])

  return (
    <Grid container spacing={2} alignItems="center">
            <TableContainer component={Paper}>
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
    </Grid>
  );
}