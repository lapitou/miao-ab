import './user.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../../api/ApiUser";
import Buttons from '../buttons/Buttons';

function User() {

  const dispatch = useDispatch();
  const { userName, firstName, lastName, token } = useSelector(state => state.user.user)
  const [isToggle, setIsToggle] = useState(false);
  const [inputUserName, setInputUserName] = useState("");
  // function for edit, save and cancel button
  const toggleForm = () => {
    setIsToggle((current) => !current);
  };

  useEffect(() => {
    setInputUserName(userName);
  }, [userName]);

  return (
    <>
      {!isToggle && (
        <>
          <div className='header'>
            <h1>Welcome back</h1>
            <br />
            <h1> {firstName} {lastName}!</h1>
            <Buttons className='edit-button' type='button' buttonName='Edit Name' onClick={toggleForm} />
          </div>
        </>
      )};
      {isToggle && (
        <>
          <div className='userHeader'>
            <section className='sign-in-content edit-user'>
              <i className="fa fa-user-circle sign-in-icon" />
              <h2>Edit user info</h2>
              <form className="editUserInfo">
                <div className='editForm'>
                  <label htmlFor='username' className="labelEdit" >Username:</label>
                  <input
                    id='userName'
                    type='text'
                    onChange={(e) => setInputUserName(e.target.value)}
                    value={inputUserName}
                  />
                </div>
                <div className='editForm' >
                  <label htmlFor='first-name' className="labelEdit">First Name:</label>
                  <input
                    id='firstName'
                    type='text'
                    onChange={(e) => e.preventDefault()}
                    value={firstName}
                    disabled="disabled"
                  />
                </div>
                <div className='editForm'>
                  <label htmlFor='last-name' className="labelEdit">Last Name:</label>
                  <input
                    id='lastName'
                    type='text'
                    onChange={(e) => e.preventDefault()}
                    value={lastName}
                    disabled="disabled"
                  />
                </div>
                <div></div>
                <div className='button-box'>
                  <Buttons
                    className='modify-button'
                    type="onClick"
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(editUser({ userName: inputUserName, token: token }));
                      toggleForm();
                    }}
                    buttonName='Save'
                  />
                  <Buttons
                    className='modify-button'
                    type="onClick"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleForm();
                    }}
                    buttonName='Cancel'
                  />
                </div>
              </form>

            </section>
          </div>
        </>)}
    </>
  )
}
export default User;