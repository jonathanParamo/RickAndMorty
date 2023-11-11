import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { rickApiCaracter } from "../../api/rickAndMortyApi";
import { PjCard } from "../../components/PjCard";
import { Button } from "@mui/material";
import "./styles.css";

export const Search = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  const [ pjs, setPjs ] = useState([]);

  const avatars = async (search) => {
    await rickApiCaracter.get(`?name=${search}`)
    .then(({data}) => data )
    .then(({results}) => setPjs(results))
  }

  useEffect(() => {
    avatars(search);
    pjs
  }, [search])

  const hasDataSearch = pjs && pjs.length > 0;

  return(
    <>
      <header className="container-cards-pjs">
        {
          hasDataSearch ? pjs.map(({
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
          }) : <p>No maches found.</p>
        }
      </header>
      <Button
        variant="outlined"
        onClick={() => navigate("../")}
        sx={{
          color: "#76c893",
          border: "1px solid #76c893",
          '&:hover' : {
            border: '1px solid #76c893'
          }
        }}
      >
        Back
      </Button>
    </>
  )
}