import "./styles.css";

export const PjCard = ({
  id,
  image,
  name,
  gender,
  species,
  type,
  status
}) => {
  return (
    <section className="card-pj" key={id}>
      <img className="image-pj" src={image} />
      <h4>Name: {name}</h4>
      <p className="text-pj">Gender: {gender}</p>
      <p className="text-pj">Species: {species}</p>
      <p className="text-pj">Type: {type}</p>
      <p className="text-pj">Status: {status}</p>
    </section>
  )
}