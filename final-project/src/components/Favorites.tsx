import { useContext } from 'react';
import './css/Favorites.css'
import UserContext from '../context/UserContext';
import RecipeCard from './RecipeCard';

const Favorites = () => {
  const {user} = useContext(UserContext);
  return (
    <div className='Favorites'>
        {user?.favorites.map((r) => <RecipeCard recipe={r}/>)}
    </div>
  )
};

export default Favorites;
