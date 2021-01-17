import { CircularProgress, makeStyles, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  top: {
    color: "#1a90ff",
    animationDuration: "550ms",
    position: "absolute",
    marginTop: theme.spacing(10),
    display: "block",
    margin: "auto",
  },
  circle: {
    strokeLinecap: "round",
  },
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <CircularProgress
        variant="indeterminate"
        color="secondary"
        disableShrink
        className={classes.top}
        classes={{
          circle: classes.circle,
        }}
        size={200}
        thickness={4}
      />
    </Container>
  );
}
