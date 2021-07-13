import React, { Component } from "react";
import { Input, Label, Menu } from "semantic-ui-react";

export default class RoomList extends Component {
  state = { activeItem: "General" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Menu style={{ minHeight: "85vh" }} fluid vertical>
        <Menu.Item
          name="General"
          active={activeItem === "General"}
          onClick={this.handleItemClick}
        >
          <Label color={this.state.activeItem == "General" ? "teal" : "grey"}>
            1
          </Label>
          General
        </Menu.Item>

        <Menu.Item
          name="Random"
          active={activeItem === "Random"}
          onClick={this.handleItemClick}
        >
          <Label color={this.state.activeItem == "Random" ? "teal" : "grey"}>
            1
          </Label>
          Random
        </Menu.Item>

        <Menu.Item
          name="Sports"
          active={activeItem === "Sports"}
          onClick={this.handleItemClick}
        >
          <Label color={this.state.activeItem == "Sports" ? "teal" : "grey"}>
            1
          </Label>
          Sports
        </Menu.Item>
      </Menu>
    );
  }
}
