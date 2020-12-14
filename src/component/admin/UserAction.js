import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./ListItems";
import Footer from "../Footer";
import { db, storage } from "../../firebase";
import { red } from "@material-ui/core/colors";
import NoImage from "../../images/no-image.jpg";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BackspaceIcon from "@material-ui/icons/Backspace";
import EditIcon from "@material-ui/icons/Edit";
import PersonIcon from "@material-ui/icons/Person";
import {
  TextField,
  LinearProgress,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Button,
  FormControl,
  Input,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import bsCustomFileInput from "bs-custom-file-input";
import { Link } from "react-router-dom";

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

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
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
  fixedHeight: {
    height: 240,
  },
  rooted: {
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

export default function UserAction() {
  const [loading, setLoading] = useState(false);
  const [effect, setEffect] = useState(false);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [pname, setPname] = useState("");
  const [pcontact, setPcontact] = useState("");
  const [paddress, setPaddress] = useState("");
  const [petName, setPetName] = useState("");
  const [cn, setCn] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const [openPopup, setOpenup] = React.useState(false);
  const [id, setId] = React.useState("");

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const handleClickOpen = (id) => {
    db.collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        setAddress(doc.data().address);
        setCn(doc.data().cn);
        setContact(doc.data().contact);
        setDob(doc.data().dob);
        setEmail(doc.data().email);
        setFullName(doc.data().fullname);
        setGender(doc.data().gender);
        setPaddress(doc.data().paddress);
        setPassword(doc.data().password);
        setPcontact(doc.data().pcontact);
        setPetName(doc.data().petName);
        setPname(doc.data().pname);
        setType(doc.data().type);
      });
    setOpenup(true);
    setId(id);
  };

  const handleUpdate = () => {
    db.collection("users").doc(id).update({
      contact: contact,
      cn: cn,
      address: address,
      dob: dob,
      email: email,
      fullname: fullname,
      gender: gender,
      paddress: paddress,
      password: password,
      pcontact: pcontact,
      petName: petName,
      pname: pname,
      type: type,
    });
    setAddress("");
    setCn("");
    setContact("");
    setDob("");
    setEmail("");
    setFullName("");
    setGender("");
    setPaddress("");
    setPassword("");
    setPcontact("");
    setPetName("");
    setPname("");
    setType("");
    setOpenup(false);
  };

  const handleClose = () => {
    setOpenup(false);
  };

  useEffect(() => {
    var unsuscribe = null;

    if (!search) {
      unsuscribe = db
        .collection("users")
        .orderBy("joinedAt", "desc")
        .onSnapshot((snapshot) => {
          setUsers(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setEffect(true);
        });
    } else {
      unsuscribe = db
        .collection("users")
        .where("fullname", "==", search)
        .orderBy("joinedAt", "desc")
        .onSnapshot((snapshot) => {
          setUsers(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
          setEffect(true);
        });
    }
    return () => {
      unsuscribe();
    };
  }, [search]);

  const deleteUser = (id) => {
    setLoading(true);
    db.collection("users").doc(id).delete();
    setLoading(false);
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

    db.collection("users").doc(id).update({
      imageUrl: url,
    });
    setFile(null);
    setOpenup(false);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Users Action
            {loading && <LinearProgress />}
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {loading && <h1>Loading.....</h1>}
        <Typography
          variant="caption"
          style={{ marginTop: "10px" }}
          align="center"
        >
          <h3> No of Users: {users.length}</h3>
        </Typography>

        <Container maxWidth="lg" className={classes.container}>
          <TextField
            variant="outlined"
            label="Search by exact name"
            style={{ width: "100%" }}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            id="my-input-searchByname"
            aria-describedby="my-helper-text-searchByname"
          />
          <br />
          <br />
        </Container>
        <hr />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {effect ? (
              users.map(({ data, id }, index) => (
                <Grid key={index} item sm={12} md={6} lg={4}>
                  <Card className={classes.rooted}>
                    <CardHeader
                      avatar={
                        data.imageUrl ? (
                          <Avatar
                            alt={data.fullname}
                            src={data.imageUrl}
                            className={classes.avatar}
                          />
                        ) : (
                          <Avatar className={classes.avatar}>
                            <PersonIcon />
                          </Avatar>
                        )
                      }
                      title={`Fullname: ${data.fullname}`}
                      subheader={`Email :${data.email}`}
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
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <p>Address: {data.address}</p>
                        <p>Contact no: {data.contact}</p>
                        <p>Date of birth: {data.dob}</p>
                        <br />
                        <p>
                          Click the icon on the right for additional information
                        </p>
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton
                        onClick={() => {
                          if (window.confirm("Are you sure???")) deleteUser(id);
                        }}
                        aria-label="add to favorites"
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

                      <Link
                        style={{ textDecoration: "none", color: "inherit" }}
                        to={`/admin/enroll/${id}`}
                      >
                        Manage Enroll
                      </Link>

                      {/* Modal */}
                      <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={openPopup}
                      >
                        <DialogTitle
                          id="customized-dialog-title"
                          onClose={handleClose}
                        >
                          Update User Information
                        </DialogTitle>
                        <DialogContent dividers>
                          <FormControl>
                            <TextField
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                              }}
                              label="Email"
                              id="my-input-email"
                              type="email"
                              aria-describedby="my-helper-text"
                              variant="outlined"
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              label="FullName"
                              value={fullname}
                              onChange={(e) => {
                                setFullName(e.target.value);
                              }}
                              type="text"
                              id="my-input-fullname"
                              aria-describedby="my-helper-text-fullname"
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              label="Address"
                              value={address}
                              onChange={(e) => {
                                setAddress(e.target.value);
                              }}
                              type="text"
                              id="my-input-address"
                              aria-describedby="my-helper-text-address"
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              label="Contact No"
                              type="number"
                              value={contact}
                              onChange={(e) => {
                                setContact(e.target.value);
                              }}
                              id="my-input-contact"
                              aria-describedby="my-helper-text-contact"
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              id="date"
                              value={dob}
                              onChange={(e) => {
                                setDob(e.target.value);
                              }}
                              // label="Birthday"
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              value={pname}
                              onChange={(e) => {
                                setPname(e.target.value);
                              }}
                              label="Parent Name"
                              type="text"
                              id="my-input-pname"
                              aria-describedby="my-helper-text-pname"
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              label="Parent Address"
                              value={paddress}
                              onChange={(e) => {
                                setPaddress(e.target.value);
                              }}
                              type="text"
                              id="my-input-paddress"
                              aria-describedby="my-helper-text-paddress"
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              label="Parent Contact"
                              value={pcontact}
                              onChange={(e) => {
                                setPcontact(e.target.value);
                              }}
                              type="number"
                              id="my-input-pcontact"
                              aria-describedby="my-helper-text-pcontact"
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              label="Pet Name"
                              value={petName}
                              onChange={(e) => {
                                setPetName(e.target.value);
                              }}
                              type="text"
                              id="my-input-petname"
                              aria-describedby="my-helper-text-petname"
                            />
                          </FormControl>
                          <FormControl>
                            <TextField
                              variant="outlined"
                              label="Citizenship No"
                              value={cn}
                              onChange={(e) => {
                                setCn(e.target.value);
                              }}
                              type="text"
                              id="my-input-cn"
                              aria-describedby="my-helper-text-cn"
                            />
                          </FormControl>

                          <FormControl>
                            <TextField
                              variant="outlined"
                              label="Password"
                              value={password}
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                              type="password"
                              id="my-input-password"
                              aria-describedby="my-helper-text-password"
                            />
                          </FormControl>
                          <FormControl component="fieldset">
                            <RadioGroup
                              value={gender}
                              style={{ border: "0.1px solid #3f51b5" }}
                              onChange={(e) => {
                                setGender(e.target.value);
                              }}
                              row
                              aria-label="position"
                              name="position"
                              defaultValue="top"
                            >
                              <FormControlLabel
                                value="Male"
                                control={<Radio color="primary" />}
                                label="Male"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="Female"
                                control={<Radio color="primary" />}
                                label="Female"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="Others"
                                control={<Radio color="primary" />}
                                label="Others"
                                labelPlacement="top"
                              />
                            </RadioGroup>
                          </FormControl>

                          <FormControl component="fieldset">
                            <RadioGroup
                              style={{ border: "0.1px solid #3f51b5" }}
                              value={type}
                              row
                              aria-label="position"
                              name="position"
                              defaultValue="top"
                              onChange={(e) => {
                                setType(e.target.value);
                              }}
                            >
                              <FormControlLabel
                                value="Student"
                                control={<Radio color="primary" />}
                                label="Student"
                                labelPlacement="top"
                              />
                              <FormControlLabel
                                value="Staff"
                                control={<Radio color="primary" />}
                                label="Staff"
                                labelPlacement="top"
                              />
                            </RadioGroup>
                          </FormControl>
                          <FormControl>
                            <div className="custom-file">
                              <Input
                                id="inputGroupFile01"
                                type="file"
                                className="custom-file-input"
                                onChange={upload}
                              />
                              {!file && (
                                <p className="custom-file-label">
                                  Choose User Image
                                </p>
                              )}
                            </div>
                            {file ? (
                              <Button
                                variant="success"
                                onClick={uploadImage}
                                style={{
                                  marginRight: "25px",
                                  backgroundColor: "#3f51b5",
                                }}
                                type="submit"
                                className="btn-block"
                              >
                                Update User Image
                              </Button>
                            ) : null}
                          </FormControl>
                        </DialogContent>
                        <DialogActions>
                          <Button
                            disabled={
                              !email ||
                              !fullname ||
                              !address ||
                              !contact ||
                              !dob ||
                              !pname ||
                              !paddress ||
                              !pcontact ||
                              !petName ||
                              !password ||
                              !gender ||
                              !type
                            }
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

                      {/*  */}
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
                        <Typography paragraph>
                          <p>Parent Name: {data.pname}</p>
                          <p>Parent Address: {data.paddress}</p>
                          <p>Parent Contact No: {data.pcontact}</p>
                          <p>Pet Name: {data.petName}</p>
                          <p>
                            CitizenShip No: {data.cn ? data.cn : "Not provided"}
                          </p>
                          <p>Gender: {data.gender}</p>
                          <p>Type: {data.type}</p>
                          <p>Password: {data.password}</p>
                          <p>
                            Joined At:{" "}
                            {new Date(data.joinedAt?.toDate()).toUTCString()}
                          </p>
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item>
                <Card className={classes.rooted}>
                  <Skeleton variant="rect" width={1000} height={400} />
                </Card>
              </Grid>
            )}
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}
