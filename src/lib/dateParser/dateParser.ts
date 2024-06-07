// Be aware that:
// Using these parsers causes losing seconds and milliseconds
// This issue won't be fixed

export const dateToIso = (date:string):string => {
    const d = new Date(date);
    const userTimezoneOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - userTimezoneOffset).toISOString()
}

export const isoToDate = (isoDate:string):string => {
    return isoDate.slice(0, 16)
}