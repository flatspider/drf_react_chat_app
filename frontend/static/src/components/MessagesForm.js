// This form will contain as many chat items are within the selected channel.
// It will also contain the text input and submit button to send a message to the chat.

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import ChannelList from "./ChannelList";
import ChatItem from "./ChatItem";

function MessagesForm(props) {
  const [chats, setChats] = useState("");
  const [newChat, setNewChat] = useState("");
  const [channels, setChannel] = useState("");
  const [userData, setUserData] = useState("");
  const [currentChannel, setCurrentChannel] = useState(1);

  // Calls dj-rest-auth to learn currently logged in user.
  // Sets userData to logged in user item.
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

  let isLoggedIn = Cookies.get("Authorization") ? true : false;

  const handleError = (err) => {
    console.warn("error!", err);
  };

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

  const sendChat = () => {
    // What channel are you operating in?
    //console.log(chat);
    //setChat("");
    console.log("update function");
  };

  // Need to create the channels html.
  // Need to fix alignment for channel name.

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 ">
        <div className="row">
          <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
            <h5 className="font-weight-bold mb-3 text-center text-lg-start">
              You are logged in as{" "}
              <div>
                {" "}
                {userData ? <p>{userData.username}</p> : <p>Loading...</p>}{" "}
              </div>
            </h5>

            <div className="card">
              <div className="card-body">
                <ul
                  className="list-unstyled
                "
                >
                  {channelListHTML}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-7 col-xl-8">
            <ul className="list-unstyled">
              {chatListHTML}
              <li className="d-flex justify-content-between mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">You</p>
                  </div>
                  <div className="card-body">
                    <p className="mb-0">Channel Text: I love robots</p>
                  </div>
                </div>
              </li>

              <li className="d-flex justify-content-between mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">Jack</p>
                  </div>
                  <div className="card-body d-flex">
                    <p className="mb-0">
                      Channel Text: Need to add delete and edit buttons
                    </p>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button className="btn btn-primary m-2">EDIT</button>
                    <button className="btn btn-danger m-2">DELETE</button>
                  </div>
                </div>
              </li>

              <li className="mb-3">
                <form className="form-outline" onSubmit={sendChat}>
                  <input
                    className="form-control"
                    id="chat"
                    placeholder="Enter chat here..."
                    onChange={(event) => setNewChat(event.target.value)}
                    value={newChat}
                    autoComplete="off"
                  ></input>

                  <button
                    type="submit"
                    className="btn btn-info btn-rounded float-end me-2 mt-2"
                  >
                    Send
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-rounded float-end me-2 mt-2"
                    onClick={() => {
                      props.setRender("a");
                    }}
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    className="btn btn-info btn-rounded float-end me-2 mt-2"
                    onClick={setLogOut}
                  >
                    Log Out
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
