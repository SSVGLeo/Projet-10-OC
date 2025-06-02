import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, rememberedCredentials, clearRememberedCredentials } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const remembered = useSelector((state) => state.user.rememberedCredentials);
  const [rememberMe, setRememberMe] = useState(false);
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

        if (rememberMe) {
          dispatch(rememberedCredentials({ email, password }));
        } else {
          dispatch(clearRememberedCredentials());
        }

        setError(false);

        navigate("/user");
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (remembered.email && remembered.password) {
      setEmail(remembered.email);
      setPassword(remembered.password);
      setRememberMe(true);
    }
  }, [remembered]);

  return (
    <section className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => (setEmail(e.target.value))}
            />
          </div>
          <div className="input-wrapper">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => (setPassword(e.target.value))}
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <label for="remember-me">Remember me</label>
          </div>
          { error === true && <p className="error-message">Invalid email or password</p>}
          <button className="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </section>
  );
}
