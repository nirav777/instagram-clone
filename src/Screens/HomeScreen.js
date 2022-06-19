import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import posts from "../data/posts";

function HomeScreen() {
 
  const [postState, setpostState] = useState([])

  useEffect(() => {
    setpostState(posts)
  }, [])
  

  const likeHandler = (item) => {
    let currentPosts = [...postState];
    let currPostIndex = currentPosts.findIndex((it) => it.id === item.id);
    let currPost = currentPosts[currPostIndex]
    currPost.likes += 1;
    setpostState(currentPosts);
  };


  return (
    <div className="posts-container">
      {postState.map((item) => (
        <div className="post-details">
          <img src={item.display_src} alt=""></img>
          <h4>{item.caption}</h4>
          <h4>{item.code}</h4>
          <span>
            <button onClick={() => likeHandler(item)}>{item.likes}</button>
            <Link to={`/comments?id=${item.id}`}>
              <button>Comment</button>
            </Link>
          </span>
        </div>
      ))}
    </div>
  );
}

export default HomeScreen;
