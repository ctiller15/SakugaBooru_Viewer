class cacheService{
    constructor(){

    }

    // use sessionStorage.
    createPrivateCache(queryType, queryParam, callback, storageTime) {
        const nowms = (new Date()).getTime();
        const storageKey = `${queryType}-${queryParam}`;
        const storageData = JSON.parse(sessionStorage.getItem(storageKey));

        let expired = false;
        if(storageData && (nowms - storageData.time >= storageTime)){
            expired = true;
        }

        if(storageData && !expired){
            return Promise.resolve(storageData.cacheData);
        } else {
            return callback(queryParam)
            .then((response) => {
                const storageObject = {
                    cacheData: response.data,
                    time: nowms
                };
                sessionStorage.setItem(storageKey, JSON.stringify(storageObject));
                return storageObject.cacheData;
            });
        }
    }
}

const frontEndCache = new cacheService();
export default frontEndCache;