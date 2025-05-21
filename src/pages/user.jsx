import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export function User() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const userInfo = useSelector((state) => state.user.userInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(userInfo.userName);

  return (
    <section className="main bg-dark">
      <div className="header">
        {userInfo && (
          <h1>
            Welcome back <br />
            {userInfo.firstName} {userInfo.lastName} {`(${userInfo.userName})`}
          </h1>
        )}
        <button
          className="edit-button"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          Edit Name
        </button>
        {isEditing && (
          <div>
            <label for="username">User name:</label>
            <input
              placeholder={userInfo.userName}
              id="username"
              type="text"
              value={editedUserName}
              onChange={(e) => setEditedUserName(e.target.value)}
            ></input>

            <label for="firstname">First name:</label>
            <input
              disabled
              id="firstname"
              value={userInfo.firstName}
            ></input>

            <label for="lastname">Last name:</label>
            <input
              disabled
              id="lastname"
              value={userInfo.lastName}
            ></input>

            <button onClick={() => setIsEditing((prev) => !prev)} type="submit">
              Save
            </button>
            <button onClick={() => setIsEditing((prev) => !prev)}>
              Cancel
            </button>
          </div>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </section>
  );
}
