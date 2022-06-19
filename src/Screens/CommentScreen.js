import { useLocation } from "react-router-dom";
import posts from "../data/posts";
import { useEffect, useRef, useState } from "react";
import comments from "../data/comments";

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
      if(comments[currentPost.code]) {

        setComment(comments[currentPost.code]);
      }
    }
  }, [id]);

  const addCommentHandler = () => {
    console.log(authorInputRef.current.value);
    console.log(commentInputRef.current.value);
    const addedComment = {
      text: commentInputRef.current.value,
      user: authorInputRef.current.value,
    };
    setComment((item) => [...item, addedComment]);
  };

  const likeHandler = () => {
    const temporaryPost = { ...filteredPosts };
    temporaryPost.likes += 1;
    setFilteredPosts(temporaryPost);
    console.log(filteredPosts);
  };

  return (
    <div>
      <img src={filteredPosts.display_src} alt=""></img>
      <h4>{filteredPosts.caption}</h4>
      <span>
        <button onClick={likeHandler}>{filteredPosts.likes}</button>
      </span>
      {comment.map((item) => (
        <>
          <h3>{item.user}</h3>
          <h3>{item.text}</h3>
        </>
      ))}
      <input ref={authorInputRef} />
      <input ref={commentInputRef} />
      <button onClick={addCommentHandler}>Add Comment</button>
    </div>
  );
}

export default CommentScreen;
