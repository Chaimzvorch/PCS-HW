import { useState, useEffect } from 'react';
import { fetchUsers } from './api';
import UserList from './components/UserList';
import PostList from './components/PostList';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div>
      <header>
        <h1>Simple Blog</h1>
        {selectedUser && (
          <button onClick={() => setSelectedUser(null)}>
            Home
          </button>
        )}
      </header>

      {!selectedUser ? (
        <UserList users={users} onSelectUser={setSelectedUser} />
      ) : (
        <PostList user={selectedUser} />
      )}
    </div>
  );
}

export default App;
