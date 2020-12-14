import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { auth } from "../firebase";
import "react-toastify/dist/ReactToastify.css";
// import { useStateValue } from "../context/StateProvider";
// import { actionTypes } from "../context/reducer";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import LinearProgress from "@material-ui/core/LinearProgress";

//css with javascript
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

//login component
export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  // eslint-disable-next-line
  // const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const login = (e) => {
    setLoading(true);
    e.preventDefault();
    const unscribe = auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        setEmail("");
        setpassword("");
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        // dispatch({
        //   type: actionTypes.SET_USER,
        //   user: user.user,
        // });
        // history.push("/admin");
        setLoading(false);
      })
      .catch((err) => {
        toast.info(`${err.message}`);
        setLoading(false);
      });

    return () => {
      unscribe();
    };
  };

  localStorage.getItem("user") && history.push("/admin");

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {loading && <LinearProgress />}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!email || !password}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" variant="body2">
                  User Login
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Footer />
            </Box>
          </form>
        </div>
      </Grid>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Grid>
  );
}
