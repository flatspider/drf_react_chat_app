// This function needs to return a list of buttons as HTML that have mapped over the state.

import LeftArrow from "./LeftArrow.js";

function ChannelList(props) {
  // If the props.currentChannel === props.channel.id

  // Render an asterisk or globe

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
          <div className="d-flex align-items-center">
            <div className="flex ml-2 d-inline-flex align-items-center">
              <p className="fw-bold mb-0 mr-2">{props.channel.title}</p>

              {props.channel.id === props.currentChannel && (
                <span className="ml-2">
                  <LeftArrow />
                </span>
              )}
            </div>
          </div>
        </a>
      </li>
    </>
  );
}

export default ChannelList;
