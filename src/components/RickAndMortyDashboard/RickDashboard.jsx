import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { rickApiCaracter } from "../../api/rickAndMortyApi"
import { getLocation } from "../../store/slices/rickAndMorty"
import "./index.css"

export const RickDashboard = () => {
  const dispatch = useDispatch()
  const [listOfDataByResident, setListOfDataByResident] = useState([]);
  const noImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn"+
  ":ANd9GcSmDAJQ4ep4I0VnYLlBzrzXFkuDB7Jm_l7P1g&usqp=CAU"

  const {
    location = [],
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

  const nameDimention = []
  location.filter(({residents}) => {
    const regex = /(\d+)/g;
    if(residents && residents.length > 0) {
      nameDimention.push(residents[0].match(regex))
    }
  })
  const image = listOfDataByResident.map(({ image }) => {
    if (nameDimention) {
      return image
    }
  })

  const hasData = location?.length > 0;

  return (
    <div className="main-container">
      <h1 className="title-dashboard">Rick y Morty</h1>
      <div className="container-card">
        {
          hasData && location.map(({
            name,
            id,
            dimension,
            created,
            type,
          }) => {
            return (
              <section className="section-card" key={id}>
                <img  className="img-card" src={image[id] || noImage} key={id} />
                <h3 className="card-dimention">dimension: {dimension}</h3>
                <p className="name-card">Name: {name}</p>
                <p>Type: {type}</p>
                <footer>Created: {created}</footer>
              </ section>
            )
          })
        }
      </div>
    </div>
  )
}