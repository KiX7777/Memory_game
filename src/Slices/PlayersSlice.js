import { createSlice } from '@reduxjs/toolkit';
import randomSort from '../components/helpers/randomSort';
import { UISliceActions } from './UISlice';
const initialState = {
  players: [],
  selectedPlayers: [],
  currentScore: 0,
  highScore: 0,
  isLoading: false,
  msg: '',
  error: '',
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    get(state, action) {
      state.players = action.payload;
    },
    add(state, action) {
      if (state.currentScore >= state.highScore) {
        state.currentScore++;
        state.highScore++;
        state.selectedPlayers = [...state.selectedPlayers, action.payload];
        state.msg = '';
      } else {
        state.currentScore++;
        state.selectedPlayers = [...state.selectedPlayers, action.payload];
        state.msg = '';
      }
    },
    reset(state, action) {
      state.msg = action.payload;
      state.selectedPlayers = [];
      state.currentScore = 0;
    },
    error(state, action) {
      state.error = action.payload;
    },
  },
});

export const getCards = () => {
  return async (dispatch) => {
    dispatch(UISliceActions.load(true));

    const sendRequest = async () => {
      const res = await fetch(
        'https://memory-game-792be-default-rtdb.firebaseio.com/Players.json'
      );

      if (!res.ok) {
        throw new Error('Error in loading data.');
      }
      const data = await res.json();

      let playersArr = [];

      //create object for each player
      for (const player in data) {
        const ply = {
          name: data[player].Name,
          country: data[player].Nationality,
          age: data[player].Age,
          club: data[player].Club,
          position: data[player].Position,
          img: data[player].img,
          id: player,
        };
        playersArr.push(ply);
      }
      randomSort(playersArr);
      return playersArr;
    };

    try {
      const data = await sendRequest();
      dispatch(playersSlice.actions.get(data));
      dispatch(UISliceActions.load(false));
    } catch (err) {
      dispatch(playersSlice.actions.error(err.message));
      dispatch(UISliceActions.load(false));
    }
  };
};

export const playerActions = playersSlice.actions;

export default playersSlice;
