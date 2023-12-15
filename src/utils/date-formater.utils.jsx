let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export const getDay = (timeStamp)=>{
    let date = new Date(timeStamp);
    return `${date.getDate()} ${months[date.getMonth()]}`
}

export const getFullDay = (timeStamp)=>{
    let date = new Date(timeStamp);

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
}
