import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { rickApiCaracter } from "../../api/rickAndMortyApi";
import { PjCard } from "../PjCard";
import { Button } from "@mui/material";

export const Search = () => {
  const navigate = useNavigate()
  const { search } = useParams()
  const [ pjs, setPjs ] = useState([])

  const avatars = async (search) => {
    await rickApiCaracter.get(`?name=${search}`)
    .then(({data}) => data )
    .then(({results}) => setPjs(results))
  }

  useEffect(() => {
    avatars(search);
  }, [search])

  const hasDataSearch = search && search.length > 0;
  console.log(search, "searcj")

  return(
    <>
      <header className="container-cards-pjs">
        {
          hasDataSearch && pjs.map(({
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
          })
        }
      </header>
      <Button
        variant="outlined"
        onClick={() => navigate("../")}
        >
        Back
      </Button>
    </>
  )
}