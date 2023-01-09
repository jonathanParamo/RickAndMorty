import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment, incrementByAmount } from './store/slices/counter'
import { useState } from 'react'
import './App.css'

function App() {
  const {counter} = useSelector((state) => state.counter)
  const dispatch = useDispatch()
  const [pokemons, setPokemons] = useState([])

  const callApi = () => {
    fetch(`https://pokeapi.co/api/v2/move/`)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data)
      })
  }

  const {results} = pokemons ? pokemons : ""
  console.log(results ? pokemons : "");

  const res = results?.map(ele => {
    if (ele.hasOwnProperty("name")) {
      return ele.name
    }
  })
  console.log(counter);

  return (
    <div className="App">
      <button
        onClick={() => callApi()}
      >
        obtener pokemons
      </button>
      {res?.map((name) => {
        return(
          <p className='poke' key={name}>Nombre: {name}</p>
        )
      })}
      <p style={{color: 'black'}}>{counter}</p>
      <button
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      {counter !== 0 ?
      <button
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      : <button>Restar</button>
      }
      <button
        onClick={() => dispatch(incrementByAmount(2))}
      >
        Increment by 2
      </button>
    </div>
  )
}

export default App
