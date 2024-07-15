import "./css/Home.css";
import cow from "../assets/cow.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="Home">
      <div id="cow-container">
        <img src={cow} className="home-img" />
      </div>
      <h2>
        Less meat and more plants on your plates{" "}
        <a href="https://www.oxfordmartin.ox.ac.uk/news/201603-plant-based-diets">
          saves lives
        </a>{" "}
        and the environment!
      </h2>
      <h3>If you need some vegan recipes, let us help!</h3>
      <Link to="/recipes">
        <button>Find my next meal</button>
      </Link>
    </div>
  );
};

export default Home;
