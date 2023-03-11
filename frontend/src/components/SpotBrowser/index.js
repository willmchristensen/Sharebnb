import {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { NavLink, Route } from 'react-router-dom';
// import {getPokemon} from '../store/pokemon'

const SpotBrowser = () => {
//   const spots = useSelector(state => {
//     return state.allSpots.map(spotId => state.spots[spotId]);
//   });
//   console.log(spots)
    // useSelector(state => {
    //     console.log(state);
    // });
//   const dispatch = useDispatch(); 
//   useEffect(() => {
//     dispatch(getPokemon())
//   }, [dispatch]) 

//   if (!pokemon) {
//     return null;
//   }

  return (
    <h1>hi from all spots</h1>
    // <main>
    //   <nav>
    //     {/* {spots.map((spot) => {
    //       return (
    //         <NavLink key={spot.name} to={`/pokemon/${pokemon.id}`}>
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