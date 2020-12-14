import React from "react";
import {
  FormControl,
  Button,
  makeStyles,
  Select,
  InputLabel,
  MenuItem,
  LinearProgress,
} from "@material-ui/core";
import { db } from "../../../firebase";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function AddClass() {
  const classes = useStyles();
  const [myclass, setClass] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [sectionOpen, setSectionOpen] = React.useState(false);
  const [mySection, setmySection] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleChange = (event) => {
    setClass(event.target.value);
  };

  const handleChangeSection = (e) => {
    setmySection(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSection = () => {
    setSectionOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenSection = () => {
    setSectionOpen(true);
  };

  const addClass = (e) => {
    e.preventDefault();
    setLoading(true);
    const unsuscribe = db
      .collection("class")
      .where("class", "==", myclass)
      .where("section", "==", mySection)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length === 0) {
          db.collection("class").add({
            class: myclass,
            section: mySection,
          });
          setLoading(false);
          setmySection("");
          setClass("");
          alert("Class added");
        } else {
          setLoading(false);
          setmySection("");
          setClass("");
        }
      });

    return () => {
      unsuscribe();
    };
  };

  return (
    <div>
      {loading && <LinearProgress />}
      <form>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">Class</InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={myclass}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"PG"}>PG</MenuItem>
            <MenuItem value={"NURSERY"}>NURSERY</MenuItem>
            <MenuItem value={"KG"}>KG</MenuItem>
            <MenuItem value={"ONE"}>1</MenuItem>
            <MenuItem value={"TWO"}>2</MenuItem>
            <MenuItem value={"THREE"}>3</MenuItem>
            <MenuItem value={"FOUR"}>4</MenuItem>
            <MenuItem value={"FIVE"}>5</MenuItem>
            <MenuItem value={"SIX"}>6</MenuItem>
            <MenuItem value={"SEVEN"}>7</MenuItem>
            <MenuItem value={"EIGHT"}>8</MenuItem>
            <MenuItem value={"NINE"}>9</MenuItem>
            <MenuItem value={"TEN"}>10</MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label1">
            Section
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label1"
            id="demo-controlled-open-select"
            open={sectionOpen}
            onClose={handleCloseSection}
            onOpen={handleOpenSection}
            value={mySection}
            onChange={handleChangeSection}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"C"}>C</MenuItem>
            <MenuItem value={"D"}>D</MenuItem>
            <MenuItem value={"E"}>E</MenuItem>
            <MenuItem value={"F"}>F</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          disabled={!myclass || !mySection}
          onClick={addClass}
          style={{
            backgroundColor: "#3f51b5",
            marginTop: "5px",
            marginLeft: "25px",
          }}
        >
          Add Class
        </Button>
      </form>
    </div>
  );
}

export default AddClass;
