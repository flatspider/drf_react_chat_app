import { useState } from "react";
import Cookies from "js-cookie";

function RegistrationForm(props) {
  // Can create a css object up here:
  // For login button: style={{padding-left: 2.5rem, padding-right: 2.5rem}}

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const handleError = (err) => {
    console.warn("error!");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("submit");

    event.preventDefault();
    console.log("submit");

    const user = {
      username,
      email,
      password1,
      password2,
    };

    console.log(user);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(user),
    };

    const response = await fetch("/dj-rest-auth/registration/", options).catch(
      handleError
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    // Set the cookie Authorization the data token:
    Cookies.set("Authorization", `Token ${data}`);

    setUsername("");
    setEmail("");
    setPassword1("");
    setPassword2("");
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit}>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">
                  This is the registration page!
                </p>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="username"
                  className="form-control form-control-lg"
                  placeholder="Enter a username..."
                  autoComplete="off"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
                <label className="form-label" htmlFor="username">
                  Username
                </label>
              </div>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email1"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  autoComplete="off"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <label className="form-label" htmlFor="email1">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="password1"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  autoComplete="off"
                  value={password1}
                  onChange={(event) => setPassword1(event.target.value)}
                />
                <label className="form-label" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="password2"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  autoComplete="off"
                  value={password2}
                  onChange={(event) => setPassword2(event.target.value)}
                />
                <label className="form-label" htmlFor="password">
                  Enter a matching password.
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                  className="btn btn-primary btn-lg"
                >
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account? Click here!{" "}
                  <a
                    href="#!"
                    className="link-danger"
                    onClick={() => {
                      props.setRender("a");
                    }}
                  >
                    Log in
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

export default RegistrationForm;
