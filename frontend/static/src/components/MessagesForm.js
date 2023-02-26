// This form will contain as many chat items are within the selected channel.
// It will also contain the text input and submit button to send a message to the chat.

import { useState } from "react";

function MessagesForm(props) {
  const [chat, setChat] = useState("");
  const [channels, setChannel] = useState("");

  const sendChat = () => {
    console.log(chat);
    setChat("");
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <div className="container py-5 ">
        <div className="row">
          <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
            <h5 className="font-weight-bold mb-3 text-center text-lg-start">
              {props.render} Choose your channel:
            </h5>

            <div className="card">
              <div className="card-body">
                <ul className="list-unstyled mb-0">
                  <li
                    className="p-2 border-bottom"
                    style={{ backgroundColor: "#eee" }}
                  >
                    <a href="#!" className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <div className="pt-1">
                          <p className="fw-bold mb-0">CHANNEL NAME</p>
                          <p className="small mb-0 text-muted">
                            Possibly return first chat text...
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                  <li className="p-2 border-bottom">
                    <a href="#!" className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <div className="pt-1">
                          <p className="fw-bold mb-0">Second channel</p>
                          <p className="small text-muted">
                            Lorem ipsum dolor sit.
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>

                  <li className="p-2">
                    <a href="#!" className="d-flex justify-content-between">
                      <div className="d-flex flex-row">
                        <div className="pt-1">
                          <p className="fw-bold mb-0">Tim</p>
                          <p className="small text-muted">
                            Lorem ipsum dolor sit.
                          </p>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-7 col-xl-8">
            <ul className="list-unstyled">
              <li className="d-flex justify-content-between mb-4">
                <div className="card">
                  <div className="card-header d-flex justify-content-between p-3">
                    <p className="fw-bold mb-0">User Name</p>
                  </div>
                  <div className="card-body">
                    <p className="mb-0">
                      Channel Text: Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
              </li>

              <li className="mb-3">
                <form className="form-outline" onSubmit={sendChat}>
                  <input
                    className="form-control"
                    id="chat"
                    placeholder="Enter chat here..."
                    onChange={(event) => setChat(event.target.value)}
                    value={chat}
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
