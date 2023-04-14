// Format date to yy/MM/dd
export function formatDate(date: Date) {
    var d = date,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

// Get dates with months in their respective number
export const formatDateWithNums = (date: Date) => {
    let months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let month = months[new Date(date).getMonth()];
    let dayNum = new Date(date).getDate();
    let year = new Date(date).getFullYear();

    return `${year}-${month}-${dayNum}`
}