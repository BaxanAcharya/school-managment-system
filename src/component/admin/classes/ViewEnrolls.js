import React from "react";
import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@material-ui/core";

import BackspaceIcon from "@material-ui/icons/Backspace";
import { db } from "../../../firebase";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function ViewEnrolls({ enrolls, id }) {
  const classes = useStyles();

  const deleteEnroll = async (eid) => {
    db.collection("users").doc(id).collection("enroll").doc(eid).delete();
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <h1 align="center">Enrolled Class</h1>
      <Grid container spacing={3}>
        {enrolls.map(({ data, id }, index) => (
          <Grid key={id} item sm={12} md={6} lg={4}>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="p" component="h2">
                  Class:{data.classname} Section : {data.section}
                  <br /> <br />
                  <p>
                    Enrolled Year:{" "}
                    {new Date(data.enrollDate?.toDate()).toUTCString()}
                  </p>
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    if (window.confirm("Are you sure???")) deleteEnroll(id);
                  }}
                >
                  <BackspaceIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewEnrolls;
