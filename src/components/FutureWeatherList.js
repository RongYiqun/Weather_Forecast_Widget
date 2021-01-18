import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import FutureWeather from "./FutureWeather";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(0),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function FutureWeatherList({ weatherInfo }) {
  const classes = useStyles();
  const dayWeatherInfoList = weatherInfo.slice(0, 4);
  return (
    <Grid container spacing={3} className={classes.root}>
      {dayWeatherInfoList.map((dayWeatherInfo) => (
        <Grid item xs={6} sm={3} key={dayWeatherInfo.id}>
          <FutureWeather dayWeatherInfo={dayWeatherInfo} />
        </Grid>
      ))}
    </Grid>
  );
}
