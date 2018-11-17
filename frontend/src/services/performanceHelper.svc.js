export default class PerformanceHelperService{
    constructor() {

    }

    debounce(delay, callback, timerId = undefined){        
        return function(...args){
            if(timerId){
                clearTimeout(timerId);
            }
            timerId = setTimeout(() => {
                callback(...args);
                timerId = null;
            }, delay);

            return timerId;
        };
    }
}