import { Link } from 'react-router-dom';
import './css/Header.css'

const Header = () => {
  return (
    <header className='Header'>
        <h1><Link to="/">PlantPlate</Link></h1>
        <nav>
            <ul>
                <li><Link to="/favorites">Favorites</Link></li>
                <li><Link to="/tracker">Nutrition Tracker</Link></li>
                <li><Link to="/barcode-scanner">Barcode Scanner</Link></li>
                <li><Link to="/goals">Goals</Link></li>

            </ul>
        </nav>
    </header>
  )
};

export default Header;
