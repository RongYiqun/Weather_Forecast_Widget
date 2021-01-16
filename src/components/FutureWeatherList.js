import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import FutureWeather from "./FutureWeather";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function FutureWeatherList({ weatherInfo }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={3}>
          <FutureWeather dayWeatherInfo={weatherInfo[0]} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FutureWeather dayWeatherInfo={weatherInfo[1]} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FutureWeather dayWeatherInfo={weatherInfo[2]} />
        </Grid>
        <Grid item xs={6} sm={3}>
          <FutureWeather dayWeatherInfo={weatherInfo[3]} />
        </Grid>
      </Grid>
    </div>
  );
}
