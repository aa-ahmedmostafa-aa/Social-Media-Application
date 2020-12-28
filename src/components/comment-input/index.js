import React, { useState, useContext } from "react";
import "./style.css";
import { UserConetext } from "../../contexts/user";
import { db } from "../../firebase";

export default function CommentInput({ comments, id }) {
  const [comment, setComment] = useState("");
  const [user, setUser] = useContext(UserConetext).user;
  const [commentArray, setCommentArray] = useState(comments ? comments : []);
  const addComment = () => {
    //add comment to post info using (id) of the post
    if (comment != "") {
      commentArray.push({
        comment: comment,
        username: user.email.replace("gamil.com", "").toLowerCase(),
      });
      db.collection("posts")
        .doc(id)
        .update({
          comments: commentArray,
        })
        .then(() => {
          setComment("");
          console.log("comment post successfull");
        })
        .catch((error) => {
          console.log(`Error for post comment : ${error}`);
        });
    }
  };
  return (
    <div className="commentInput">
      <textarea
        className="commentInput__textArea"
        rows="1"
        placeholder="Write any Comment here ...."
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <button onClick={addComment} className="commentInput__btnComment">
        Post
      </button>
    </div>
  );
}
