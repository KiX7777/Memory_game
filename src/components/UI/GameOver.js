import classes from './GameOver.module.css';
import { useSelector } from 'react-redux';

export const GameOver = () => {
  const msg = useSelector((state) => state.player.msg);
  return <div className={classes.gameover}>{msg}</div>;
};
