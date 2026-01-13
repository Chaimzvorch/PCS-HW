import { useEffect, useState } from 'react';
import { fetchPostsByUser } from '../api';
import Post from './Post';

export default function PostList({ user }) {
  const [posts, setPosts] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchPostsByUser(user.id).then(setPosts);
    setIndex(0);
  }, [user]);

  const visiblePosts = posts.slice(index, index + 3);

  return (
    <div>
      <h2>{user.name}'s Blog</h2>

      {visiblePosts.map(post => (
        <Post key={post.id} post={post} />
      ))}

      <button
        disabled={index === 0}
        onClick={() => setIndex(index - 3)}
      >
        Prev
      </button>

      <button
        disabled={index + 3 >= posts.length}
        onClick={() => setIndex(index + 3)}
      >
        Next
      </button>
    </div>
  );
}
