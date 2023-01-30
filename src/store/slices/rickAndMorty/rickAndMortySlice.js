import { createSlice } from '@reduxjs/toolkit'

export const rickAndMortySlice = createSlice({
  name: 'location',
  initialState: {
    page: 0,
    location: [],
    resident: [],
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
      state.resident = action.payload.resident;
    },
  },
})

export const { startLoadingRick, setLocation, setResidents } = rickAndMortySlice.actions




