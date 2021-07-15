import React, { Component } from "react";
import { Label, Menu } from "semantic-ui-react";
import { changeRoom } from "../dataSlice";
import { useSelector, useDispatch } from "react-redux";

const RoomList = () => {
  const handleItemClick = (e, { name }) => {
    if (name !== selectedRoom) dispatch(changeRoom(name));
  };
  const selectedRoom = useSelector((state) => state.data.selectedRoom);
  const isSignedIn = useSelector((state) => state.data.isSignedIn);
  const dispatch = useDispatch();
  return (
    <Menu style={{ minHeight: "85vh" }} fluid vertical>
      <Menu.Item
        disabled={!isSignedIn}
        name="General"
        active={selectedRoom === "General"}
        onClick={handleItemClick}
      >
        <Label color={selectedRoom == "General" ? "teal" : "grey"}>1</Label>
        General
      </Menu.Item>

      <Menu.Item
        disabled={!isSignedIn}
        name="Random"
        active={selectedRoom === "Random"}
        onClick={handleItemClick}
      >
        <Label color={selectedRoom == "Random" ? "teal" : "grey"}>1</Label>
        Random
      </Menu.Item>

      <Menu.Item
        disabled={!isSignedIn}
        name="Sports"
        active={selectedRoom === "Sports"}
        onClick={handleItemClick}
      >
        <Label color={selectedRoom == "Sports" ? "teal" : "grey"}>1</Label>
        Sports
      </Menu.Item>
    </Menu>
  );
};
export default RoomList;
