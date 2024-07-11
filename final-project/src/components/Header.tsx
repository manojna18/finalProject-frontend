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
      navigate("/");
    } else {
      setHidden(false);
    }
  }, [user]);

  return (
    <header className="Header">
      <section className="headerGroup1">
        <img src={icon} id="icon" />
        <Link to="/" className="title">
          <h1>Plant Plate</h1>
        </Link>
      </section>
      {user === null ? (
        <button onClick={singInWithGoogle}>Sign In With Google</button>
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
          <button onClick={singOutOfGoogle}>Sign Out</button>
        </div>
      )}
      <section className="headingGroup2">
        <nav>
          <ul>
            <li className={hidden ? "hidden" : ""}>
              <Link to="/tracker" className="link nav">
                Nutrition Tracker
              </Link>
            </li>
            <li className={hidden ? "hidden" : ""}>
              <Link to="/barcode-scanner" className="link nav hidden">
                Barcode Scanner
              </Link>
            </li>
            <li>
              <Link to="/recipes/:id" className="link nav">
                Recipes
              </Link>
            </li>
            <li className={hidden ? "hidden" : ""}>
              <Link to="/goals" className="link nav">
                Goals
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
