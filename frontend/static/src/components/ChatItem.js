// A chat item will contain the text and the name of the user who sent the text item

function ChatItem({ chat, userData }) {
  // Pass down the channel ID and author. Go through the chats and display the ones that
  // match the channel ID. If the author == the logged in user, provide an EDIT and DELETE button.
  // If user === admin, then provide a delete button on every message.

  // The chat comes in. The chat object has a text, author id, and channel value.

  // If the author === userData OR the user === admin, provide the delete button.
  // If the author === userData, provide the edit button.

  return (
    <li className="d-flex justify-content-between mb-4">
      <div className="card">
        <div className="card-header d-flex justify-content-between p-3">
          <p className="fw-bold mb-0">
            {chat.author === userData.pk ? "You!" : chat.author}
            Author:{chat.author}
            Logged in:{userData.pk}
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
            <button className="btn btn-danger m-2">DELETE</button>
          )}
        </div>
      </div>
    </li>
  );
}

export default ChatItem;
