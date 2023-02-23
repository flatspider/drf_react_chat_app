/*const INITIAL_CHANNELS = [
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
*/

// Make the fetch request in this form.
// Check to see if the user is logged in.
// If logged in, allow for write access to be performed.
// Write access means it will read the logged in user token, and assign that as the author.
// If not, throw error.

//http://127.0.0.1:8000/api_v1/chats/ is where the chat should be posted

import { useState, useEffect } from "react";
import ChannelList from "./ChannelList";
import Cookies from "js-cookie";

function FullForm() {
  const [chatValue, setChatValue] = useState(""); // Use state to set the initial value to empty string.
  const [channelList, setChannelList] = useState(null);
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

    // Post this new data to the server here.
    setNewChannel("");
    setChatValue(""); // Clears the input box.
  };

  useEffect(() => {
    const getChats = async () => {
      // What is the correct URL to use here?

      const response = await fetch("/api_v1/chats/");

      if (!response.ok) {
        throw new Error("Network request was not OK");
      }

      const data = await response.json();
      setChannelList(data);
      console.log(data);
    };
    getChats();
  }, []);

  if (!channelList) {
    return <div>Loading ...</div>;
  }

  const channelListHTML = channelList.map((channel, index) => (
    <ChannelList key={index} channel={channel} />
  ));

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
        <button type="submit" className="btn btn-primary m-2 h-50 text-nowrap">
          Submit Chat
        </button>
      </form>
    </div>
  );
}

export default FullForm;
