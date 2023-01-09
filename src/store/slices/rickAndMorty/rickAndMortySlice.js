import { createSlice } from '@reduxjs/toolkit'

export const rickAndMortySlice = createSlice({
  name: 'location',
  initialState: {
    page: 0,
    location: [],
    residents: [],
    isLoading: false,
},
  reducers: {
    startLoadingRick: (state) => {
      state.isLoading = true
    },
    setLocation: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.location = action.payload.location;
    },
    setResidents: (state, action) => {
      state.isLoading = false;
      state.residents = action.payload.residents;
    },
  },
})

export const { startLoadingRick, setLocation, setResidents } = rickAndMortySlice.actions




