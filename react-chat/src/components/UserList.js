import React from "react";
import { List } from "semantic-ui-react";
import { useSelector } from "react-redux";

const UserList = () => {
  const userList = useSelector((state) => state.data.userList);
  const renderUsers = () => {
    let users = [];
    userList?.forEach((user) => {
      users.push(
        <List.Item key={user}>
          <List.Icon name="user" />
          <List.Content>{user}</List.Content>
        </List.Item>
      );
    });
    return users;
  };
  return <List>{renderUsers()}</List>;
};
export default UserList;
