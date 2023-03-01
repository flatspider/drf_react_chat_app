// A chat item will contain the text and the name of the user who sent the text item

import Cookies from "js-cookie";
import { useState } from "react";

function ChatItem({ chat, userData }) {
  // Pass down the channel ID and author. Go through the chats and display the ones that
  // match the channel ID. If the author == the logged in user, provide an EDIT and DELETE button.
  // If user === admin, then provide a delete button on every message.

  // The chat comes in. The chat object has a text, author id, and channel value.

  // If the author === userData OR the user === admin, provide the delete button.
  // If the author === userData, provide the edit button.

  const [deleted, setDelete] = useState(false);

  const handleError = (err) => {
    console.warn("error!", err);
  };

  const deleteThisChat = () => {
    // Make delete request here. To the correct api delete url.
    console.log("delete", chat.text, chat.id);

    const sendDelete = async () => {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
      };

      const deleteURL = "/api_v1/chats/delete/" + chat.id + "/";

      const response = await fetch(deleteURL, options).catch(handleError);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    };
    sendDelete();
    setDelete(true);
  };

  return (
    <li className="d-flex justify-content-between mb-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between p-3">
          <p className="fw-bold mb-0">
            From: {chat.author === userData.pk ? "You!" : chat.author_name}
          </p>
        </div>
        <div className="card-body">
          <p className="mb-0">{chat.text}</p>
        </div>
        <div className="d-flex justify-content-end">
          {chat.author === userData.pk && (
            <button className="btn btn-primary m-2">EDIT</button>
          )}
          {(chat.author === userData.pk || userData.pk === 1) && (
            <button onClick={deleteThisChat} className="btn btn-danger m-2">
              DELETE
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ChatItem;
