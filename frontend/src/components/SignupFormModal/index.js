import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isSubmitted,setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  // ----TODO: ERRORS FROM BACKEND: ASK FOR CLARIFICATION!----
  // display password !== confirmpassword front*backend
  useEffect(() => {
    if(
        username.length < 4 ||
        password.length < 6 ||
        password !== confirmPassword
      ){
        setIsDisabled(true)
      }else{
        setIsDisabled(false)
      }
  },[username,confirmPassword,password]);
  
  // FIXME: show error if user has not met condition, remove once 
  useEffect(() => {
    console.log('------------------------------password checkerBEGIN');
    console.log('------------------------------password',password);
    if(password.length >= 1 && password.length < 6) {
      console.log('------------------------------password checkerIF'); 
      errors.password = 'Password must be longer than 6 characters.'
      console.log('------------------------------errors.password',errors.password);
    }else{
      console.log('------------------------------password checkerELSE');
      errors.password = null;
    }
    if(username.length >= 1 && username.length < 4) {
      errors.username = 'Credential must be longer than 4 characters.';  
    } else{
      errors.username = null;
    }
  },[username,password])
  

  if (sessionUser) return <Redirect to="/" />;
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitted(true);
    const errors = {};
    if(password !== confirmPassword){errors.confirmPassword = "Confirm Password field must be the same as the Password field"}
    setErrors(errors);
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }else{
      setErrors({
        confirmPassword: "Confirm Password field must be the same as the Password field"
      });
    }
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="user-information">
          <label>
            <input
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          {errors.email && <p className="errors">{errors.email}</p>}
          <label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          {errors.username && <p className="errors">{errors.username}</p>}
          <label>
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
          <label>
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
          <label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {errors.password && 
          <p
            className="errors"
          >{errors.password}</p>}
          <label>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
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

export default SignupFormPage;