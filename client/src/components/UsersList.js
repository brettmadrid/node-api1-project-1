import React, { useState, useEffect } from "react";
import axios from "axios";

import UserCard from "./UserCard";

const UsersList = props => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <h1>Characters</h1>
      <div className="charList">
        {users.map(user => (
          <UserCard key={user.id} name={user.name} bio={user.bio} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
