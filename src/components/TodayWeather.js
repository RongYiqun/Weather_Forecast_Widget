import { Grid, Typography, makeStyles } from "@material-ui/core";
import { formateDate } from "../util";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    maxHeight: "350px",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  img: {
    height: "65%",
    width: "65%",
    display: "block",
    margin: "auto",
  },
}));

export default function TodayWeather({ todayWeatherInfo, locationInfo }) {
  console.log("todayWeatherInfo", todayWeatherInfo);
  console.log("locationInfo", locationInfo);
  const {
    weather_state_abbr,
    weather_state_name,
    min_temp,
    max_temp,
    wind_speed,
    applicable_date,
  } = todayWeatherInfo;
  const classes = useStyles();

  const formateLocation = () => {
    const parentTitle = locationInfo?.parent?.title;
    if (parentTitle) {
      return locationInfo.title + "," + parentTitle;
    } else {
      return locationInfo.title;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography
            variant="h4"
            component="p"
            align="center"
            color="textSecondary"
          >
            {formateDate(applicable_date)}
          </Typography>
          <Typography variant="h3" component="p" align="center">
            {formateLocation()}
          </Typography>
          <Typography
            variant="h3"
            component="p"
            color="textSecondary"
            align="center"
          >
            {weather_state_name}
          </Typography>
          <Typography
            variant="h3"
            color="textSecondary"
            component="p"
            align="center"
          >
            {`${Math.round(min_temp)}°C`} ~ {`${Math.round(max_temp)}°C`}
          </Typography>
          <Typography
            variant="h3"
            color="textSecondary"
            component="p"
            align="center"
          >
            {`Wind: ${Math.round(wind_speed)}km/h`}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img
            alt="weather_state_abbr"
            className={classes.img}
            src={`/weatherIcons/${weather_state_abbr}.svg`}
          />
        </Grid>
      </Grid>
    </div>
  );
}
