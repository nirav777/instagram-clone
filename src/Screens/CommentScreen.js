import { useLocation } from "react-router-dom";
import posts from "../data/posts";
import { useEffect, useRef, useState } from "react";
import comments from "../data/comments";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";

function CommentScreen() {
  const [filteredPosts, setFilteredPosts] = useState({});
  const [comment, setComment] = useState([]);
  const authorInputRef = useRef(null);
  const commentInputRef = useRef(null);

  const { search } = useLocation();
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(new URLSearchParams(search).get("id"));
  }, []);

  useEffect(() => {
    if (id != null) {
      const currentPost = posts.filter((item) => item.id === id)[0];
      setFilteredPosts(currentPost);
      if (comments[currentPost.code]) {
        setComment(comments[currentPost.code]);
      }
    }
  }, [id]);

  const addCommentHandler = () => {
    if (authorInputRef.current.value === "") {
      document.getElementById("author-input-feild").style.display = "block";
      return;
    }
    if (commentInputRef.current.value === "") {
      document.getElementById("comment-input-feild").style.display = "block";
      return;
    }
    const addedComment = {
      text: commentInputRef.current.value,
      user: authorInputRef.current.value,
    };
    setComment((item) => [...item, addedComment]);
    document.getElementById("author-input-feild").style.display = "none";
    document.getElementById("comment-input-feild").style.display = "none";
  };

  const likeHandler = () => {
    const temporaryPost = { ...filteredPosts };
    temporaryPost.likes += 1;
    setFilteredPosts(temporaryPost);
  };

  return (
    <div className="post-container">
      <div className="post-section">
        <img src={filteredPosts.display_src} alt=""></img>
        <h4>{filteredPosts.caption}</h4>
        <button onClick={likeHandler}>
          <FontAwesomeIcon icon={faHeart} color="red" size="2x" />{" "}
          {filteredPosts.likes}
        </button>
        <button>
          <FontAwesomeIcon icon={faMessage} color="black" size="2x" />
        </button>
      </div>
      <div className="comment-section">
        {comment.map((item) => (
          <div className="comment">
            <b>{item.user} </b>
            <i>{item.text}</i>
            <br />
            <hr />
          </div>
        ))}
        <br />
        <input ref={authorInputRef} placeholder="Author" /> <br />
        <label id="author-input-feild">*Input field cannot be empty</label>{" "}
        <br />
        <input ref={commentInputRef} placeholder="Comment..." /> <br />
        <label id="comment-input-feild">*Input field cannot be empty</label>{" "}
        <br />
        <button onClick={addCommentHandler}>Add Comment</button>
      </div>
    </div>
  );
}

export default CommentScreen;
