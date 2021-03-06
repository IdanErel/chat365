import React from "react";
import { List, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";

const UserList = () => {
  const userList = useSelector((state) => state.data.userList);
  const renderUsers = () => {
    let users = [];
    userList?.forEach((user, i) => {
      users.push(
        <List.Item key={i}>
          <List.Icon name="user" />
          <List.Content>{user}</List.Content>
        </List.Item>
      );
    });
    return users;
  };
  return (
    <div>
      <Header size={"medium"}>Users in room</Header>
      <List>{renderUsers()}</List>
    </div>
  );
};
export default UserList;
