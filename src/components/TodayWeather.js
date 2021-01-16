import { Grid, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  img: {
    height: "70%",
    width: "70%",
    display: "block",
    margin: "auto",
    marginTop: "",
  },
}));

export default function TodayWeather({ todayWeatherInfo, locationInfo }) {
  console.log("todayWeatherInfo", todayWeatherInfo);
  const {
    weather_state_abbr,
    weather_state_name,
    min_temp,
    max_temp,
    wind_speed,
    applicable_date,
  } = todayWeatherInfo;
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography gutterBottom variant="h1" component="h1" align="center">
            {locationInfo.title}
          </Typography>
          <Typography gutterBottom variant="h3" component="p" align="center">
            {applicable_date}
          </Typography>
          <Typography
            gutterBottom
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
            {`${Math.round(min_temp)}°C`}
          </Typography>
          <Typography
            variant="h3"
            color="textSecondary"
            component="p"
            align="center"
          >
            {`${Math.round(max_temp)}°C`}
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
