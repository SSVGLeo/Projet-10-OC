import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, updateUserInfo } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.body && data.body.token) {
        const token = data.body.token;

        const profilResponse = await fetch(
          "http://localhost:3001/api/v1/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.body.token}`,
            },
          }
        );
        const profileData = await profilResponse.json();
        console.log(profileData);
        localStorage.setItem("token", token);
        dispatch(loginSuccess({ token, userInfo: profileData.body }));

        setError(false);

        navigate("/user");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="main bg-dark">
      <section class="sign-in-content">
        <i class="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div class="input-wrapper">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => (setEmail(e.target.value))}
            />
          </div>
          <div class="input-wrapper">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => (setPassword(e.target.value))}
            />
          </div>
          <div class="input-remember">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          { error === true && <p className="error-message">Invalid email or password</p>}
          <button class="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </section>
  );
}
