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
  const [editing, setEditing] = useState(false);
  const [textUpdate, setTextUpdate] = useState("");

  const handleError = (err) => {
    console.warn("error!", err);
  };

  const editThisChat = () => {
    // Read the chat id.
    // Take in information from a new input box where the placeholder is the previous text?
    // Or initially fill the value with text? Do not want it to be controlled.
    console.log("EDIT");
    setEditing(true);
  };

  const callEditRequest = () => {
    const saveEditThisChat = async () => {
      console.log(textUpdate);
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({
          text: textUpdate,
          channel: chat.channel,
        }),
      };

      const editURL = "/api_v1/chats/" + chat.id + "/";

      const response = await fetch(editURL, options).catch(handleError);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    };
    saveEditThisChat();
    setEditing(false);
    chat.text = textUpdate;
  };

  // Send put request to /api_v1/chats/  chat.id /
  // And update state on the text to show that it has been changed.
  // Does this allow you to edit back to back?

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
    setEditing(false);
  };

  return (
    <li className="d-flex justify-content-stretch mb-4">
      <div className="card w-100">
        <div className="card-header d-flex justify-content-between p-3">
          <p className="fw-bold mb-0">
            From: {chat.author === userData.pk ? "You!" : chat.author_name}
          </p>
        </div>
        <div className="card-body text-start">
          <span className="mb-0">
            {chat.text}
            {chat.author === userData.pk && editing && (
              <h1>
                <input
                  placeholder={chat.text}
                  onChange={(event) => {
                    setTextUpdate(event.target.value);
                  }}
                  value={textUpdate}
                ></input>
                <button
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  Cancel
                </button>
              </h1>
            )}
          </span>
        </div>
        <div className="d-flex justify-content-end">
          {chat.author === userData.pk && !editing && (
            <button onClick={editThisChat} className="btn btn-primary m-2">
              EDIT
            </button>
          )}
          {chat.author === userData.pk && editing && (
            <button onClick={callEditRequest} className="btn btn-primary m-2">
              SAVE
            </button>
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
