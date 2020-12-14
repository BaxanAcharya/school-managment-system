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
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  withStyles,
} from "@material-ui/core";

import BackspaceIcon from "@material-ui/icons/Backspace";
import { db } from "../../../firebase";
import firebase from "firebase";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

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

function ViewClass({
  myclasses,
  showDelete,
  enroll,
  showEnroll,
  classDisplay,
}) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [subjet, setSubject] = React.useState("");
  const [classid, setClassID] = React.useState("");
  const [allSubjects, setAllSubjects] = React.useState([]);

  const handleClickOpen = (id) => {
    setOpen(true);
    setClassID(id);
    var unsuscribe = null;
    if (id) {
      unsuscribe = db
        .collection("class")
        .doc(id)
        .collection("subject")
        .orderBy("addedAt", "desc")
        .onSnapshot((snapshot) => {
          setAllSubjects(
            snapshot.docs.map((doc) => ({
              sid: doc.id,
              data: doc.data(),
            }))
          );
        });
      return () => {
        unsuscribe();
      };
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAllSubjects([]);
  };

  const addSubject = () => {
    const unsuscribe = db
      .collection("class")
      .doc(classid)
      .collection("subject")
      .where("name", "==", subjet)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length === 0) {
          db.collection("class").doc(classid).collection("subject").add({
            name: subjet,
            addedAt: firebase.firestore.FieldValue.serverTimestamp(),
          });
          alert("Subject Added");
        }
      });

    // setOpen(false);
    setSubject("");
    return () => {
      unsuscribe();
    };
  };

  const deleteSubject = (sid, id) => {
    db.collection("class").doc(id).collection("subject").doc(sid).delete();
  };

  const deleteClass = (id) => {
    db.collection("class").doc(id).delete();
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <h4 align="center">
        {showDelete && (
          <>
            No of Classes: <strong>{myclasses.length}</strong>
          </>
        )}
      </h4>
      <br />
      <Grid container spacing={3}>
        {myclasses.map(({ data, id }, index) => (
          <Grid key={id} item sm={12} md={6} lg={4}>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="p" component="h2">
                  Class: {data.class} Section :{data.section}
                </Typography>
              </CardContent>
              <CardActions>
                {showDelete ? (
                  <IconButton
                    aria-label="add to favorites"
                    onClick={() => {
                      if (window.confirm("Are you sure???")) deleteClass(id);
                    }}
                  >
                    <BackspaceIcon />
                  </IconButton>
                ) : showEnroll ? (
                  <Button
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      enroll(id, data.class, data.section);
                    }}
                  >
                    {" "}
                    Enroll
                  </Button>
                ) : (
                  <p>Already Enrolled Cannot Enroll again</p>
                )}

                {!showDelete ? null : (
                  <Button
                    style={{ textTransform: "none" }}
                    onClick={() => {
                      handleClickOpen(id);
                    }}
                  >
                    Add/View Subject
                  </Button>
                )}

                {/* -------------------------- */}
                <Dialog
                  // onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    Add/View Subject for Class
                  </DialogTitle>
                  <DialogContent dividers>
                    <FormControl>
                      <TextField
                        value={subjet}
                        onChange={(e) => {
                          setSubject(e.target.value);
                        }}
                        // id="outlined-basic-subject"
                        label="Subject Name"
                        variant="outlined"
                      />
                    </FormControl>
                    <br />
                    No of subjects: <strong>{allSubjects.length}</strong>
                    <hr />
                    <br />
                    {allSubjects.map(({ data, sid }, index) => (
                      <>
                        <p key={id}>
                          <strong>{data.name}</strong>{" "}
                          <Button
                            style={{ background: "#3f51b5", color: "white" }}
                            onClick={() => {
                              if (window.confirm("Are you sure???"))
                                deleteSubject(sid, id);
                            }}
                          >
                            Delete Class
                          </Button>
                        </p>
                        <br />
                      </>
                    ))}
                  </DialogContent>
                  <DialogActions>
                    <Button
                      disabled={!subjet}
                      style={{ background: "#3f51b5", color: "white" }}
                      autoFocus
                      onClick={addSubject}
                      color="primary"
                    >
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewClass;
