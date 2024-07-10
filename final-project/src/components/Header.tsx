import { Link } from "react-router-dom";
import "./css/Header.css";
import { useContext, useEffect } from "react";
import userContext from "../context/UserContext";
import { singInWithGoogle, singOutOfGoogle } from "../firebaseConfig";
import AccountContext from "../context/AccountContext";

const Header = () => {
  const { user } = useContext(userContext);
  const { account, updateAccount } = useContext(AccountContext);



  useEffect(() => {
    updateAccount();
  }, [user])

  return (
    <header className="Header">
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
      <nav>
        <ul>
          <li>
            <Link to="/tracker">Nutrition Tracker</Link>
          </li>
          <li>
            <Link to="/barcode-scanner">Barcode Scanner</Link>
          </li>
          <li>
            <Link to="/recipes/:id">Recipes</Link>
          </li>
          <li>
            <Link to="/goals">Goals</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
