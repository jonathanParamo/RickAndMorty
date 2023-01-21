import { Button, ButtonGroup } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"

export const MainMenu = () => {
  const navigate = useNavigate()
  const [ search, setSearch ] = useState("")


  const redirect2 = (search) =>{
    navigate(`/${search}`)
  }

  return (
    <div className="main-menu-container">
      <div className="search-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search pj"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={redirect2(search)}
        >
          <SearchIcon sx={{color: "#76c893"}} />
        </Button>
      </div>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined button group"
        sx={{
          '& .MuiButton-root': {
            border: '1px solid #f5f5f5',
            color: '#f5f5f5',
            '&:hover' : {
              bgcolor: '#f5f5f530',
              border: '1px solid #f5f5f5'
            }
          },
          '& .Mui-selected': {
            bgcolor: '#f5f5f540',
            '&:hover': {
              bgcolor: '#f5f5f520'
            }
          }
        }}
        >
        <Button
          href="/"
        >
          Home
        </Button>
        <Button
          href="/avatars"
          >
          Avatars
        </Button>
      </ButtonGroup>
    </div>
  )
}