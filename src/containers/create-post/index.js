import React, { useContext, useState } from "react";
import "./style.css";
import { SignInBtn } from "../../components";
import { UserConetext } from "../../contexts/user";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { db, storage } from "../../firebase";
import makeid from "../../helpers/functions";
import firebase from "firebase";
export default function CreatePost() {
  const [user, setUser] = useContext(UserConetext).user;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const handelChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      var selectedImageSrc = URL.createObjectURL(e.target.files[0]);
      var imagePreviewd = document.getElementById("img-preview");
      imagePreviewd.src = selectedImageSrc;
      imagePreviewd.style.display = "block";
    }
  };
  const handelUploadPost = (e) => {
    if (image) {
      var imageName = makeid(10);
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress function 1%,2%...

          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          // get download url and upload the post info

          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                photoUrl: imageUrl,
                username: user.email.replace("@gmail.com", ""),
                profileUrl: user.photoURL,
              });
            });
            setCaption("");
            setProgress(0);
            setImage(null);
            document.getElementById("img-preview").style.display = "none";
        }
      );
    }
  };
  return (
    <div className="createPost">
      {user ? (
        <div className="createPost_loggedInCenter">
          <p>Create Post</p>
          <div>
            <textarea
              className="createPost_TextArea"
              rows="3"
              placeholder="enter caption here..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>
            <div className="createPost_imgPreview">
              <img id="img-preview" alt="" />
            </div>
          </div>

          <div className="createPost_loggedInBottom">
            <div className="createPost_ImageUploader">
              <label htmlFor="fileInput">
                <AddAPhotoIcon className="IconimageCamera" />
              </label>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handelChange}
              />
            </div>
            <button
              className="createPost_UploadBtn"
              style={{ color: caption ? "#000" : "lightgrey" }}
              onClick={handelUploadPost}
            >
              {`Upload ${progress != 0 ? progress : ""}`}
            </button>
          </div>
        </div>
      ) : (
        <div className="createPost">
          <SignInBtn />
          <p className="toPostComment">to Post & Comment</p>
        </div>
      )}
    </div>
  );
}
