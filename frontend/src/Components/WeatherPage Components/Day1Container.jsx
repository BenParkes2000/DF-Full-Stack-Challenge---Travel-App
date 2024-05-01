import dummyWeatherData from "../dummyWeatherData.json";
import FirstDayModel from "./FirstDay.model";
import FirstDay from "./FirstDay";

const DayOne = ({ weatherData }) => {
  let i = 0;
  // const mappedData = [dummyWeatherData.dublin.list];
  // console.log(weatherData);
  // console.log(weatherData.list);

  if (!weatherData || !weatherData.list) return null;
  const mappedData = [weatherData.list];

  const days = mappedData.map((currentDay) => {
    const { description, icon } = currentDay[i].weather[0];
    const { temp } = currentDay[i].main;
    const { dt_txt: date } = currentDay[i];

    const day = new FirstDayModel(date, description, icon, temp);

    return <FirstDay day={day} key={day.date} />;
  });

  return (
    <>
      <div className="container-fluid weather">{days}</div>
    </>
  );
};

export default DayOne;
