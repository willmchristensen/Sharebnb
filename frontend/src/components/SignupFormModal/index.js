import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isDisabled,setIsDisabled] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if(
        email.length === 0 ||
        username.length === 0 ||
        firstName.length === 0 ||
        lastName.length === 0 ||
        password.length === 0 ||
        confirmPassword.length === 0
      ){
        setIsDisabled(true)
      }else{
        setIsDisabled(false)
      }

  },[email,username,firstName,lastName,password,confirmPassword])

  useEffect(() => {
    if(
        username.length < 4 ||
        password.length < 6
      ){
        setIsDisabled(true)
      }else{
        setIsDisabled(false)
      }
  },[username,password])

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    if (password === confirmPassword) {
        setIsDisabled(false)
        setErrors([]);
        return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
            .then(async () => {
                closeModal();
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setIsDisabled(true)
                    setErrors(Object.values(data.errors));
                    if (data.message === 'User already exists') {
                        let newErrors = errors;
                        newErrors.push('Username must be unique')
                        setErrors(newErrors);
                    }
                }
            });
    }
    setIsDisabled(true)
    return setErrors(['Password does not match confirmation password']);
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        {errors && <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>}
        <div className="user-information">
          <h1>Sign Up</h1>
          <label>
            <input
              placeHolder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.credentials}</p>}
          <label>
            <input
              placeHolder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.username}</p>}
          <label>
            <input
              placeHolder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.firstName}</p>}
          <label>
            <input
              placeHolder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.lastName}</p>}
          <label>
            <input
              placeHolder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {<p className="errors">{errors.password}</p>}
          <label>
            <input
              placeHolder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button 
            type="submit" 
            id="button"
            disabled={isDisabled}
          >Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormModal;