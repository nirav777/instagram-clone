import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import posts from "../data/posts";
import comment from "../data/comments";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart , faMessage } from '@fortawesome/free-solid-svg-icons'
import Header from "../Components/Header";

function HomeScreen() {
  const [postState, setpostState] = useState([]);

  useEffect(() => {
    setpostState(posts);
  }, []);

  const likeHandler = (item) => {
    let currentPosts = [...postState];
    let currPostIndex = currentPosts.findIndex((it) => it.id === item.id);
    let currPost = currentPosts[currPostIndex];
    currPost.likes += 1;
    setpostState(currentPosts);
  };

  return (
    <div className="posts-container">
      {postState.map((item) => (
        <div className="post-details">
          <Link to={`/comments?id=${item.id}`}>
            <img src={item.display_src} alt=""></img>
          </Link>
          <div className="caption">

          <h4>{item.caption}</h4>
          </div>
          <span>
            <button onClick={() => likeHandler(item)}><FontAwesomeIcon icon={faHeart} color='red' size="2x"/> <b>{item.likes}</b> </button>
            <Link to={`/comments?id=${item.id}`}>
              <button><FontAwesomeIcon icon={faMessage} color='black' size="2x"/></button>
            </Link>
          </span>
        </div>
      ))}
    </div>
  );
}

export default HomeScreen;
