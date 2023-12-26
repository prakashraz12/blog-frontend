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

export function timeElapsedString(date) {
    const inputDate = new Date(date);

    const now = new Date();
    const elapsedMilliseconds = now - inputDate;
    const seconds = Math.floor(elapsedMilliseconds / 1000);
  
    if (seconds < 60) {
      return `${seconds}s`;
    }
  
    const minutes = Math.floor(seconds / 60);
  
    if (minutes < 60) {
      return `${minutes}m`;
    }
  
    const hours = Math.floor(minutes / 60);
  
    if (hours < 24) {
      return `${hours}h`;
    }
  
    const days = Math.floor(hours / 24);
  
    if (days < 7) {
      return `${days}d`;
    }
  
    const weeks = Math.floor(days / 7);
  
    if (weeks < 4) {
      return `${weeks}w`;
    }
  
    const months = Math.floor(days / 30);
  
    if (months < 12) {
      return `${months}m`;
    }
  
    const years = Math.floor(days / 365);
  
    return `${years}y`;
  }
  

  
  
