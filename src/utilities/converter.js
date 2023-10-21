import { format } from 'date-fns';

export const convertHourlyToDaily = (hourlyData) => {
  const dailyData = [];
  const dailyEntries = {};

  hourlyData.time.forEach((hourlyTime, index) => {
    const date = new Date(hourlyTime);
    const dateKey = format(date, 'do E', { weekStartsOn: 1 });

    if (!dailyEntries[dateKey]) {
      dailyEntries[dateKey] = {
        date: dateKey,
        temperature_2m: 0,
        relativehumidity_2m: 0,
        rain: 0,
        soil_moisture_1_3cm: 0,
        hourlyCount: 0,
      };
    }

    dailyEntries[dateKey].temperature_2m += hourlyData.temperature_2m[index];
    dailyEntries[dateKey].relativehumidity_2m += hourlyData.relativehumidity_2m[index];
    dailyEntries[dateKey].rain += hourlyData.rain[index];
    dailyEntries[dateKey].soil_moisture_1_3cm += hourlyData.soil_moisture_1_3cm[index];
    dailyEntries[dateKey].hourlyCount++;
  });

  // Convert daily entries to an array
  for (const dateKey in dailyEntries) {
    const dailyEntry = dailyEntries[dateKey];
    dailyEntry.temperature_2m /= dailyEntry.hourlyCount;
    dailyEntry.relativehumidity_2m /= dailyEntry.hourlyCount;
    dailyEntry.soil_moisture_1_3cm /= dailyEntry.hourlyCount;
    dailyData.push(dailyEntry);
  }

  return dailyData;
};


