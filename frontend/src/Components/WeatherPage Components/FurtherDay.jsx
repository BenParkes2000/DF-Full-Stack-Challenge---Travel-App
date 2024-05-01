import PropTypes from "prop-types";
import FurtherDayModel from "./FurtherDay.model";

const FurtherDay = ({ day }) => {
  const { date, description, icon, temp } = day;

  return (
    <div className="container align-items-center days2-5">
      <div>
        <h3>{date}</h3>
      </div>
      <div>
        <img src={icon} height="120" width="120" />
      </div>
      <div>
        <p>{temp} °C</p>
      </div>
      <div>
        <p>{description}</p>
      </div>
    </div>
  );
};

FurtherDay.propTypes = {
  day: PropTypes.instanceOf(FurtherDayModel),
};

export default FurtherDay;
