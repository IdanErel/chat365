import React from "react";
import { List, Icon } from "semantic-ui-react";
const messageList = [
  { user: "asdf", message: "hello!" },
  { user: "qwer", message: "hi! how are you?" },
  { user: "zxvc", message: "hi! how are you?" },
];
const renderMessages = () => {
  let msgs = [];
  messageList.forEach((msg) => {
    msgs.push(
      <List.Item>
        <Icon size="large" name="user" />
        <List.Content>
          <List.Header>{msg.user}</List.Header>
          <List.Description>{msg.message}</List.Description>
        </List.Content>
      </List.Item>
    );
  });
  return msgs;
};
const MessageBoard = () => <List>{renderMessages()}</List>;

export default MessageBoard;
