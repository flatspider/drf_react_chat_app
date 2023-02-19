import { useState } from "react";

function FullForm({ onSubmit }) {
  const [chatValue, setChatValue] = useState(""); // Use state to set the initial value to empty string.

  const handleSubmit = (submits) => {
    submits.preventDefault(); // Stops the button from refreshing the page.
    console.log(submits);
    onSubmit({ chatValue }); // Pull in the values of image and caption that the user typed.
    // const newImage = {url, caption}; url: url, and caption: caption
    // using onSubmit destructuring to call the handleSubmit function on the image board.
    // onSubmit(newImage); This uses my function to read the image.

    // Make post request to http://127.0.0.1:8000/api_v1/chats/ info.
    // Where do I get the channels info?
    // Where do I get user value from?

    setChatValue(""); // Clears the input box.
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        className="form-control chatValue"
        id="chatValue"
        autoComplete="off"
        placeholder="Enter chat here..."
        value={chatValue}
        onChange={(event) => setChatValue(event.target.value)} // This watches each change to the input and returns the current value
      ></input>
      <button type="submit" className="btn btn-primary">
        Submit Chat
      </button>
      {/* Prevent default behavior on the button */}
    </form>
  );
}

export default FullForm;
