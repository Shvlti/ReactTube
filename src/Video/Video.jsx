import React, { useState } from 'react';
import './video.css';


function Video(props) {
  const { id, title, chanelName, img, initialLikes = 0, initialLiked = false } = props;
  const likesKey = `video_${id}_likes`;
  const likedKey = `video_${id}_liked`;


  const [likesCount, setLikesCount] = useState(() => {
    const saved = localStorage.getItem(likesKey);
    return saved !== null ? parseInt(saved, 10) : initialLikes;
  });

  const [liked, setLiked] = useState(() => {
    const saved = localStorage.getItem(likedKey);
    return saved !== null ? JSON.parse(saved) : initialLiked;
  });


  const toggleLike = () => {
    const newLiked = !liked;
    const newLikesCount = newLiked ? likesCount + 1 : likesCount - 1;

    setLiked(newLiked);
    setLikesCount(newLikesCount);

    localStorage.setItem(likedKey, JSON.stringify(newLiked));
    localStorage.setItem(likesKey, String(newLikesCount));
  };

  return (
    <div className='video'>
      <img className='video_img' src={img} alt={title} />
      <p>{title}</p>
      <p>{chanelName}</p>
      <div className='video_footer'>
        <p>Likes: {likesCount}</p>
        <button onClick={toggleLike} aria-pressed={liked}>
          {liked ? 'unlike' : 'like'}
        </button>
        <button onClick={() => props.onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default Video;