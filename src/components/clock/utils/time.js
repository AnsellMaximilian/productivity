function format(time){
    return time.toString().length > 1 ? time : `0${time}`
}

function mmss(miliseconds){
    const minutes = Math.floor(miliseconds/60000);
    const seconds = (miliseconds % 60000) / 1000;
    return `${format(minutes)}:${format(seconds)}`;
}

export {mmss}