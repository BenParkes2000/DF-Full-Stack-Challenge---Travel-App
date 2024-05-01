export default class FurtherDayModel {
  constructor(date, description, icon, temp) {
    this.date = this.dateConverter(date);
    this.description = this.descriptionConverter(description);
    this.icon = this.iconConverter(icon);
    this.temp = Math.round(((temp - 273.15) * 10) / 10);
  }

  dateConverter(date) {
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

    const dayName = daysOfWeek[numOfDay];
    return dayName;
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
