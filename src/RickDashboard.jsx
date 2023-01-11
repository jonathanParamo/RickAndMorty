import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLocation } from "./store/slices/rickAndMorty"
import { rickApiCaracter } from "./api/rickAndMortyApi"
import "./index.css"

export const RickDashboard = () => {
  const dispatch = useDispatch()
  const [dataPj, setDataPj] = useState([]);

  const {
    location = [],
    isLoading,
    resident = [],
  } = useSelector( state => state.rickAndMorty )

  //  const infoPj = () => {
  //   // const pj = callCaracter()
  //   const regex = /(\d+)/g;
  //   // let url = pj.filter(urls => urls != undefined)

  //   Promise.all(url.map( element => {
  //     return rickApiCaracter.get("/"+element.match(regex))
  //   }))
  //   .then(res => {
  //     const inf = []

  //     res.forEach(({data}) => {
  //       inf.push(data)
  //       setDataPj(inf)
  //     })
  //   });
  // };

  const callCaracter = () => {
    const residente = location.map(({ residents }) => residents)

    residente.map( resi => {
      const regex = /(\d+)/g;

      if (resi[0] !== undefined) {
        const peti = rickApiCaracter.get("/"+resi[0].match(regex))
        .then(({data}) => {
          // return setDataPj((preState) => [...preState, data])
          return data
        })
        .then(data => setDataPj((prevState) => [... prevState, data]))
        return peti
      }
      // let url = resi.filter(urls => urls !== undefined )
      //   console.log(url, "urls")
    })
  }

  useEffect(() => {
    dispatch( getLocation() );
    callCaracter()
  }, [])

  // const infoPj = () => {
  //   const pj = callCaracter()
  //   const regex = /(\d+)/g;
  //   let url = pj.filter(urls => urls != undefined)

  //   Promise.all(url.map( element => { return rickApiCaracter.get("/"+element.match(regex))}))
  //   .then(res => {
  //     const inf = []

  //     res.forEach(({data}) => {
  //       // aqui tengo la data, pero al momento de querer guardarla en el state se crea un bucle,
  //       // o si la retorno no sale del .then
  //     });
  //     inf
  //   });
  // };

  const hasData = location?.length > 0;

  return (
    <div>
      <h1 className="title-dashboard">Rick y Morty</h1>
      <button
        disabled={ isLoading }
        onClick={ () => dispatch( getPokemons(page) ) }
      >
        Sigiente
      </button>
      <button
        disabled={ isLoading }
        onClick={ () => dispatch( getPokemons(page - 2) ) }
      >
        Anterior
      </button>
      {
        hasData && location.map(({
          name,
          id,
          dimension,
          created,
          type,
          residents,
        }) => {

          return (
            <section key={id}>
              <p>{id}</p>
              <h3>dimension: {dimension}</h3>
              <p>Name: {name}</p>
              <p>Type: {type}</p>
              <footer>Created: {created}</footer>
              {
                // dataPj.map(({ id, image }) => {
                //   // if (arr.includes(id) && id === id) {
                //     return <img className="image-pj" key={id} src={image}/>
                //   // }
                // })
              }
            </section>
          )
        })
      }
    </div>
  )
}