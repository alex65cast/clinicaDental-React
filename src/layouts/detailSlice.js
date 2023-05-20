
import { createSlice } from '@reduxjs/toolkit';

export const detailSlice = createSlice({
    name: 'detail',
    initialState: {
      data: {}
    },
    reducers: {
      addCharacter: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
      cleanCharacter: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
      
    }
    
});

//exporto las ACCIONES.....

//Exporto las acciones para el modo ESCRITURA
export const { addCharacter, cleanCharacter } = detailSlice.actions;


//exporto el método para el modo LECTURA
export const detailData = (state) => state.detail;

export default detailSlice.reducer;