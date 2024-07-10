import { Link, useNavigate } from "react-router-dom";
import "./css/Header.css";
import { useContext, useEffect, useState } from "react";
import userContext from "../context/UserContext";
import { singInWithGoogle, singOutOfGoogle } from "../firebaseConfig";
import AccountContext from "../context/AccountContext";

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
        <h1>
          <Link to="/">PlantPlate</Link>
        </h1>
        {user === null ? (
          <button onClick={singInWithGoogle}>Sign In With Google</button>
        ) : (
          <>
            <p>Hi, {user.displayName}</p>
            <img
              src={user.photoURL ?? ""}
              alt="user image"
              className="user-photo"
            />
            <Link to="/favorites">Your favorites</Link>
            <button onClick={singOutOfGoogle}>Sign Out</button>
          </>
        )}
      </section>
      <section className="headingGroup2">
        <nav>
          <ul>
            <li className={hidden ? "hidden" : ""}>
              <Link to="/tracker">Nutrition Tracker</Link>
            </li>
            <li className={hidden ? "hidden" : ""}>
              <Link to="/barcode-scanner">Barcode Scanner</Link>
            </li>
            <li>
              <Link to="/recipes/:id">Recipes</Link>
            </li>
            <li className={hidden ? "hidden" : ""}>
              <Link to="/goals">Goals</Link>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
};

export default Header;
