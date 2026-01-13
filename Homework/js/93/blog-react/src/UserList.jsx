import UserCard from './UserCard';

export default function UserList({ users, onSelectUser }) {
  return (
    <div>
      {users.map(user => (
        <UserCard
          key={user.id}
          user={user}
          onSelect={() => onSelectUser(user)}
        />
      ))}
    </div>
  );
}
