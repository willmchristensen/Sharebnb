import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isDisabled,setIsDisabled] = useState(true);
  const [isSubmitted,setIsSubmitted] = useState(false);
  const { closeModal } = useModal();
  useEffect(() => {
    if(
        credential.length < 4 ||
        password.length < 6
      ){
        setIsDisabled(true)
      }else{
        setIsDisabled(false)
      }
  },[credential,password]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitted(true);
    const errors = {};
    if(password.length < 6) errors.password = 'Password must be longer than 6 characters.';
    if(credential.length < 4) errors.username = 'Credential must be longer than 4 characters.';
    setErrors(errors);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.message){
            setErrors({...errors,credential:'The provided credentials were invalid.'});
          } 
        }
      );
  };
  const handleDemoUser = () => {
    return dispatch(sessionActions.login({ credential:'testUserName', password:'password'}))
      .then(closeModal);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="user-information">
          <h1>Log In</h1>
          {Object.values(errors).length > 0 && <p className="errors">{errors.credential}</p>}
          {/* <div>
            {errors && <p className="errors">{errors}</p>}
          </div> */}
          <label>
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              placeholder="Username or Email"
            />
          </label>
          {isSubmitted && Object.values(errors).length > 0 && <p className="errors">{errors.username}</p>}
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </label>
          {isSubmitted && Object.values(errors).length > 0 && <p className="errors">{errors.password}</p>}
          <div className="login-buttons">
            <button 
              type="submit" 
              id="button" 
              onClick={handleSubmit}
            >
              Log In
            </button>
            <button 
              type="submit" 
              onClick={handleDemoUser} 
              id="button"
            >
              Demo User
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default LoginFormModal;