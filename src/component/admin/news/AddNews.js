import React, { useState, useEffect } from "react";
import firebase from "firebase";
import {
  FormControl,
  Input,
  Button,
  TextField,
  LinearProgress,
} from "@material-ui/core";
import { db, storage } from "../../../firebase";
import "react-toastify/dist/ReactToastify.css";
import bsCustomFileInput from "bs-custom-file-input";

function AddNews() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    setFile(null);
    setLoading(false);
  };

  const addNews = (e) => {
    e.preventDefault();
    db.collection("news")
      .add({
        title: title,
        description: description,
        author: "Admin",
        imageUrl: imageUrl,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setTitle("");
        setDescription("");
        setImageUrl("");
        alert("News added");
      })
      .catch((err) => {
        alert(err.messsage);
      });
  };

  return (
    <div>
      {loading && <LinearProgress />}
      <form>
        <FormControl>
          <TextField
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
        </FormControl>
        <FormControl>
          <TextField
            id="outlined-multiline-static"
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
              id="inputGroupFile02"
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
              style={{ backgroundColor: "#3f51b5" }}
              type="submit"
              className="btn-block"
            >
              Upload News Image
            </Button>
          ) : null}
        </FormControl>
        <Button
          type="submit"
          disabled={!title || !description}
          onClick={addNews}
          style={{
            backgroundColor: "#3f51b5",
            marginTop: "5px",
            marginLeft: "25px",
          }}
        >
          Add News
        </Button>
      </form>
    </div>
  );
}

export default AddNews;
