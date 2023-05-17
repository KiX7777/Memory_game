import classes from './PlayersCard.module.css';

const PlayersCard = (props) => {
  return (
    <div
      className={classes.playerCard}
      tabIndex={0}
      onClick={() => {
        props.handleClick(props.id);
      }}
    >
      <div className={classes.playerImg}>
        <img src={props.img} alt={props.name} />
        <div className={classes.playerInfo}>
          <div className={classes.blur}></div>
          <div className={classes.basicInfo}>
            <h3 className={classes.playerName}>{props.name}</h3>
            <span className={classes.playerCountry}>{props.country}</span>
          </div>
          <div className={classes.sideInfo}>
            <small className={classes.playerPosition}>{props.position}</small>
            <small className={classes.playerClub}>{props.club}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayersCard;
