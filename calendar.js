var codes = new CountryCodes();

console.log(codes.get('CL'));

function generateCalendar() {
    var startDate, numberOfDays, countryCode;

    startDate = document.getElementById("startdate").value;
    numberOfDays = document.getElementById("numberofdays").value;
    countryCode = document.getElementById("countrycode").value;
    if (!countryCode || !startDate || !numberOfDays) {
        alert('Data required');
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
    console.log(startDate, numberOfDays, countryCode);

}