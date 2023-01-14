import './App.css'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom"
import { RickDashboard } from './components/RickAndMortyDashboard/RickDashboard'
import { DimensionPjs } from './components/DimensionsPjs'
import { Title } from "./components/Title"

function App() {

  return (
    <main className="main-container">
      <Title />
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<RickDashboard />} />
          <Route  path="dimension" element={<DimensionPjs />} />
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
