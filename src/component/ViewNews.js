import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  IconButton,
  makeStyles,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Collapse,
  Button,
  TextField,
  FormControl,
  Input,
} from "@material-ui/core";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import BackspaceIcon from "@material-ui/icons/Backspace";
import EditIcon from "@material-ui/icons/Edit";
import { db, storage } from "../firebase";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NoImage from "../images/no-image.jpg";
import AssignmentIcon from "@material-ui/icons/Announcement";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import bsCustomFileInput from "bs-custom-file-input";

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

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

// -----------------------------------------------

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
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function ViewNews({ news, user }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [id, setId] = useState("");

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const deleteNews = (id) => {
    db.collection("news").doc(id).delete();
  };

  //----------------------

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (id) => {
    db.collection("news")
      .doc(id)
      .get()
      .then((doc) => {
        setTitle(doc.data().title);
        setDescription(doc.data().description);
      });
    setOpen(true);
    setId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdate = () => {
    db.collection("news").doc(id).update({
      title: title,
      description: description,
    });

    setTitle("");
    setDescription("");
    setOpen(false);
  };

  const upload = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    var url = await fileRef.getDownloadURL();

    db.collection("news").doc(id).update({
      imageUrl: url,
    });
    setFile(null);
    // setImageUrl("");
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      {!user && (
        <h4 align="center">
          No of news: <strong>{news.length}</strong>
        </h4>
      )}

      <br />
      <Grid container spacing={3}>
        {news.map(({ data, id }, index) => (
          <Grid key={id} item sm={12} md={6} lg={`${!user ? 4 : 6}`}>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  data.imageUrl ? (
                    <Avatar
                      alt={data.title}
                      src={data.imageUrl}
                      className={classes.avatar}
                    />
                  ) : (
                    <Avatar className={classes.avatar}>
                      <AssignmentIcon />
                    </Avatar>
                  )
                }
                title={data.title}
                subheader={new Date(data.createdAt).toUTCString()}
              />
              {data?.imageUrl ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={`${data.imageUrl}`}
                >
                  <CardMedia
                    className={classes.media}
                    image={`${data.imageUrl}`}
                    title={data.title}
                  />
                </a>
              ) : (
                <CardMedia
                  className={classes.media}
                  image={NoImage}
                  title={data.title}
                />
              )}

              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  Click the icon on the right to see full news
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  aria-label="add to favorites"
                  onClick={() => {
                    if (window.confirm("Are you sure???")) deleteNews(id);
                  }}
                >
                  <BackspaceIcon />
                </IconButton>
                <IconButton
                  onClick={() => {
                    handleClickOpen(id);
                  }}
                  aria-label="share"
                >
                  <EditIcon />
                </IconButton>
                {/* -------------------------- */}
                <Dialog
                  onClose={handleClose}
                  aria-labelledby="customized-dialog-title"
                  open={open}
                >
                  <DialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                  >
                    Update News
                  </DialogTitle>
                  <DialogContent dividers>
                    <FormControl>
                      <TextField
                        multiline
                        rows={4}
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                        }}
                        // id="outlined-basic-1"
                        label="Title"
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl>
                      <TextField
                        // id="outlined-multiline-static-1"
                        label="Description"
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                        }}
                        multiline
                        rows={4}
                        variant="outlined"
                      />
                    </FormControl>
                    <FormControl>
                      <div className="custom-file">
                        <Input
                          style={{ border: "2px solid #3f51b5" }}
                          // id="inputGroupFile02"
                          type="file"
                          className="custom-file-input"
                          onChange={upload}
                        />
                        {!file && (
                          <p className="custom-file-label">Choose User Image</p>
                        )}
                      </div>
                      {file ? (
                        <Button
                          variant="success"
                          onClick={uploadImage}
                          style={{ backgroundColor: "#3f51b5" }}
                          type="submit"
                          className="btn-block"
                        >
                          Update News Image
                        </Button>
                      ) : null}
                    </FormControl>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      disabled={!title || !description}
                      style={{ background: "#3f51b5", color: "white" }}
                      autoFocus
                      onClick={() => {
                        handleUpdate();
                      }}
                      color="primary"
                    >
                      Save changes
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* --------------------------------- */}
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>{data.description}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default ViewNews;
