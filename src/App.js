import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [expandedUser, setExpandedUser] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

   // Search logic
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

 // Expand/collapse logic
  const handleExpandCollapse = (userId) => {
    setExpandedUser((prevExpandedUser) => (prevExpandedUser === userId ? null : userId));
  };

  const handleFollowUser = (userId) => {
    if (!followedUsers.includes(userId)) {
      setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
    }
  };

  const handleBlockUser = (userId) => {
    if (!blockedUsers.includes(userId)) {
      setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, userId]);
    }
  };

  const isUserFollowed = (userId) => followedUsers.includes(userId);
  const isUserBlocked = (userId) => blockedUsers.includes(userId);

  const filteredUsers = users.filter((user) =>
    user.display_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1>Stack Overflow Users</h1>
      <div className="form-group mt-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <ul className="list-group mt-2">
        {currentUsers.map((user) => (
          <li className="list-group-item" key={user.user_id}>
          <div className="d-flex align-items-center">
            <img src={user.profile_image} alt={user.display_name} className="mr-3" />
            <span>{user.display_name}</span>
            <div>
            {!isUserFollowed(user.user_id) && (
                <button className={`btn ${isUserFollowed(user.user_id) ? 'btn-success' : 'btn-primary'} ml-auto`}
                onClick={() => handleFollowUser(user.user_id)}>
                  Follow
                </button>
              )}
              {!isUserBlocked(user.user_id) && (
                <button className="btn btn-danger ml-2" onClick={() => handleBlockUser(user.user_id)}>
                  Block
                </button>
              )}
              {isUserBlocked(user.user_id) && (
                <button className="btn btn-secondary ml-2" disabled>
                  Blocked
                </button>
              )}
            </div>
            <button
              className="btn btn-link ml-auto"
              onClick={() => handleExpandCollapse(user.user_id)}
              disabled={isUserBlocked(user.user_id)}
            >
              {expandedUser === user.user_id ? 'Collapse' : 'Expand'}
            </button>
          </div>
          {expandedUser === user.user_id && (
            <div className={`mt-2 ${expandedUser === user.user_id ? 'expand-content' : 'collapse-content'}`}>
              <p>Reputation: {user.reputation}</p>
              <p>Location: {user.location}</p>
              <p>Website: {user.website_url}</p>
            </div>
          )}
        </li>
        ))}
      </ul>
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array(Math.ceil(filteredUsers.length / usersPerPage))
            .fill()
            .map((_, index) => (
              <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index + 1}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default App;
