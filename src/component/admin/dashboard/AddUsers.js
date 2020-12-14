import React, { useState, useEffect } from "react";
import firebase from "firebase";
import {
  FormControl,
  Input,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { db, storage } from "../../../firebase";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bsCustomFileInput from "bs-custom-file-input";

function AddUsers() {
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
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bsCustomFileInput.init();
  }, []);

  const upload = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadImage = async (e) => {
    setLoading(true);
    e.preventDefault();
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImageUrl(await fileRef.getDownloadURL());
    setLoading(false);
  };

  const addUser = (e) => {
    e.preventDefault();
    db.collection("users")
      .where("email", "==", email)
      .onSnapshot((snapshot) => {
        if (snapshot.docs.length === 0) {
          db.collection("users")
            .add({
              email: email,
              fullname: fullname,
              address: address,
              contact: contact,
              dob: dob,
              pname: pname,
              pcontact: pcontact,
              paddress: paddress,
              petName: petName,
              password: password,
              cn: cn,
              gender: gender,
              type: type,
              joinedAt: firebase.firestore.FieldValue.serverTimestamp(),
              imageUrl: imageUrl,
            })
            .then(() => {
              setEmail("");
              setFullName("");
              setAddress("");
              setContact("");
              setDob("");
              setPname("");
              setPcontact("");
              setPaddress("");
              setPetName("");
              setCn("");
              setPassword("");
              setGender("");
              setType("");
              setImageUrl("");
            })
            .catch((err) => {
              alert(err.message);
            });
        } else {
          // alert("User alerady exist with same email");
        }
      });
  };
  return (
    <div>
      {loading && <LinearProgress />}
      <form>
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
            {!file && <p className="custom-file-label">Choose User Image</p>}
          </div>
          {file ? (
            <Button
              variant="success"
              onClick={uploadImage}
              style={{ marginRight: "25px", backgroundColor: "#3f51b5" }}
              type="submit"
              className="btn-block"
            >
              Upload News Image
            </Button>
          ) : null}
        </FormControl>
        <Button
          type="submit"
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
          onClick={addUser}
          style={{
            backgroundColor: "#3f51b5",
          }}
        >
          Add User
        </Button>
      </form>
    </div>
  );
}

export default AddUsers;
