import classes from './Scoreboard.module.css';
import { useSelector } from 'react-redux';

const Scoreboard = () => {
  const currentScore = useSelector((state) => state.player.currentScore);
  const highScore = useSelector((state) => state.player.highScore);

  return (
    <div className={classes.scoreboard}>
      <div className={classes.currentScore}>
        <p>Score:</p>
        <div className={classes.scoreContainer}>
          <p>{currentScore}</p>
        </div>
      </div>
      <div className={classes.highScore}>
        <p>High score:</p>
        <div className={classes.scoreContainer}>
          <p>{highScore}</p>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
