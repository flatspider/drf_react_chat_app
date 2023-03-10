// This form will contain as many chat items are within the selected channel.
// It will also contain the text input and submit button to send a message to the chat.

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChannelList from "./ChannelList";
import ChatItem from "./ChatItem";

function MessagesForm(props) {
  const [chats, setChats] = useState("");
  const [channels, setChannel] = useState("");
  const [userData, setUserData] = useState("");
  const [currentChannel, setCurrentChannel] = useState(1);
  const [newChat, setNewChat] = useState({ text: "" });
  const [newChan, setNewChan] = useState("");

  const handleError = (err) => {
    console.warn("error!", err);
  };

  // Calls dj-rest-auth to learn currently logged in user.
  // Sets userData to logged in user item.
  // Still need to do this with restructuring. What is the username? userData.username
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        };
        const response = await fetch("/dj-rest-auth/user/", options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  // Calls api_v1 to learn current channels.
  // Sets channels to list of channel items. ID and TITLE.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        };
        const response = await fetch("/api_v1/chats/channels/", options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setChannel(data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  // Calls api to get all current chats in database.
  // Chats have chat.id, chat.TEXT, chat.AUTHOR.username, and chat.channel.title
  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
        };
        const response = await fetch("/api_v1/chats/", options);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setChats(data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  let isLoggedIn = Cookies.get("Authorization") ? true : false;

  if (!isLoggedIn) {
    return (
      <p
        onClick={() => {
          props.setRender("a");
        }}
      >
        Please click here to log in.
      </p>
    );
  }

  // Prevents undefined error from occuring during initial render
  if (!channels) {
    return null;
  }

  if (!chats) {
    return null;
  }

  if (!userData) {
    return null;
  }

  // Maps the database of channels to create channel buttons
  const channelListHTML = channels.map((channel, index) => (
    <ChannelList
      key={index}
      channel={channel}
      currentChannel={currentChannel}
      setCurrentChannel={setCurrentChannel}
    />
  ));

  // Run a filter on the chats to only show items where current_chat === chat.channel
  const chatListHTML = chats
    .filter((chats) => chats.channel === currentChannel)
    .map((chat, index) => (
      <ChatItem key={index} chat={chat} userData={userData} />
    ));

  // Logs out and triggers re render.
  const setLogOut = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };

    const response = await fetch("/dj-rest-auth/logout/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    Cookies.remove("Authorization");
    setChats("5");
  };

  // Do I need to send in a channel object..?
  // channel: {id: xx, title: xx}
  // "channel": {
  // "id": 2,
  // "title": "Robots"
  // }
  const addChat = async (text, channelId) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify({
        text,
        channel: channelId,
      }),
    };

    const response = await fetch("/api_v1/chats/", options).catch(handleError);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const chat = await response.json();
    //console.log("New chat added:", chat);
    setChats([...chats, chat]);
  };

  const sendChat = (event) => {
    event.preventDefault();
    const text = newChat.text;
    const channelId = currentChannel;
    addChat(text, channelId);
    setNewChat({ text: "" });
  };

  const clickAddChannelButton = () => {
    const addChannel = async (channelName) => {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        body: JSON.stringify({
          title: channelName,
        }),
      };

      const response = await fetch("/api_v1/chats/channels/", options).catch(
        handleError
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const newChannel = await response.json();

      setChannel([...channels, newChannel]);
    };
    addChannel(newChan);
    setNewChan("");
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container ">
        <div className="row">
          <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
            <div className="fixed-top sticky-top pt-5">
              <div className="card">
                <div className="card-body ">
                  <ul
                    className="list-unstyled mb-0 row align-items-center
                "
                  >
                    {channelListHTML}
                    <div className="col">
                      <input
                        className="mt-4 form-control"
                        value={newChan}
                        placeholder="Channel name..."
                        onChange={(e) => {
                          setNewChan(e.target.value);
                        }}
                        required
                      ></input>
                      <button
                        className="btn btn-secondary mt-3"
                        onClick={clickAddChannelButton}
                      >
                        + CHANNEL
                      </button>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="card mt-4">
                <h5 className="font-weight-bold mt-3 text-center">
                  You are logged in as:{" "}
                  {userData ? <p>{userData.username}</p> : <p>Loading...</p>}{" "}
                </h5>
                <div>
                  <button
                    type="button"
                    className="btn btn-info btn-rounded me-2 mb-2 mt-2"
                    onClick={() => {
                      props.setRender("a");
                    }}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-rounded mb-2 me-2 mt-2"
                    onClick={setLogOut}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-7 col-xl-8 py-5">
            <ul className="list-unstyled">
              {chatListHTML}

              <li
                className="fixed-bottom sticky-bottom"
                style={{ backgroundColor: "#eee" }}
              >
                <form className="form-outline pt-4 pb-5" onSubmit={sendChat}>
                  <input
                    className="form-control"
                    id="chat"
                    placeholder="Enter chat here..."
                    onChange={(event) => {
                      setNewChat({ text: event.target.value });
                    }}
                    value={newChat.text}
                    autoComplete="off"
                  ></input>

                  <button
                    type="submit"
                    className="btn btn-info btn-rounded float-end mt-2 mb-2"
                  >
                    Send
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessagesForm;
