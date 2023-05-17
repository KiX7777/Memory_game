import playersSlice from '../Slices/PlayersSlice';
import { configureStore } from '@reduxjs/toolkit';
import UISlice from '../Slices/UISlice';

const Store = configureStore({
  reducer: { player: playersSlice.reducer, UI: UISlice.reducer },
});

export default Store;
