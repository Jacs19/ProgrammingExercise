const codes = new CountryCodes();
const holidays = new Holidays();
const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
var tempHolidays;
var numberOfDays;

/**
 * Make a  <li> element with date
 * 
 * @name createDay
 * @param  {moment} date
 * @return {li} date.
 */

function createDay(date) {
    let li = document.createElement("li");
    if (moment.isMoment(date)) {
        li.appendChild(document.createTextNode(date.date()));
        let mmdd = date.format('MM') + '-' + date.format('DD');
        if (tempHolidays.days[mmdd]) {
            li.classList.add("holiday");
        } else if (date.day() === 0 || date.day() === 6) {
            li.classList.add("weekend");
        } else {
            li.classList.add("weekday");
        }
    } else {
        li.appendChild(document.createTextNode(''));
        li.classList.add("notaday");
    }
    return li;
}

/**
 * Make a <ul> element with a week on month.
 *  * 
 * @name createWeek
 * @param  {Array[moment]} week
 * @return {ul} <ul>.
 */

function createWeek(week) {
    let ul = document.createElement("ul");
    ul.classList.add('days');
    week.forEach(date => {
        ul.appendChild(createDay(date));
    });
    return ul;
}

/**
 * Make a <div> element with a current month.
 *  * 
 * @name createMonth
 * @param  {Array} month
 * @return {div} <div></div>.
 */

function createMonth(month) {
    //contenedor
    let div = document.createElement("div");

    //titulo
    let ul = document.createElement("ul");
    ul.classList.add('month');
    let li = document.createElement("li");
    let thisMonth = month[0].find(m => moment.isMoment(m));
    let title = thisMonth.format('MMMM') + ' ' + thisMonth.format('YYYY');
    li.appendChild(document.createTextNode(title));
    ul.appendChild(li);

    // Dias de la semana
    let ulDayNames = document.createElement("ul");
    ulDayNames.classList.add('weekdays');
    dayNames.forEach(dn => {
        liDayName = document.createElement("li");
        liDayName.appendChild(document.createTextNode(dn));
        ulDayNames.appendChild(liDayName);
    });
    // Agregar al DOM
    div.appendChild(ulDayNames);
    div.appendChild(ul);
    return div;
}

/**
 * Make a <div> element with a all days (array of months).
 * 
 * @name generateView 
 * @param  {Array} months
 * @return {div} <div></div>.
 */

function generateView(months) {
    var calendar = document.getElementById("calendar");
    if (calendar) {
        document.body.removeChild(calendar);
    }
    calendar = document.createElement("div");
    calendar.setAttribute("id", "calendar");
    document.body.appendChild(calendar);
    months.forEach(m => {
        let month = createMonth(m);
        m.forEach(w => {
            month.appendChild(createWeek(w));
        });
        calendar.appendChild(month);
    });
}

/**
 * Create the array of months that have formated data to make the view.
 *  * 
 * @name generateLogic
 * @param {moment} startDate initial date to start to count days
 * @param {moment} finishDate finish date 
 * @return {Array} Array of months
 */

function generateLogic(startDate, finishDate) {
    let week = [];
    let month = [];
    let months = [];

    let currentDate = moment(startDate);
    let daysCounter = 1;

    while (finishDate.diff(currentDate) > 0) {
        let currentMonth = currentDate.month();
        let weekPosition = currentDate.weekday();
        week = weekPosition === 0 ? [] : Array.from(Array(weekPosition), (_, x) => '');
        for (let j = weekPosition; j < 7; j++) {
            if (currentDate.month() !== currentMonth || daysCounter > numberOfDays) {
                week.push('');
            } else {
                week.push(moment(currentDate));
                currentDate.add(1, 'd');
                daysCounter += 1;
            }
        }
        month.push(week);
        if (currentDate.date() === 1) {
            months.push(month);
            month = [];
        }
    }
    if (currentDate.date() !== 1) {
        months.push(month);
    }
    return months;
}

/**
 * Main function that generates the logic and the view.
 *  * 
 * @name generateCalendar 
 */

function generateCalendar() {
    let tempDate = document.getElementById("startdate").value,
        countryCode = document.getElementById("countrycode").value;
    numberOfDays = parseInt(document.getElementById("numberofdays").value);
    if (!countryCode || !tempDate || !numberOfDays) {
        alert('Data required');
        return;
    }
    if (typeof countryCode === "string" && countryCode.length) {
        country = codes.get(countryCode);
        tempHolidays = holidays.get(countryCode);
        if (!country) {
            return alert('Invalid Country Code');
        }
    }
    let [startYear, startMonth, startDay] = [...tempDate.split('-').map(td => parseInt(td))];
    let startDate = moment().year(startYear).month(startMonth - 1).date(startDay);
    let finishDate = moment(startDate).add(numberOfDays, 'd');

    let months = generateLogic(startDate, finishDate);
    generateView(months);
}
