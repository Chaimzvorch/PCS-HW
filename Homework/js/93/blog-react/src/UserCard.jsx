export default function UserCard({ user, onSelect }) {
  return (
    <div className="user-card">
      <h2>{user.name}</h2>
      <p><strong>Website:</strong> {user.website}</p>
      <p><strong>Company:</strong> {user.company.name}</p>
      <button onClick={onSelect}>View Blog</button>
    </div>
  );
}
