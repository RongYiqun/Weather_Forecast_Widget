import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import { formateDate } from "../util";

const useStyles = makeStyles({
  img: {
    height: "50%",
    width: "50%",
    display: "block",
    margin: "auto",
  },
});

export default function FutureWeather({ dayWeatherInfo }) {
  const classes = useStyles();
  const {
    weather_state_abbr,
    weather_state_name,
    min_temp,
    max_temp,
    wind_speed,
    applicable_date,
  } = dayWeatherInfo;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2" align="center">
          {formateDate(applicable_date)}
        </Typography>
      </CardContent>
      <CardMedia>
        <img
          alt={`weather status ${weather_state_abbr}`}
          className={classes.img}
          src={`/weatherIcons/${weather_state_abbr}.svg`}
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h5" component="h2" align="center">
          {weather_state_name}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          align="center"
        >
          {`${Math.round(min_temp)}°C ~ ${Math.round(max_temp)}°C`}
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          align="center"
        >
          {`Wind: ${Math.round(wind_speed)}km/h`}
        </Typography>
      </CardContent>
    </Card>
  );
}
