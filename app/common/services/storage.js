/**
 * A helper service for storing and retrieving data from the browser database.
 */
export default class StorageService {
    /**
     * Get a value from the database.
     *
     * @param {string} key Value Key
     * @returns {Object|string}
     */
    get(key) {
        var item = localStorage.getItem(key);

        if(item) {
            item = item.replace(/"/g, '');
            return item;
        }

        return undefined;
    }

    /**
     * Insert/Replace an entry in the database.
     *
     * @param {string} key The key to use.
     * @param {string} data The value to store.
     */
    save(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    /**
     * Remove an entry from the database.
     *
     * @param {string} key The key of the item to remove.
     */
    remove(key) {
        localStorage.removeItem(key);
    }

    /**
     * Clears all entries in the local storage.
     */
    clearAll() {
        localStorage.clear();
    }
}

module.exports = StorageService;