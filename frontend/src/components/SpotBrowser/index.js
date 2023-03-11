import {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route } from 'react-router-dom';
import {getPokemon} from '../store/pokemon'

const SpotBrowser = () => {
  const pokemon = useSelector(state => {
    return state.pokemon.list.map(pokemonId => state.pokemon[pokemonId]);
  });
 
  const dispatch = useDispatch(); 
  useEffect(() => {
    dispatch(getPokemon())
  }, [dispatch]) 

  if (!pokemon) {
    return null;
  }

  return (
    <h1>hi from all spots</h1>
    // <main>
    //   <nav>
    //     {/* {pokemon.map((pokemon) => {
    //       return (
    //         <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
    //           <div
    //             className={
    //               Number.parseInt(pokemonId) === pokemon.id
    //                 ? "nav-entry is-selected"
    //                 : "nav-entry"
    //             }
    //           >
    //             <div
    //               className="nav-entry-image"
    //               style={{ backgroundImage: `url('${pokemon.imageUrl}')` }}
    //             ></div>
    //             <div>
    //               <div className="primary-text">{pokemon.name}</div>
    //               <div className="secondary-text">
    //                 {pokemon.number} {pokemon.captured && "(Captured)"}
    //               </div>
    //             </div>
    //           </div>
    //         </NavLink>
    //       );
    //     })} */}
    //   </nav>
    // </main>
  );
};

export default SpotBrowser;