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

const rows = [
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
  { field1: 'data1', field2: 'data1', field3: 6.0,  field4: 24, field5: 4.0 },
];

export default function History() {
  return (
    <Grid container spacing={2} alignItems="center">
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
    </Grid>
  );
}