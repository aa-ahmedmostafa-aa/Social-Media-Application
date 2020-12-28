import React, { useContext, useState } from "react";
import CommentInput from "../../components/comment-input";
import Comment from "../../components/comments";
import { db, storage } from "../../firebase";
import { UserConetext } from "../../contexts/user";
import "./style.css";
export default function Post({
  profileUrl,
  username,
  id,
  photoURL,
  caption,
  comments,
}) {
  const [user, setUser] = useContext(UserConetext).user;
  const handelDeletePost = () => {
    // 1- first delete image from firebase storage
    // get  ref to the  image file like to delete
    var imageRef = storage.refFromURL(photoURL);
    //delete the file ref
    imageRef
      .delete()
      .then(() => {
        console.log("image deleted successfull");
      })
      .catch((error) => {
        console.log(`Error image of post : ${error}`);
      });
    //2 - second delete the document using (id)
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => {
        console.log("the post info deleted Successfull");
      })
      .catch((error) => {
        console.log(`Error of post info : ${error}`);
      });
  };
  return (
    <div className="post">
      <div className="post__header">
        <div className="post__headerLeft">
          <img
            className="post__headerProfilePic"
            src={profileUrl}
            alt="profilePhoto"
          />
          <p className="post__headerLeftUserName">{username}</p>
        </div>
        <button
          onClick={handelDeletePost}
          className="post__headerRightDeleteBtn"
        >
          Delete
        </button>
      </div>
      <div className="post__center">
        <img className="post__PhotoImage" src={photoURL} alt="" />
      </div>
      <div>
        <p>
          <span className="post__UserName">{username}</span> {caption}
        </p>
      </div>

      {comments ? (
        comments.map((comment) => (
          <Comment username={comment.username} caption={comment.comment} />
        ))
      ) : (
        <></>
      )}
      {user ? <CommentInput id={id} comments={comments} /> : <></>}
    </div>
  );
}
