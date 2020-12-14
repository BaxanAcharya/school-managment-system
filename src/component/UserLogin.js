import React, { useState, useEffect } from "react";
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
import { db } from "../firebase";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import ViewNews from "./ViewNews";

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
export default function UserLogin() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    const unsuscribe = db
      .collection("users")
      .where("email", "==", email)
      .where("password", "==", password)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length === 0) {
          toast.dark("Email or password do not match");
        } else {
          // eslint-disable-next-line
          snapshot.docs.map((user) => {
            localStorage.setItem("id", user.id);
            setEmail("");
            setpassword("");
          });
        }
      });
    return () => {
      unsuscribe();
    };
  };

  localStorage.getItem("id") && history.push("/student");

  const [news, setNews] = useState([]);
  useEffect(() => {
    const unsuscribe = db
      .collection("news")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setNews(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    return () => {
      unsuscribe();
    };
  }, []);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
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
                <Link to="/global/login" variant="body2">
                  Admin Login
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Footer />
            </Box>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={4} md={7}>
        <ViewNews news={news} user={true} />
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
