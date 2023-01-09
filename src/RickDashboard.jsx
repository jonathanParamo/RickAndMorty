import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLocation } from "./store/slices/rickAndMorty"
import { rickApiCaracter } from "./api/rickAndMortyApi"
import "./index.css"

export const RickDashboard = () => {
  const dispatch = useDispatch()
  const [dataPj, setDataPj] = useState([]);

  const {
    location = [],
    isLoading,
    residents: resident = [],
  } = useSelector( state => state.rickAndMorty )

  useEffect(() => {
    dispatch( getLocation() );
  }, [])

  const callCaracter = () => {
    const residente = location.map(({ residents }) => residents)
    const peti = residente.map( resi => resi[0])
    return peti
  }

  const infoPj = () => {
    const pj = callCaracter()
    const regex = /(\d+)/g;
    let url = pj.filter(urls => urls != undefined)

    Promise.all(url.map( element => { return rickApiCaracter.get("/"+element.match(regex))}))
    .then(res => {
      const inf = []

      res.forEach(({data}) => {
        // aqui tengo la data, pero al momento de querer guardarla en el state se crea un bucle,
        // o si la retorno no sale del .then
      });
      inf
    });
  };

  infoPj()
    // setData((prevState) => [...prevState, response]);
    // const response = peticion(residents[0]);
  const hasData = location?.length > 0;

  return (
    <div>
      <h1 className="title-dashboard">Rick y Morty</h1>
      <button
        disabled={ isLoading }
        onClick={ () => dispatch( getPokemons(page) ) }
      >
        Sigiente
      </button>
      <button
        disabled={ isLoading }
        onClick={ () => dispatch( getPokemons(page - 2) ) }
      >
        Anterior
      </button>
      {
        hasData && location.map(({
          name,
          id,
          dimension,
          created,
          type,
          residents,
        }) => {
          // const image = data.filter(({ id: personajeId }) => id === personajeId )
          return (
            <section key={id}>
            <p>{id}</p>
            <h3>dimension: {dimension}</h3>
            <p>Name: {name}</p>
            <p>Type: {type}</p>
            <footer>Created: {created}</footer>
            {

            }
          </ section>
          )
        })
      }
    </div>
  )
}