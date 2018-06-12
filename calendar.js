var codes = new CountryCodes();
var daysQuantity = 7;

console.log(codes.get('CL'));

function getWeekOfMonth(d) { // From Sunday
    var firstWeekday = new Date(d.getFullYear(), d.getMonth(), 1).getDay();
    var offsetDate = d.getDate() + firstWeekday - 1;
    return Math.floor(offsetDate / 7);
}
function getWeeksInAMonth(d) {
    var firstOfMonth = new Date(d.getFullYear(), d.getMonth() - 1, 1);
    var lastOfMonth = new Date(d.getFullYear(), d.getMonth(), 0);
    var used = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil(used / 7);
}
function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

// Date.prototype.addDays = function (days) {
//     var dat = new Date(this.valueOf());
//     dat.setDate(dat.getDate() + days);
//     return dat;
// };


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
    let finishYear, finishMonth, finishDay;
    let startDate = new Date(startYear, startMonth - 1, startDay);
    let finishDate = new Date(startYear, startMonth - 1, startDay + numberOfDays);

    let monthsQuantity = monthDiff(startDate, new Date(finishDate));
    let weeksQuantity = getWeeksInAMonth(startDate);

    let tmpDaysQuantity = new Date(startYear, startMonth - 2, 0);
    let daysQuantity = tmpDaysQuantity.getDate();

    let months = [];
    let weeks = [];
    let days = [];

    let firstWeek = getWeekOfMonth(startDate);
    let currentDate = moment(startDate);
    let firstDay = currentDate.weekday();

    for (var j = firstWeek; j < weeksQuantity; j++) {
        days = Array.from(Array(firstDay), (_, x) => 'X');
        let currentMonth = currentDate.month();
        for (var i = days.length; i < 7; i++) {
            let currentDay = currentDate.date();
            if (currentDate.month() > currentMonth) {
                days.push('X');
            } else {
                days.push(currentDay);
                currentDate.add(1, 'd');
            }
        }
        firstDay = 0;
        weeks.push(days);

    }
    firstWeek = 0;

    console.table(weeks);
    console.log('start:', startDay, startMonth, startYear);
    console.log('finish:', finishDay, finishMonth, finishYear);

    console.log('start:', startDate);
    console.log('finish:', finishDate);
    console.log('number of days:', numberOfDays);
    console.log('code:', countryCode);
    console.log('months', monthsQuantity);
    console.log('weeks', weeksQuantity);
    console.log('days', daysQuantity);
    // console.log('starweek', startWeek);

}


// let week = document.createElement('div');

// for (let i = 0; i < days; i++) {
//     let day = document.createElement('li');
//     day.appendChild(document.createTextNode(i));
// }


// newDiv.appendChild(newContent); //añade texto al div creado. 

// // añade el elemento creado y su contenido al DOM 
// var currentDiv = document.getElementById("calendar");
// document.body.insertBefore(newDiv, currentDiv);



// console.log('a', days);