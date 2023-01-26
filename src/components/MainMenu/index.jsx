import { Box, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import "./styles.css"
import { Title } from "../Title"

export const MainMenu = () => {
  const navigate = useNavigate()
  const [ search, setSearch ] = useState("")
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    navigate("/")
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const redirect = (search) => {
    navigate(`search/${search}`)
  }

  return (
    <div className="main-menu-container">
      <Stack spacing={2}>
        <Paper
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            background: "transparent",
            color: "#76c893"
          }}
        >
          <MenuList sx={{ display: "flex" }}>
            <div className="search-container">
              <input
                type="search"
                className="search-input"
                placeholder="Search pj"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={() => {
                  redirect(search)
                  handleClose()
                }}
              >
                <SearchIcon sx={{ color: "#76c893"}} />
              </Button>
            </div>
            <MenuItem
              onClick={() => navigate("/")}
              sx={{ fontSize: "19" }}
            >
              <HomeIcon sx={{ color: "#76c893", marginRight: "5px" }}/>
              Home
            </MenuItem>
            <MenuItem
              onClick={() => navigate("/avatars")}
              sx={{ fontSize: "19" }}
            >
              <Diversity3Icon sx={{ color: "#76c893", marginRight: "5px" }} />
              Avatars
            </MenuItem>
          </MenuList>
        </Paper>
        <Box sx={{ display: { sm: "block", md: "none" }}} >
          <Box sx={{ display: "flex", flexDirection: "row", }} >
            <Box
              sx={{
                display: { sm: "block", md: "none" },
                color: "#76c893",
                display: "flex",
                justifyItems: "center",
                width: "39px",
                height: "39px"
              }}
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <MenuIcon sx={{ width: "100%", height: "100%" }} />
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" }}} >
              <Title />
            </Box>
          </Box>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}
                >
                <Paper
                  sx={{
                    flexDirection: "row",
                    color: "#76c893",
                    background: "#3e5c7690",
                    width: "90%"
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                      >
                      <MenuItem onClick={handleClose}>
                        <HomeIcon sx={{ color: "#76c893", marginRight: "5px" }}/>
                        Home
                      </MenuItem>
                      <MenuItem onClick={handleClose}>
                        <Diversity3Icon sx={{ color: "#76c893", marginRight: "5px" }} />
                        Avatars
                      </MenuItem>
                      <div className="search-container">
                        <input
                          type="search"
                          className="search-input"
                          placeholder="Search pj"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button
                          onClick={() => {
                            redirect(search)
                            handleClose()
                          }}
                        >
                          <SearchIcon sx={{ color: "#76c893" }} />
                        </Button>
                      </div>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Box>
      </Stack>
  </div>
  )
}