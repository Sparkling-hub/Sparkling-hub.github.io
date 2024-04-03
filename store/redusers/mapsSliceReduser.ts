

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import IMaps from '@/interface/IMaps';
import IOfficeCards from '@/interface/IOfficeCards';

interface MapsState {
  
  currentMap: IMaps | undefined;
  hovered: string | null;
  lastHovered: string;
  activeOfficePoint: string | null;
  activeOfficePointCoords: number[];
  officeCard: IOfficeCards | null;

}

const initialState: MapsState = {
  currentMap: undefined,
  hovered: null,
  lastHovered: '',
  activeOfficePoint: null,
  activeOfficePointCoords: [],
  officeCard: null,
};

const mapsSlice = createSlice({
  name: 'maps',
  initialState,
  reducers: {
    setCurrentMap: (state, action: PayloadAction<IMaps | undefined>) => {
      state.currentMap = action.payload;
    },
    setHovered: (state, action: PayloadAction<string | null>) => {
      state.hovered = action.payload;
    },
    setLastHovered: (state, action: PayloadAction<string>) => {
      state.lastHovered = action.payload;
    },
    setActiveOfficePoint: (state, action: PayloadAction<string | null>) => {
      state.activeOfficePoint = action.payload;
    },
    setActiveOfficePointCoords: (state, action: PayloadAction<number[]>) => {
      state.activeOfficePointCoords = [];
      state.activeOfficePointCoords = action.payload;
    },
    setOfficeCard: (state, action: PayloadAction<IOfficeCards | null>) => {
      state.officeCard = action.payload;
    },
  },
});

export const {

  setCurrentMap,
  setHovered,
  setLastHovered,
  setActiveOfficePoint,
  setActiveOfficePointCoords,  
  setOfficeCard,
  
} = mapsSlice.actions;

export const selectMaps = (state: RootState) => state.maps;

export default mapsSlice.reducer;
