 //callback based, needs to wrap in promise so we can use await/async
export const getLocation = () => {
    return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true, //try GPS if possible for better accuracy
            maximumAge: 0, // do not cache, always get fresh data
            //timeout: 10000 // stop after 10 seconds maybe not needed for now
        });
    });
}

//no need to wrap in promise, already Promise-based
export const getCamera = async() => {
    return await navigator.mediaDevices.getUserMedia({ 
        video: true,
        audio: false
    });
}