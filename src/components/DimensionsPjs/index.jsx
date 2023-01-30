import "./index.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../store/slices/rickAndMorty"
import { rickApiCaracter } from "../../api/rickAndMortyApi";
import { useNavigate, useParams } from "react-router-dom";
import { PjCard } from "../PjCard";
import { Button } from "@mui/material";

export const DimensionPjs = () => {
  const navigate = useNavigate()
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
  const hasData = listOfDataByResident && listOfDataByResident.length > 0;

  return (
    <>
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
              <PjCard
                id={id}
                gender={gender}
                image={image}
                name={name}
                species={species}
                status={status}
                type={type}
              />
            )
          }) : <h5>This dimension has no characters</h5>
        }
      </header>
      <Button
        onClick={() => navigate("../")}
        sx={{ color: "#76c893" }}
      >
        Back
      </Button>
    </>
  )
}