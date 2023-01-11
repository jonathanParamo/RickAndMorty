import { rickApi, rickApiCaracter } from "../../../api/rickAndMortyApi";
import { startLoadingRick, setLocation, setResidents } from "./rickAndMortySlice";

export const getLocation = () => {
  return async( dispatch, getState ) => {
    dispatch( startLoadingRick() );

    const { data } = await rickApi.get(`/location`);

    dispatch( setLocation({ location: data.results }) )
  }
}

export const getResidents = (link) => {
  return async( dispatch, getState ) => {
    let regex = /(\d+)/g;
    dispatch( startLoadingRick() );

    // console.log(await rickApiCaracter.get("/"+link.match(regex)))
    const { data } = await rickApiCaracter.get("/"+link.match(regex));
    // console.log("data2:", data);
    dispatch( setResidents({ resident: data }) )
  }
}