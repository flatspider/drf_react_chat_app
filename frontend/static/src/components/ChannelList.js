// Look at the channels database
// Run a fetch request to get all channel names
// Print and display them in order?
// This will be on the left side within the App.js and structured by the App.css
// This may be a useEffect - where I want you to check the status of the server one time as its mounted to the DOM

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

// This function needs to return a list of buttons as HTML that have mapped over the state.

function ChannelList(props) {
  // Map the Channel.title over the button content.

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <li className="p-2 border-bottom">
        <a
          href="#!"
          className="d-flex justify-content-between"
          onClick={() => {
            props.setCurrentChannel(props.channel.id);
          }}
        >
          <div className="">
            <div className="pt-1">
              <p className="fw-bold">{props.channel.title}</p>
            </div>
          </div>
        </a>
      </li>
    </>
  );
}

export default ChannelList;
