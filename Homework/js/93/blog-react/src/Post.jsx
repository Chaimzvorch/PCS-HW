import { useState } from 'react';
import Comments from './Comments';

export default function Post({ post }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="post">
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <button onClick={() => setShowComments(!showComments)}>
        {showComments ? 'Hide Comments' : 'Show Comments'}
      </button>

      {showComments && <Comments postId={post.id} />}
    </div>
  );
}
