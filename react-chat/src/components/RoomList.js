import React from "react";
import { Label, Menu, Header } from "semantic-ui-react";
import { changeRoom } from "../dataSlice";
import { useSelector, useDispatch } from "react-redux";
/**
 * Room list component that renders all rooms
 * dispatches a change room action with the relevant data
 */
const RoomList = () => {
  const selectedRoom = useSelector((state) => state.data.selectedRoom);
  const isSignedIn = useSelector((state) => state.data.isSignedIn);
  const dispatch = useDispatch();

  const handleItemClick = (e, { name }) => {
    if (name !== selectedRoom) dispatch(changeRoom(name));
  };

  return (
    <React.Fragment>
      <Header size={"medium"}>Room List</Header>
      <Menu style={{ minHeight: "80vh" }} fluid vertical>
        <Menu.Item
          disabled={!isSignedIn}
          name="General"
          active={selectedRoom === "General"}
          onClick={handleItemClick}
        >
          <Label color={selectedRoom == "General" ? "teal" : "grey"}></Label>
          General
        </Menu.Item>

        <Menu.Item
          disabled={!isSignedIn}
          name="Random"
          active={selectedRoom === "Random"}
          onClick={handleItemClick}
        >
          <Label color={selectedRoom == "Random" ? "teal" : "grey"}></Label>
          Random
        </Menu.Item>

        <Menu.Item
          disabled={!isSignedIn}
          name="Sports"
          active={selectedRoom === "Sports"}
          onClick={handleItemClick}
        >
          <Label color={selectedRoom == "Sports" ? "teal" : "grey"}></Label>
          Sports
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );
};
export default RoomList;
