// This function needs to return a list of buttons as HTML that have mapped over the state.

function ChannelList(props) {
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
