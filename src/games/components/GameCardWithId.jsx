import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
export const GameCardWithId = () => {
  const [gameCardId, setGameCardId] = useState({
    nombre: "",
    requerimientos: "",
    header_image: "",
    googleServ: "",
    mediafireServ: "",
    detalle: {
      background: "",
    },
  });
  const params = useParams();

  const getGameCardWithId = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/games/${params.id}`
    );
    setGameCardId(res.data.msg);
  };
  console.log(gameCardId);
  useEffect(() => {
    getGameCardWithId();
  }, []);

  return (
    <div>
      {gameCardId !== undefined && (
        <section>
          <span className="badge bg-danger d-flex justify-content-center text-center w-100 p-3">
            <FontAwesomeIcon icon={faGamepad} className="mx-3" />{" "}
            {gameCardId.requerimientos}
          </span>
          <div >
          <img src={gameCardId?.detalle[0]?.background} />
          <div className="container">
            <div className="row">
              <div className="col-md-9 mt-4 col-sm-12 ">
                <div>
                  <h3 className="text-light">{gameCardId.nombre}</h3>
                  <hr className="text-light" />
                  <div className="">
                    <img
                      src={gameCardId.header_image}
                      className="w-100"
                      />
                    <p className="text-light small mt-3">
                      Generos:{" "}
                      {gameCardId?.detalle[0]?.genres.map((genres) => (
                          <span className="text-light">
                          {genres.description + " | "}
                        </span>
                      ))}
                    </p>
                    <div className="text-light">
                      <h4>Descripción del juego: </h4>
                        <p dangerouslySetInnerHTML={{__html: gameCardId?.detalle[0]?.short_description }}></p>
                    </div>
                  </div>
                  <div className="">
                    <a
                      className="btn btn-outline-primary mx-3"
                      href={gameCardId.googleServ}
                      target="_blank"
                      >
                      Google Server
                    </a>
                    <a
                      className="btn btn-outline-primary"
                      href={gameCardId.mediafireServ}
                      target="_blank"
                      >
                      Mediafire
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-12 mt-4">
                <p className="text-light">columna 2</p>
              </div>
            </div>
      </div>
          </div>
        </section>
      )}
    </div>
  );
};
