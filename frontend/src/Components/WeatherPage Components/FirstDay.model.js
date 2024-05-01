export default class FirstDayModel {
  constructor(date, description, icon, temp) {
    this.date = this.dateConverter(date);
    this.description = this.descriptionConverter(description);
    this.icon = this.iconConverter(icon);
    this.temp = Math.round(((temp - 273.15) * 10) / 10);
  }

  dateConverter(date) {
    const year = date.slice(0, 4);
    const month = this.monthNameGetter(date);
    const day = this.dayConverter(date.slice(8, 10));
    const dayName = this.dayNameGetter(date);

    const fullDate = `${dayName}, ${day} ${month} ${year}`;
    return fullDate;
  }

  monthNameGetter(date) {
    const dateConvert = new Date(date);
    const numOfMonth = dateConvert.getMonth();
    const daysOfMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return daysOfMonths[numOfMonth];
  }

  dayNameGetter(date) {
    const dateConvert = new Date(date);
    const numOfDay = dateConvert.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return daysOfWeek[numOfDay];
  }

  dayConverter(day) {
    if (day.charAt(0) === "0") day = day.charAt(1);
    switch (day) {
      case "1":
      case "21":
      case "31":
        return `${day}st`;
      case "2":
      case "22":
        return `${day}nd`;
      case "3":
      case "23":
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  descriptionConverter(description) {
    const spaceIndex = description.indexOf(" ");
    const upper1st = description.charAt(0).toUpperCase();
    const upper2nd = description.charAt(spaceIndex + 1).toUpperCase();
    const newDesc = `${upper1st}${description.slice(
      1,
      spaceIndex
    )} ${upper2nd}${description.slice(spaceIndex + 2)}`;
    return newDesc;
  }

  iconConverter(icon) {
    const iconLocation = `/assets/weather-icons/${icon}.svg`;
    return iconLocation;
  }
}
