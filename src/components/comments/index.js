import React from "react";
import './style.css';

export default function Comment({ username, caption }) {
  return (
    <div className="comment">
      <p>
        <span className="comment__UserName">{username}</span> {caption}
      </p>
    </div>
  );
}
