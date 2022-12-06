import { useContext, useRef } from "react";
import AuthContext from "../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const InputPasswordRef = useRef();

  const token = authCtx.token;

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = InputPasswordRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyACWwhQRz6sD3dfeifgbz4FoSI4PjDO4BI",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: token,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }

        return resp.json().then((data) => {
          let errorMessage = "Password Change failed";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        });
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={InputPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
