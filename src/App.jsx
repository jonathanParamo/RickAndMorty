import './App.css'
import {
  BrowserRouter
  as
  Router,
  Route,
  Routes
} from "react-router-dom";
import { RickDashboard } from './pages/RickAndMortyDashboard/RickDashboard';
import { DimensionPjs } from './pages/DimensionsPjs';
import { Title } from "./components/Title";
import { MainMenu } from './pages/MainMenu';
import { Search } from './pages/Search';
import { Box } from '@mui/material';
import { Avatars } from './pages/Avatars';

function App() {
  return (
    <main className="main-container">
      <Router>
        <Box
          sx={{
            display: { xs: "none", sm: "none", md: "block" },
            background: "transparent",
            color: "#76c893"
          }}
        >
          <Title />
        </Box>
        <MainMenu />
        <Routes>
          <Route>
            <Route path="/dashboard/*" element={<RickDashboard />} />
            <Route path="*" element={<RickDashboard /> } />
            <Route path="dimension/:id" element={<DimensionPjs />} />
            <Route path="search/:search" element={<Search />} />
            <Route path="avatars" element={<Avatars />} />
          </Route>
        </Routes>
      </Router>
    </main>
  )
}

export default App
