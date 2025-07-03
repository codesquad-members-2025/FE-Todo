function getRandomId() {
    return Math.floor(Math.random() * 100000);
}

function getISODate(date) {
    const pad = num => String(num).padStart(2, '0');
    
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
           `T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

export { getRandomId, getISODate }