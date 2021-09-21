import React from "react";
import { Menu, Segment, Sidebar } from "semantic-ui-react";

const SidebarExampleVisible = () => (
  <Sidebar.Pushable as={Segment}>
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible
      width="thin"
    >
      <Menu.Item as="a">Home</Menu.Item>
      <Menu.Item as="a">Games</Menu.Item>
      <Menu.Item as="a">Channels</Menu.Item>
    </Sidebar>

    <Sidebar.Pusher>
      <Segment basic></Segment>
    </Sidebar.Pusher>
  </Sidebar.Pushable>
);

export default SidebarExampleVisible;
