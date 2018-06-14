var codes = new CountryCodes();
var dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

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
        days = weekPosition === 0 ? [] : Array.from(Array(weekPosition), (_, x) => '');
        for (let j = weekPosition; j < 7; j++) {
            if (currentDate.month() !== currentMonth || daysCounter > daysQuantity) {
                days.push('');
            } else {
                // days.push(currentDate.date());
                days.push(moment(currentDate));
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
    generateView(months);
    // let week = document.createElement('div');
}

function createDay(date) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(moment.isMoment(date) ? date.date() : ' '));
    return li;
}
function createWeek(week) {
    let ul = document.createElement("ul");
    ul.classList.add('days');
    week.forEach(date => {
        ul.appendChild(createDay(date));
    });
    return ul;
}

function createMonth(month) {
    //crear contenedor
    let div = document.createElement("div");
    
    //titulo
    let ul = document.createElement("ul");
    ul.classList.add('month');
    let li = document.createElement("li");
    let thisMonth = month[0].find(m => moment.isMoment(m));
    let title = thisMonth.format('MMMM') + ' - ' + thisMonth.format('YYYY');
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
    div.appendChild(ul);
    div.appendChild(ulDayNames);
    return div;
}

function generateView(months) {

    var calendar = document.getElementById("calendar");
    if (calendar) {
        document.body.removeChild(calendar);
        calendar = document.createElement("div");
        calendar.setAttribute("id", "calendar");
        document.body.appendChild(calendar);
    } 
    months.forEach(m => {
        let month = createMonth(m);
        m.forEach(w => {
            month.appendChild(createWeek(w));
        });
        calendar.appendChild(month);
    });
}
