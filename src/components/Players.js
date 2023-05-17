import classes from './Players.module.css'
import { useEffect, useRef } from 'react'
import PlayersCard from './PlayersCard'
import randomSort from './helpers/randomSort'
import { useSelector, useDispatch } from 'react-redux'
import { getCards } from '../Slices/PlayersSlice'
import { playerActions } from '../Slices/PlayersSlice'
let ignore = false

const Players = () => {
  const dispatch = useDispatch()
  const container = useRef(null)
  const players = useSelector((state) => state.player.players)
  const errorMsg = useSelector((state) => state.player.error)
  const selectedPlayers = useSelector((state) => state.player.selectedPlayers)
  const currentScore = useSelector((state) => state.player.currentScore)
  const isLoading = useSelector((state) => state.UI.isLoading)
  let shownPlayers = []
  let randomPlayers = []

  useEffect(() => {
    if (currentScore > 0 && currentScore === shownPlayers.length) {
      dispatch(playerActions.reset('You won'))
    }
  }, [dispatch, currentScore, shownPlayers.length])

  shownPlayers = [...players].slice(0, 10)
  randomSort(shownPlayers)
  randomPlayers = shownPlayers

  useEffect(() => {
    if (!ignore) {
      dispatch(getCards())
    }

    return () => {
      ignore = false
    }
  }, [dispatch])

  function handleClick(id) {
    console.log(...selectedPlayers)

    //find the corresponding object in players state
    const item = players.find((item) => item.id === id)
    //if player is already selected, reset the score
    if (selectedPlayers.includes(item)) {
      dispatch(playerActions.reset('You lost, try again!'))
    }
    //if it is not selected, update the score and mark it as selected by putting it in the selected array
    else {
      dispatch(playerActions.add(item))
    }
  }

  //for each player render a player card
  const list = randomPlayers //show just 5 cards
    .map((player) => (
      <PlayersCard
        key={player.id}
        club={player.club}
        country={player.country}
        position={player.position}
        name={player.name}
        img={player.img}
        handleClick={handleClick}
        id={player.id}
      />
    ))

  return (
    <div className={classes.mainContainer}>
      {isLoading && <h1 className={classes.loading}>Loading...</h1>}
      {players.length < 1 && errorMsg && (
        <p className={classes.error}>{errorMsg}</p>
      )}
      <div ref={container} className={classes.playersContainer}>
        {list}
      </div>
    </div>
  )
}

export default Players
