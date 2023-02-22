import { useState } from "react";
import ChannelList from "./ChannelList";

const INITIAL_CHANNELS = [
  {
    title: "Robots",
    chats: [{ text: "hello", user: "conor" }],
  },
  {
    title: "Jobs",
    chats: [
      { text: "I need a job", user: "conor" },
      { text: "I'm hiring!", user: "jeff" },
    ],
  },
  {
    title: "Cars",
    chats: [
      {
        text: "I love my 2005 Toyota Corolla - Sport Edition. Anyone else?",
        user: "conor",
      },
    ],
  },

  {
    title: "Ethics",
    chats: [
      {
        text: "I have this trolley...",
        user: "conor",
      },
    ],
  },
];

function FullForm() {
  const [chatValue, setChatValue] = useState(""); // Use state to set the initial value to empty string.
  const [channelList, setChannelList] = useState(INITIAL_CHANNELS);
  const [newChannel, setNewChannel] = useState("");

  const handleSubmit = (submits) => {
    submits.preventDefault(); // Stops the button from refreshing the page.

    const additionalChannel = {
      title: newChannel,
      chats: [{ text: chatValue, user: "you" }],
    };

    // Need to access object. If newChannel within the current channelList, add the chat to
    // that object.

    setChannelList([...channelList, additionalChannel]);
    setNewChannel("");
    setChatValue(""); // Clears the input box.
  };

  const channelListHTML = channelList.map((channel, index) => (
    <ChannelList key={index} channel={channel} />
  ));

  console.log(channelListHTML);

  return (
    <div className="d-flex justify-content-between">
      <div className="p-3"> {channelListHTML}</div>
      <form
        className="d-flex flex-row bd-highlight align-items-end"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="text"
          className="form-control m-2 chatValue h-50"
          id="chatValue"
          autoComplete="off"
          placeholder="Enter channel here..."
          value={newChannel}
          onChange={(event) => setNewChannel(event.target.value)} // This watches each change to the input and returns the current value
        ></input>
        <input
          type="text"
          name="text"
          className="form-control m-2 chatValue h-50"
          id="chatValue"
          autoComplete="off"
          placeholder="Enter chat here..."
          value={chatValue}
          onChange={(event) => setChatValue(event.target.value)} // This watches each change to the input and returns the current value
        ></input>
        <button type="submit" className="btn btn-primary m-2 h-50">
          Submit Chat
        </button>
      </form>
    </div>
  );
}

export default FullForm;
