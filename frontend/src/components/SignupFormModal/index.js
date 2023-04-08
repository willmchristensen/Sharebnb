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
  const [isDisabled, setIsDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  // -------------------------enable if valid-------------------------
  useEffect(() => {
    setIsDisabled(
      username.length < 4 ||
      password.length < 6 ||
      password !== confirmPassword
    );
  }, [username, password, confirmPassword]);
  // -------------------------enable if valid-------------------------
 if (sessionUser) return <Redirect to="/" />;
 // --------------------------dynamic errors!--------------------------
 const handlePassword = (e) => {
  setPassword(e.target.value)
  setErrors((errors) => ({
    ...errors,
    password: e.target.value.length >= 1 && password.length < 6 
    ? 'Password must be longer than 6 characters.'
    : null,
   }));
 };
 const handlePasswordMouseLeave = (e) => {
  setErrors((errors) => ({
   ...errors,
   password: password.length === 0
   ? 'Password is required.'
   : null,
  }));
 };
 const handleConfirmPassword = (e) => {
   setConfirmPassword(e.target.value)
  setErrors((errors) => ({
    ...errors,
    confirmPassword: e.target.value !== password 
    ? 'Confirm Password field must be the same as the Password field.'
    : null,
  }));
 };
 const handleConfirmMouseLeave = (e) => {
  setErrors((errors) => ({
   ...errors,
   confirmPassword: confirmPassword.length === 0
   ? 'Confirm Password is required.'
   : null,
  }));
 };
 const handleEmail = (e) => {
   setEmail(e.target.value);
   setErrors((errors) => ({
     ...errors,
     email: e.target.value.split('@').length !== 2 || e.target.value.length < 6
     ? 'Email must be valid.'
     : null,
   }));
 };
 const handleEmailMouseLeave = () => {
  setErrors((errors) => ({
   ...errors,
   email: email.length <= 2
   ? 'Email is required.'
   : null,
  }));
 };
 const handleUsername = (e) => {
  setUsername(e.target.value);
  setErrors((errors) => ({
    ...errors,
    username: e.target.value.length < 4 && e.target.value.length > 1
      ? 'Credential must be longer than 4 characters.'
      : null,
  }));
 };
 const handleUsernameMouseLeave = () => {
  setErrors((errors) => ({
   ...errors,
   username: username.length === 0
   ? 'Username is required.'
   : null,
  }));
 };
 const handleFirstName = (e) => {
  setFirstName(e.target.value)
  setErrors((errors) => ({
   ...errors,
   firstName: e.target.value.length < 2
     ? 'First name must be longer than 2 characters.'
     : null,
 }));
 };
 const handleFirstNameMouseLeave = () => {
  setErrors((errors) => ({
   ...errors,
   firstName: firstName.length < 2
   ? 'First Name is required.'
   : null,
  }));
 };
 const handleLastName = (e) => {
  setLastName(e.target.value)
  setErrors((errors) => ({
   ...errors,
   lastName: e.target.value.length < 2
     ? 'Last name must be longer than 2 characters.'
     : null,
 }));
 };
 const handleLastNameMouseLeave = () => {
  setErrors((errors) => ({
   ...errors,
   lastName: lastName.length < 2
   ? 'Last Name is required.'
   : null,
  }));
 };
 const handleSubmit = (e) => {
   e.preventDefault();
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
   }
   return setErrors({
     confirmPassword: "Confirm Password field must be the same as the Password field"
   });
 };
 // --------------------------dynamic errors!--------------------------
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
              onChange={handleEmail}
              onMouseLeave={handleEmailMouseLeave}
              required
            />
          </label>
          {errors.email && <p className="errors">{errors.email}</p>}
          <label>
            <input
              placeholder="Username"
              type="text"
              value={username}
              onChange={handleUsername}
              onMouseLeave={handleUsernameMouseLeave}
              required
            />
          </label>
          {errors.username && <p className="errors">{errors.username}</p>}
          <label>
            <input
              placeholder="First Name"
              type="text"
              value={firstName}
              onChange={handleFirstName}
              onMouseLeave={handleFirstNameMouseLeave}
              required
            />
          </label>
          {errors.firstName && <p className="errors">{errors.firstName}</p>}
          <label>
            <input
              placeholder="Last Name"
              type="text"
              value={lastName}
              onChange={handleLastName}
              onMouseLeave={handleLastNameMouseLeave}
              required
            />
          </label>
          {errors.lastName && <p className="errors">{errors.lastName}</p>}
          <label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={handlePassword}
              onMouseLeave={handlePasswordMouseLeave}
              required
            />
          </label>
          {errors.password && <p className="errors">{errors.password}</p>}
          <label>
            <input
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              onMouseLeave={handleConfirmMouseLeave}
              required
            />
          </label>
          {errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
          <button 
            type="submit"
            id="button"
            disabled={isDisabled}
            onClick={handleSubmit} 
          >Sign Up</button>
        </div>
      </form>
    </>
  );
}

export default SignupFormPage;