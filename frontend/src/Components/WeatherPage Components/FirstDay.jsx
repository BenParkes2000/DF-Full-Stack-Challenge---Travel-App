import PropTypes from "prop-types";
import FirstDayModel from "./FirstDay.model";

const FirstDay = ({ day }) => {
  const { date, description, icon, temp } = day;

  return (
    <div className="container align-items-center row day-one">
      <div className="col">
        <div>
          <h3>Todays Weather</h3>
          <p>{date}</p>
        </div>
        <div>
          <img src={icon} height="120" width="120" />
        </div>
      </div>
      <div className="col">
        <div>
          <p>{temp} °C</p>
        </div>
        <div>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

FirstDay.propTypes = {
  day: PropTypes.instanceOf(FirstDayModel),
};

export default FirstDay;
