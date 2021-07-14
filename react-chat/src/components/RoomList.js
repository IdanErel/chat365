import React, { Component } from "react";
import { Label, Menu } from "semantic-ui-react";
import { changeRoom } from "../dataSlice";
import { useSelector, useDispatch } from "react-redux";

const RoomList = () => {
  const handleItemClick = (e, { name }) => dispatch(changeRoom(name));
  const selectedRoom = useSelector((state) => state.data.selectedRoom);
  const dispatch = useDispatch();
  return (
    <Menu style={{ minHeight: "85vh" }} fluid vertical>
      <Menu.Item
        name="General"
        active={selectedRoom === "General"}
        onClick={handleItemClick}
      >
        <Label color={selectedRoom == "General" ? "teal" : "grey"}>1</Label>
        General
      </Menu.Item>

      <Menu.Item
        name="Random"
        active={selectedRoom === "Random"}
        onClick={handleItemClick}
      >
        <Label color={selectedRoom == "Random" ? "teal" : "grey"}>1</Label>
        Random
      </Menu.Item>

      <Menu.Item
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
