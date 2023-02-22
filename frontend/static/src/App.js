import logo from "./logo.svg";
import "./App.css";
import FullForm from "./components/FullForm.js";
import ChannelList from "./components/ChannelList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <FullForm />
        <ChannelList />
      </header>
    </div>
  );
}

export default App;
