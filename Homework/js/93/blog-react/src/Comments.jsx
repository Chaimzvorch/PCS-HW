import { useEffect, useState } from 'react';
import { fetchCommentsByPost } from '../api';

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchCommentsByPost(postId).then(setComments);
  }, [postId]);

  return (
    <div className="comments">
      {comments.map(c => (
        <p key={c.id}>
          <strong>{c.email}</strong>: {c.body}
        </p>
      ))}
    </div>
  );
}
