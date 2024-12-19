import { business } from "../definitions";
import { openHours } from "../definitions";

const daysOfTheWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function convertWeekDay(day: number) {
    let newDay;

    if (day === 0) {
        newDay = 6;
    } else {
        newDay = day - 1; 
    };

    return newDay;
}

function convertSingleDigit(time: string) {
    if (time.length === 1) {
        return `0${time}`
    } else {
        return time;
    }
}

function convertTimeToString(time: number) {
    let hours = convertSingleDigit(Math.floor(time / 100).toString());
    let minutes = convertSingleDigit((time % 100).toString());

    const newTime = `${hours}:${minutes}`;

    return newTime;
}

function addDaysToDate(date: Date, days: number) {
    let milliseconds = date.getTime();
    let addmilliseconds = days * 24 * 60 * 60 * 1000;
    const newDate = new Date(milliseconds + addmilliseconds);

    return newDate;
}

function convertOpenHours(openHours: openHours[]) {
    let convertedHours = [];

    for (let i = 0; i < openHours.length; i++) {
        const currentDate = new Date();
        let currentHours = convertSingleDigit(currentDate.getHours().toString());
        let currentMinutes = convertSingleDigit(currentDate.getMinutes().toString());

        const currentDay = convertWeekDay(currentDate.getDay()) + 1;
        const startDay = openHours[i].day + 1;
        let endDay = openHours[i].day + 1;

        if (openHours[i].is_overnight) {
            if (endDay === 7) {
                endDay = 1;
            } else {
                endDay = endDay + 1;
            }
        };
    
        const currentTime = `${currentHours}:${currentMinutes}`;
        const startTime = convertTimeToString(openHours[i].start);
        const endTime = convertTimeToString(openHours[i].end);
        
        const date = new Date(`1970-06-${convertSingleDigit(currentDay.toString())}T${currentTime}`);
        const startDate = new Date(`1970-06-${convertSingleDigit(startDay.toString())}T${startTime}`);
        const endDate = new Date(`1970-06-${convertSingleDigit(endDay.toString())}T${endTime}`);

        convertedHours.push({
            date: date,
            startDate: startDate,
            endDate: endDate
        });
    };

    console.log(convertedHours)
    return convertedHours;
}

function convertTimeToTwelve(time: number) {
    let hours = Math.floor(time / 100);
    let minutes = convertSingleDigit((time % 100).toString());
    let postfix;

    if (hours === 0) {
        hours = 12;
        postfix = 'AM';
    } else if (hours < 13) {
        postfix = 'AM';
    } else {
        hours = hours - 12;
        postfix = 'PM';
    }

    return `${hours}:${minutes} ${postfix}`
}

function checkTimeRange(date: Date, startDate: Date, endDate: Date) {
    return date >= startDate && date <= endDate;
}

export function checkHours(business: business) {
    const convertedHours = convertOpenHours(business.business_hours.open);
    const currentDay = convertWeekDay(new Date().getDay());
    let openUntil;
    let closedUntil;
    let day;

    for (let i = 0; i < convertedHours.length; i++) {
        const checkTime = checkTimeRange(
            convertedHours[i].date,
            convertedHours[i].startDate,
            convertedHours[i].endDate
        );

        if (checkTime) {
            openUntil = convertTimeToTwelve(business.business_hours.open[i].end);
            return {
                prefix: 'Open until ',
                time: openUntil,
                day: ''
                
            }
        }
    }

    for (let i = 0; i < convertedHours.length; i++) {
        let nextOpenHours;

        if (i === convertedHours.length - 1) {
            nextOpenHours = convertedHours[0];
        } else {
            nextOpenHours = convertedHours[i+1]
        };

        const checkTime = checkTimeRange(
            convertedHours[i].date,
            convertedHours[i].endDate,
            addDaysToDate(nextOpenHours.startDate, 7)
        );

        if (checkTime) {
            let hours;
            if (i === convertedHours.length - 1) {
                hours = business.business_hours.open[0];
                closedUntil = convertTimeToTwelve(hours.start);
                if (hours.day === currentDay) {
                    day = 'Today';
                } else if (hours.day === currentDay + 1) {
                    day = 'Tomorrow';
                } else {
                    day = daysOfTheWeek[hours.day];
                }
            } else {
                hours = business.business_hours.open[i+1];
                closedUntil = convertTimeToTwelve(hours.start);
                closedUntil = convertTimeToTwelve(hours.start);
                if (hours.day === currentDay) {
                    day = 'Today';
                } else if (hours.day === currentDay + 1) {
                    day = 'Tomorrow';
                } else {
                    day = daysOfTheWeek[hours.day];
                }
            };
        };
    };

    return {
        prefix: 'Closed until ',
        time: closedUntil,
        day: day
    }
}