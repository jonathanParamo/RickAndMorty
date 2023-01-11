import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLocation } from "./store/slices/rickAndMorty"
import { rickApiCaracter } from "./api/rickAndMortyApi"
import "./index.css"

export const RickDashboard = () => {
  const dispatch = useDispatch()
  const [listOfDataByResident, setListOfDataByResident] = useState([]);

  const {
    location = [],
    isLoading,
    residents: resident = [],
  } = useSelector( state => state.rickAndMorty )

  useEffect(() => {
    if (!location.length) dispatch(getLocation());
    getResidentsData();
  }, [location])

  const getListOfResidents = () => {
    const allResidents = location.map(({ residents }) => residents);
    const firstResidentByGroup = allResidents.map( resident => resident[0]);
    return firstResidentByGroup;
  }

  const getResidentsData = async () => {
    const regex = /(\d+)/g;
    const urlResidentList = getListOfResidents();
    let listOfUrls = urlResidentList.filter(url => url !== undefined);

    await location ? requestByResident(listOfUrls, regex): null;
  };

  const requestByResident = (urlList, regex) => Promise.all(
    urlList.map( url => { return rickApiCaracter.get("/"+url.match(regex))})
  )
    .then((response) => response.map(({ data }) => data))
    .then((result) => setListOfDataByResident(result));

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