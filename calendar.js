var codes = new CountryCodes();
var daysQuantity = 7;

console.log(codes.get('CL'));

function getWeekOfMonth(d) { // From Sunday
    var firstWeekday = (moment().year(d.year()).month(d.month()).day(1)).day();
    var offsetDate = d.date() + firstWeekday - 1;
    return Math.floor(offsetDate / 7);
}
function getWeeksInAMonth(d) {
    var firstOfMonth = new Date(d.year(), d.month() - 1, 1);
    var lastOfMonth = new Date(d.year(), d.month(), 0);
    var used = firstOfMonth.getDay() + lastOfMonth.getDate();
    return Math.ceil(used / 7);
}


function monthDiff(d1, d2) {
    let months = d2.month() - d1.month();
    return d1.year() === d2.year() ? months : months * (d2.year() - d1.year());
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
    let startDate = moment().year(startYear).month(startMonth - 1).date(startDay);
    let finishDate = moment().year(startYear).month(startMonth - 1).date(startDay + numberOfDays);
    let [finishYear, finishMonth, finishDay] = [finishDate.year(), finishDate.month(), finishDate.date()];
    // for (let i = startYear; i < finishYear; i++) {
    //     yearsQuantity =
    // };

    let monthsQuantity = monthDiff(startDate, finishDate);
    let weeksQuantity;

    // let tmpDaysQuantity = new Date(startYear, startMonth - 2, 0);
    let daysQuantity = parseInt((finishDate).diff(startDate, 'days', true));

    let months = [];
    let weeks = [];
    let days = [];

    // let firstMonth = startMonth - 1;
    let firstWeek = getWeekOfMonth(startDate);
    let currentDate = moment(startDate);
    let firstDay = currentDate.weekday();
    let daysCounter = 0;



    for (let k = 0; k <= monthsQuantity; k++) {
        weeks = [];
        weeksQuantity = getWeeksInAMonth(currentDate);
        for (let j = firstWeek; j < weeksQuantity; j++) {
            days = Array.from(Array(firstDay), (_, x) => 'X');
            let currentMonth = currentDate.month();

            for (let i = days.length; i < 7; i++) {
                let currentDay = currentDate.date();
                if (currentDate.month() > currentMonth || daysCounter > daysQuantity)  {
                    days.push('X');
                } else {
                    days.push(currentDay);
                    currentDate.add(1, 'd');
                    daysCounter += 1;
                }
            }

            weeks.push(days);
            firstDay = currentDate.day();
            if (daysCounter >= daysQuantity) {
                break;
            }
        }
        months.push(weeks);
        console.table(months);
        firstWeek = 0;
    }
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