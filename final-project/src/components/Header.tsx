import { Link, useNavigate } from "react-router-dom";
import "./css/Header.css";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/UserContext";
import { singInWithGoogle, singOutOfGoogle } from "../firebaseConfig";
import AccountContext from "../context/AccountContext";
import icon from "../assets/vegan food.png";

const Header = () => {
  const { user } = useContext(userContext);
  const { account, updateAccount } = useContext(AccountContext);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    updateAccount();
    if (!user) {
      setHidden(true);
      // navigate("/");
    } else {
      setHidden(false);
    }
  }, [user]);

  return (
    <header className="Header">
      <div className="title-links">
        <section className="headerGroup1">
          <img src={icon} id="icon" />
          <Link to="/" className="title">
            <h1>Plant Plate</h1>
          </Link>
        </section>
        <section className="headingGroup2">
          <nav>
            <ul>
              <li className={hidden ? "hidden" : ""}>
                <Link to="/tracker" className="nav-link">
                  Nutrition Tracker
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="nav-link">
                  Recipes
                </Link>
              </li>
              <li className={hidden ? "hidden" : ""}>
                <Link to="/goals" className="nav-link">
                  Goals
                </Link>
              </li>
            </ul>
          </nav>
        </section>
      </div>

      {user === null ? (
        <button className="signIn" onClick={singInWithGoogle}>
          Sign In With Google
        </button>
      ) : (
        <div className="user-greeting">
          <div className="name-img">
            <img
              src={user.photoURL ?? ""}
              alt="user image"
              className="user-photo"
            />
            <p className="greeting">Hi, {user.displayName}</p>
          </div>
          <Link to="/favorites" className="link">
            Your favorites
          </Link>
          <button onClick={singOutOfGoogle} className="signOut">
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
