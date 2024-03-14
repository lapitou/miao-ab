import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserName } from "../../api/ApiUser";
import Buttons from '../buttons/Buttons';
import './userInfo.css';

function UserInfo() {

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
    <main className='main bg-dark'>
      <section className='sign-in-content edit-user'>
        <i className="fa fa-user-circle sign-in-icon" />
        <h2>Edit user info</h2>
        <form>
          <div className='input-wrapper'>
            <label htmlFor='username'>Username:</label>
            <input id='username' type='text' onChange={(e) => setInputUserName(e.target.value)}
              value={inputUserName} />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='first-name'>First Name:</label>
            <input
              id='firs-name'
              type='text'
              onChange={(e) => e.preventDefault()}
              value={firstName}
              disabled="disabled"
            />
          </div>
          <div className='input-wrapper'>
            <label htmlFor='last-name'>Last Name:</label>
            <input
              id='last-name'
              type='text'
              onChange={(e) => e.preventDefault()}
              value={lastName}
              disabled="disabled"
            />
          </div>
          <div></div>
          <div className='button-box'>
            <button className='modify-button'
              type="onClick"
              onClick={(e) => {
                e.preventDefault();
                dispatch(editUserName({ userName: inputUserName, token: token }));
                toggleForm();
              }}

            > Save manu</button>

            <button
              className='modify-button'
              type="onClick"
              onClick={(e) => {
                e.preventDefault();
                toggleForm();
              }}

            >cancel manu</button>
            <Buttons
              className='modify-button'
              type="onClick"
              onClick={(e) => {
                e.preventDefault();
                dispatch(editUserName({ userName: inputUserName, token: token }));
                toggleForm();
              }}
              buttonName='Save' />
            <Buttons
              className='modify-button'
              type="onClick"
              onClick={(e) => {
                e.preventDefault();
                toggleForm();
              }}
              buttonName='Cancel' />
          </div>
        </form>

      </section>
    </main>
  )
}
export default UserInfo;