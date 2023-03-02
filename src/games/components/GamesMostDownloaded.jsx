import React, {useState, useEffect} from 'react'
import { useGameStore } from '../hooks/useGameStore';
import { Link } from "react-router-dom";
export const GamesMostDownloaded = () => {
    const [gameMostDownloaded, setGameMostDownloaded,] = useState([]);
    const {games, startLoadingGames, setActiveGame} = useGameStore();


        const handleAddGameMostDownloaded = () => {
            const filterMostDownloaded = games.filter((item) => item.mostDownloaded === false);
            setGameMostDownloaded(filterMostDownloaded);
            setActiveGame(null);
        }

        useEffect(() => {
            if(games.length === 0){
                startLoadingGames();
              }
              handleAddGameMostDownloaded();
        },  [games])

       

    return (
        <>
            <h5 className="text-light text-center backgroundEvent">Los más descargados hasta el momento</h5>

            {gameMostDownloaded ? gameMostDownloaded.map((item, index) => (
                <div className="imagenMostWanted" key={item._id}>
                 <h2 className="position-absolute mx-2 mt-1 backgroundIndexMostWantedCard ">#{index + 1}</h2>
                     <Link to={`juegos/${item._id}`}>
                 <div className="backgroundMostWantedCard mb-2 " >
                   <img src={item.header_image}  className=" w-100 "/>
                </div>
                 </Link>
            </div>
            )) : (<span>Cargando...</span>)}


        </>
    )
}
