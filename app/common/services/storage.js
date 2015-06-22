/**
 * Created by waeljammal on 31/03/15.
 */
export default class StorageService {
    get(key) {
        var item = localStorage.getItem(key);

        if(item) {
            item = item.replace(/"/g, '');
            return item;
        }

        return undefined;
    }

    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    clearAll() {
        localStorage.clear();
    }
}

module.exports = StorageService;