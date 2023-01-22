import axios from "axios";

export const rickApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api"
});

export const rickApiCaracter = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character"
});

export const getPjRickApi = axios.create({
  baseURL: "https://rickandmortyapi.com/api/character"
})