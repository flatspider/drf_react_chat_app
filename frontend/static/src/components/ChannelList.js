// Look at the channels database
// Run a fetch request to get all channel names
// Print and display them in order?
// This will be on the left side within the App.js and structured by the App.css
// This may be a useEffect - where I want you to check the status of the server one time as its mounted to the DOM

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// This function needs to return a list of buttons as HTML that have mapped over the state.

function ChannelList({ channel }) {
  // Map the blogs.title over the button content.

  const [showModal, setShowModal] = useState(false);

  if (!channel) {
    return null; // Prevents undefined error from occuring during initial render
  }

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  // This is already being mapped...?
  /* const chatList = channel.texts.map((chat, index) => (
    <div key={index}>
      <p>
        {chat.text} by {chat.author}
      </p>
    </div>
  ));
  */

  return (
    <>
      <button
        type="button"
        className="list-group-item list-group-item-action w-25"
        onClick={openModal}
      >
        {channel.channel}
      </button>
      <Modal
        show={showModal}
        onHide={closeModal}
        centered
        dialogClassName="position-absolute bottom-10 end-0 w-75"
      >
        <Modal.Header closeButton>
          <Modal.Title>{channel.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{channel.text}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ChannelList;
