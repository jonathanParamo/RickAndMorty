import "./index.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../store/slices/rickAndMorty"
import { rickApiCaracter } from "../../api/rickAndMortyApi";
import { useParams } from "react-router-dom";

export const DimensionPjs = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [listOfDataByResident, setListOfDataByResident] = useState([]);

  const {
    location = [],
  } = useSelector( state => state.rickAndMorty )

  useEffect(() => {
    if (!location.length) dispatch(getLocation());
    getResidentsData();
  }, [location])

  const idDimension = parseInt(id)

  const getListOfResidents = () => {
    const allResidents = []
    location.map(({ id, residents }) => {
      if(id === idDimension) {
        return allResidents.push(residents)
      }
    });
    const firstResidentByGroup = allResidents.map( resident => resident);
    return firstResidentByGroup;
  }

  const getResidentsData = async () => {
    const regex = /(\d+)/g;
    const urlResidentList = getListOfResidents();
    urlResidentList.filter(url => url !== undefined)
    let [ listOfUrls ] = urlResidentList.filter(url => url !== undefined);

    await requestByResident(listOfUrls, regex);
  };

  const requestByResident = (urlList, regex) => Promise.all(
    urlList.map(url => {
      return rickApiCaracter.get("/"+url.match(regex))
    })
  )
    .then((response) => response.map(({ data }) => data))
    .then((result) => setListOfDataByResident(result));

    const locationName = () => {
      const locationName = []
      location.map(({ id, dimension }) => {
        if(id === idDimension) {
          locationName.push(dimension)
        }
      })
      return locationName
    }

    const [name] = locationName()

    const hasData = listOfDataByResident && listOfDataByResident.length > 0

  return (
    <header className="container-cards-pjs">
      {
        <h3 className="dimension-name">Dimension: {name}</h3>
      }
      {
        hasData ? listOfDataByResident.map(({
          id,
          gender,
          image,
          name,
          species,
          status,
          type
        }) => {
          return (
            <section className="card-pj" key={id}>
              <img className="image-pj" src={image} />
              <h5>Name: {name}</h5>
              <p className="text-pj">Gender: {gender}</p>
              <p className="text-pj">Species: {species}</p>
              <p className="text-pj">Type: {type}</p>
              <p className="text-pj">Status: {status}</p>
            </section>
          )
        }) : <h5>This dimension has no characters</h5>
      }
    </header>
  )
}