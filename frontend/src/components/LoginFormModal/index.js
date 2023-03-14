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
  const [errors, setErrors] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};
    if(password.length < 6)errors.password = 'length';
    if(credential.length < 4)errors.credential = 'length';
    setValidationErrors(errors)
  }, [password,credential])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        }
      );
  };
  // const handleDemoUser = (e) => {
  //   e.preventDefault();
  //   setCredential('Demo-lition');
  //   setPassword('Password');
  //   return dispatch(sessionActions.login({ credential, password }))
  //     .then(closeModal)
  //     .catch(
  //       async (res) => {
  //         const data = await res.json();
  //         if (data && data.errors) setErrors(data.errors);
  //       }
  //     );
  // }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
            ))}
        </ul>
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
          <p style={{color: 'red'}}>{validationErrors.credential}</p>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
          <p style={{color: 'red'}}>{validationErrors.password}</p>
          <button type="submit" disabled={Boolean(Object.values(validationErrors).length)}>Log In</button>
          {/* <button type="submit" onClick={handleDemoUser}>Demo User</button> */}
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;