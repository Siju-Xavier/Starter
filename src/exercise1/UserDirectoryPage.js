import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';
import { useState, useEffect } from 'react';

function UserDirectoryPage() {
  // TODO: add users, sortBy, and viewMode state in this component.
  // TODO: fetch the initial users with useEffect.
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetch('https://67c1fca561d8935867e4fc5a.mockapi.io/users_api')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  function handleDeleteClick(userId) {
    fetch(`https://67c1fca561d8935867e4fc5a.mockapi.io/users_api/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => console.error('Error deleting user:', error));

  }

  function handleSortByGroupClick() {
    const sortedUsers = [...users].sort((a, b) => a.user_group - b.user_group);
    setUsers(sortedUsers);
    setSortBy('user_group');
  }

  function handleSortByIdClick() {
    const sortedUsers = [...users].sort((a, b) => a.id - b.id);
    setUsers(sortedUsers);
    setSortBy('id');
  }

  function handleViewToggleClick() {
    setViewMode(viewMode === 'grid' ? 'list' : 'grid');
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls
          onDeleteClick={handleDeleteClick}
          onSortByGroupClick={handleSortByGroupClick}
          onSortByIdClick={handleSortByIdClick}
          onViewToggleClick={handleViewToggleClick}
        />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
