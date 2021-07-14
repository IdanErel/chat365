import React, { useState, useEffect } from "react";
import { List, Icon, Input } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";

const MessageBoard = () => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const messageList = useSelector((state) => state.data.messageList);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput("");
  }, [isSignedIn]);

  return (
    <React.Fragment>
      <List>{renderMessages(messageList)}</List>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ position: "absolute", bottom: 0, height: 50, width: "50vw" }}
        disabled={!isSignedIn}
        action="Send"
        placeholder={
          isSignedIn ? "Write a message!" : "Log in to send a message"
        }
      />
    </React.Fragment>
  );
};

const renderMessages = (messageList) => {
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

export default MessageBoard;
