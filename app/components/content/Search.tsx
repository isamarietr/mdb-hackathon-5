import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import Header from '../Header';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function Search() {

  const [query, setQuery] = useState()
  const [results, setResults] = useState([])

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const onSubmit = async (event: any, page?: number) => {

    
    console.log(query);
    
    // if (!page) {
    //   setCurrPage(1)
    // }
    axios.get(`/api/search?query=${query}&limit=${10}`).then(response => {
    // axios.get(`/api/search?query=${query}&path=${searchPath}&page=${page ? page : 1}&limit=${searchLimit}&fuzzy=${isFuzzyMatch}`).then(response => {
      console.log(`data`, response);
      setResults(response.data.result);
    }).catch(error => {
      console.log(error.response)
    })
    if (event) {
      event.preventDefault();
    }
  }

  const onQueryChange = async (event: any) => {
    setQuery(event.target.value);
  }

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
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
              onChange={onQueryChange}
                fullWidth
                placeholder="Enter your search"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
              />
             
            </Grid>
            <Grid item>
            <Button variant="contained" onClick={onSubmit}>Search</Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {results.map(result => {
        return <Accordion key={result._id} expanded={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {result.Item}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{ result.vendor }</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Sugars: {result.Sugars}
          </Typography>
          <Typography>
          Total Fat: {result["Total Fat"]}
          </Typography>
          <Typography>
          Calories: {result.Calories}
          </Typography>
          <Typography>
          Calories: {result.Calories}
          </Typography>
          <Typography>
          Calories: {result.Calories}
          </Typography>
        </AccordionDetails>
      </Accordion>
      })}
     
    </Paper>
  );
}