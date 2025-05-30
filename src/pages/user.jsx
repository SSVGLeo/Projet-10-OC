import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { updateUserInfo } from "../redux/userSlice";

export function User() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const sessionChecked = useSelector((state) => state.user.sessionChecked);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    console.log("🛡️ sessionChecked:", sessionChecked, "| isAuthenticated:", isAuthenticated);
    if (sessionChecked && !isAuthenticated) {
      navigate("/sign-in");
    }
  }, [sessionChecked, isAuthenticated, navigate]);

  console.log(userInfo);

  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(() =>userInfo?.userName || '');

  const handleSave = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/v1/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userName: editedUserName }),
        }
      );
      const data = await response.json();
    console.log("API response :", data);

    if (data.status === 200) {
      dispatch(updateUserInfo({ ...userInfo, userName: editedUserName }));
      setIsEditing(false);
    } else {
      console.error("Erreur de mise à jour :", data.message);
    }
    } catch (error) {
      console.error("Erreur réseau :", error);
    }
  }

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
            <input disabled id="firstname" value={userInfo.firstName}></input>

            <label for="lastname">Last name:</label>
            <input disabled id="lastname" value={userInfo.lastName}></input>

            <button onClick={handleSave} type="submit">
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
