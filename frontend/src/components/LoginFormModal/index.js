import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
 // FIXME: DEMO USER
  // TODO: DEMO USER
function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};
    if(password.length < 6) errors.password = 'length';
    if(credential.length < 4) errors.credential = 'length';
    setErrors(errors)
  }, [password,credential])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };

  const handleDemoUser = () => {
    return dispatch(sessionActions.login({ credential:'Demo-lition', password:'password'}))
      .then(closeModal);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </ul> */}
        <div className="user-information">
          <h1>Log In</h1>
          <label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder="Username or Email"
            />
          </label>
          <p className="errors">{errors.credential}</p>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
          <p className="errors">{errors.password}</p>
          <button type="submit" disabled={Boolean(Object.values(errors).length)}>Log In</button>
        </div>
      </form>
      <button type="submit" onClick={handleDemoUser}>
        Demo User
      </button>
    </>
  );
}

export default LoginFormModal;