import React, { useState, useEffect } from "react";
import { List, Icon, Input } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../dataSlice";
const MessageBoard = () => {
  const isSignedIn = useSelector((state) => state.data.isSignedIn);
  const messageList = useSelector((state) => state.data.messageList);
  const selectedRoom = useSelector((state) => state.data.selectedRoom);
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
        style={{ position: "absolute", bottom: 0, height: 50, width: "35vw" }}
        disabled={!isSignedIn || selectedRoom == ""}
        action={{
          color: "teal",
          labelPosition: "right",
          icon: "send",
          onClick: () => {
            setInput("");
            if (input !== "") dispatch(sendMessage(input));
          },
          content: "Send",
        }}
        onAc
        placeholder={
          isSignedIn && selectedRoom !== ""
            ? "Write a message!"
            : "Log in and select a room to send a message"
        }
      />
    </React.Fragment>
  );
};

const renderMessages = (messageList) => {
  let msgs = [];
  messageList?.forEach((msg) => {
    msgs.push(
      <List.Item key={msg}>
        <Icon size="large" name="user" />
        <List.Content>
          <List.Header>{msg.username}</List.Header>
          <List.Description>{msg.message}</List.Description>
        </List.Content>
      </List.Item>
    );
  });
  return msgs;
};

export default MessageBoard;
