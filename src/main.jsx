import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './store'
import { Provider } from 'react-redux'
import { RickDashboard } from './components/RickAndMortyDashboard/RickDashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store }>
      <RickDashboard />
    </Provider>
  </React.StrictMode>,
)
