import dummyWeatherData from "../dummyWeatherData.json";
import FurtherDayModel from "./FurtherDay.model";
import FurtherDay from "./FurtherDay";

// const DaysTwoToFive = (data) => {
//   let i = 8;
//   const mappedData = [dummyWeatherData.dublin.list];

//   const days = mappedData.map((currentDay) => {
//     const usable = [];

//     currentDay.forEach((data, i) => {
//       if (i % 8 === 0 && i !== 0) {
//         const { description, icon } = data.weather[0];
//         const { temp } = data.main;
//         const { dt_txt: date } = data;

//         const day = new FurtherDayModel(date, description, icon, temp);
//         usable.push(day);
//       }
//     });

//     return (
//       <div className="row">
//         <div className="col-6 col-sm-6 col-md-6 col-lg-3" key={usable[0].date}>
//           <FurtherDay day={usable[0]} />
//         </div>
//         <div className="col-6 col-sm-6 col-md-6 col-lg-3" key={usable[1].date}>
//           <FurtherDay day={usable[1]} />
//         </div>
//         <div className="col-6 col-sm-6 col-md-6 col-lg-3" key={usable[2].date}>
//           <FurtherDay day={usable[2]} />
//         </div>
//         <div className="col-6 col-sm-6 col-md-6 col-lg-3" key={usable[3].date}>
//           <FurtherDay day={usable[3]} />
//         </div>
//       </div>
//     );
//   });

//   return (
//     <>
//       <div className="container-fluid weather">
//         <div>{days}</div>
//       </div>
//     </>
//   );
// };

// Refactored with AI
const DaysTwoToFive = ({ weatherData }) => {
  if (!weatherData || !weatherData.list) return null;

  const mappedData = [weatherData.list];
  // const mappedData = [dummyWeatherData.dublin.list];

  const days = mappedData.map((currentDay, index) => {
    const usable = currentDay
      .filter((data, i) => i % 8 === 0 && i !== 0)
      .map((data) => {
        const { description, icon } = data.weather[0];
        const { temp } = data.main;
        const { dt_txt: date } = data;
        return new FurtherDayModel(date, description, icon, temp);
      });

    return (
      <div className="row" key={index}>
        {usable.map((day, i) => (
          <div className="col-6 col-sm-6 col-md-6 col-lg-3" key={day.date}>
            <FurtherDay day={day} />
          </div>
        ))}
      </div>
    );
  });

  return <div className="container-fluid weather">{days}</div>;
};

export default DaysTwoToFive;
