import { useState, useEffect } from "react";
import { PaginationAvatars } from "../../components/Pagination";
import { rickApiCaracter } from "../../api/rickAndMortyApi";
import { PjCard } from "../../components/PjCard";
import LinearDeterminate from "../../components/Loader";
import { Box } from "@mui/material";

export const Avatars = () => {
  const [ avatar, setAvatar ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ pages, setPages ] = useState(42);


  const avatars = async (page) => (
    rickApiCaracter.get(`/?page=${page}`)
    .then(({data}) => data)
    .then(({results}) => setAvatar(results))
    )

  useEffect(() => {
    avatars(page);
  }, [page])

  const handleChange = ( event, value) => {
    setPage(value);
  };

  const hasData = avatar?.length > 0 && avatar;

  return (
    <Box sx={{
      width: "100%",
      height: "calc(100vh - 135px)",
      display: "flex",
      flexWrap: "wrap",
      overflowY: "auto",
      flexDirection: "colum",
      alignItems: "flex-start",
      justifyContent: "center",
    }}>
      { hasData ? avatar.map(({
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
        }) : <Box>Sorry, no avatars found</Box>
      }
      { hasData &&
        <PaginationAvatars
          handleChange={handleChange}
          page={page}
          pages={pages}
        />
      }
    </Box>
  )
}