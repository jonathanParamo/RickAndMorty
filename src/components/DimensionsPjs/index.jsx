import "./index.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../store/slices/rickAndMorty"
import { rickApiCaracter } from "../../api/rickAndMortyApi";

export const DimensionPjs = ({id}) => {
  const dispatch = useDispatch()
  const [listOfDataByResident, setListOfDataByResident] = useState([]);
  const [resident, setResident ] = useState([])

  const {
    location = [],
  } = useSelector( state => state.rickAndMorty )

  useEffect(() => {
    if (!location.length) dispatch(getLocation());
    getResidentsData();
  }, [location])

  const idDimension = id ? id : 4
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
    let listOfUrls = urlResidentList.filter(url => url !== undefined);

    await requestByResident(listOfUrls, regex);
  };

  const requestByResident = (urlList, regex) => Promise.all(
    urlList.map(url => {
      url.forEach(element => {
        return rickApiCaracter.get("/"+element.match(regex))
      });
    })
  )
    .then((response) => response.map(({ data }) => data))
    .then((result) => setListOfDataByResident(result));

  return (
    <h1 className="hola">Hola mundo</h1>
  )
}