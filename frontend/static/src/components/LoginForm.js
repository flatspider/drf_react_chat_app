import { useState } from "react";
import Cookies from "js-cookie";
import MyImage from "./assets/friend-app.webp";

function LoginForm(props, current_user) {
  // Can create a css object up here:
  // For login button: style={{padding-left: 2.5rem, padding-right: 2.5rem}}

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleError = (err) => {
    console.warn("error!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {
      username,
      email: username + "@example.com",
      password,
    };

    current_user = user;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };

    const response = await fetch("/dj-rest-auth/login/", options).catch(
      handleError
    );

    if (!response.ok) {
      alert("Incorrect credentials.");
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // Set the cookie Authorization the data token:
    Cookies.set("Authorization", `Token ${data}`);

    props.setRender("d");

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom mt-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src={MyImage} className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">
                  Chat with your friends today.
                </p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid username"
                  autoComplete="off"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                <label className="form-label" htmlFor="username">
                  Username
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  autoComplete="off"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  className="btn btn-primary btn-lg"
                >
                  Login
                </button>

                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <a
                    href="#!"
                    className="link-danger"
                    onClick={() => {
                      props.setRender("b");
                    }}
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
