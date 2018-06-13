var codes = new CountryCodes();

function generateCalendar() {
    let tempDate = document.getElementById("startdate").value,
        numberOfDays = parseInt(document.getElementById("numberofdays").value),
        countryCode = document.getElementById("countrycode").value;
    // startDate = new Date(startDate);
    if (!countryCode || !tempDate || !numberOfDays) {
        alert('Data required');
        return;
    }
    if (typeof countryCode === "string" && countryCode.length) {
        country = codes.get(countryCode);
        if (!country) {
            alert('Invalid Country Code');
        } else {
            // document.write(country.name);
            // document.write(country.code);
        }
    }
    console.log();
    let [startYear, startMonth, startDay] = [...tempDate.split('-').map(td => parseInt(td))];
    let startDate = moment().year(startYear).month(startMonth - 1).date(startDay);
    let finishDate = moment(startDate).add(numberOfDays, 'd');
    // let [finishYear, finishMonth, finishDay] = [finishDate.year(), finishDate.month(), finishDate.date()];

    let daysQuantity = parseInt((finishDate).diff(startDate, 'days', true));

    let days = [];
    let weeks = [];
    let months = [];

    let currentDate = moment(startDate);
    let daysCounter = 1;
    let weeksQuantity = ((startDate.day() + numberOfDays) / 7);

    for (let i = 0; i < weeksQuantity; i++) {
        let currentMonth = currentDate.month();
        let weekPosition = currentDate.weekday();
        days = weekPosition === 0 ? [] : Array.from(Array(weekPosition), (_, x) => 'X');
        for (let j = weekPosition; j < 7; j++) {
            if (currentDate.month() !== currentMonth || daysCounter > daysQuantity) {
                days.push('X');
            } else {
                days.push(currentDate.date());
                currentDate.add(1, 'd');
                daysCounter += 1;
            }
        }
        weeks.push(days);
        if (currentDate.date() === 1) {
            months.push(weeks);
            weeks = [];
        }
    }
    if (currentDate.date() !== 1) {
        months.push(weeks);
    }

    console.table(months);
}