export function dateToDateString(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

export function dateStringToDate(dateString) {
    const parts = dateString.split('-');
    const year = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10) - 1; // Month starts from 0
    const day = parseInt(parts[0], 10);
    return new Date(year, month, day);
}


export function showDateTime(isoString){
    if(isNaN(Number(isoString))) return "Invalid date";
    const date = new Date();
    // Options for the date part
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Options for the time part
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    // Format date and time separately
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    // Combine date and time
    return `${formattedDate} at ${formattedTime}`;
}



export function formatHumanReadableDateTime(isoString) {
    const date = new Date(isoString);

    // Options for the date part
    const dateOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    // Options for the time part
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    };

    // Format date and time separately
    const formattedDate = date.toLocaleDateString(undefined, dateOptions);
    const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

    // Combine date and time
    return `${formattedDate} at ${formattedTime}`;
}
