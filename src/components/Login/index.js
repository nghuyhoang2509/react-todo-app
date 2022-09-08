import React from "react";
import styles from "./Login.module.scss";
import classNames from "classnames/bind";

import { auth } from "../../firebase/config";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const cx = classNames.bind(styles);

const fbProvider = new FacebookAuthProvider();
const ggProvider = new GoogleAuthProvider();

function Login(props) {
  const handleLoginFb= ()=>{
    console.log('haha')
    signInWithPopup(auth,fbProvider)
  }
  const handleLoginGg= ()=>{
    signInWithPopup(auth,ggProvider)
  }


  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div
          className={`col d-flex flex-column align-items-center justify-content-center ${cx(
            "warpper"
          )}`}
        >
          <div className={cx("login-card")}>
            <h2 className={cx("title")}>Log in</h2>
            <p className={cx("description")}>
              Welcome to Todo App, please login to start using the app{" "}
            </p>
            <button className="d-block mt-2 mb-2 btn btn-outline-danger w-100">
              Login with Google
              <img
                alt=" "
                className="ms-2"
                onClick={handleLoginGg}
                src="https://img.icons8.com/color/36/000000/google-logo.png"
              />
            </button>
            <button className="d-block mt-2 mb-2 btn btn-outline-primary w-100">
              Login with Facebook
              <img
                alt=" "
                onClick={handleLoginFb}
                className="ms-2"
                src="https://img.icons8.com/color/36/000000/facebook-new.png"
              />
            </button>
          </div>
        </div>
        <div className={`col d-none d-md-block ${cx("slide")}`}></div>
      </div>
    </div>
  );
}

export default Login;
