function HashMap() {
    let storage = [];
    let capacity = 16;
    let loadFactor = 0;
    storage.length = capacity;

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return Math.abs(hashCode) % capacity;
    }

    function resize() {
        let oldStorage = storage;
        capacity *= 2;
        storage = new Array(capacity);
        loadFactor = 0;

        oldStorage.forEach(bucket => {
            if (bucket) {
                bucket.forEach(([key, value]) => {
                    set(key, value);
                });
            }
        });
    }

    function set(key, value) {
        let index = hash(key);
        if (storage[index] === undefined) {
            storage[index] = [[key, value]];
            loadFactor++;
        } else {
            let inserted = false;
            for (let i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    storage[index][i][1] = value;
                    inserted = true;
                    break;
                }
            }
            if (!inserted) {
                storage[index].push([key, value]);
                loadFactor++;
            }
        }

        if (loadFactor / capacity > 0.75) {
            resize();
        }
    }

    function get(key) {
        let index = hash(key);
        if (storage[index] === undefined) {
            return null;
        }
        for (let i = 0; i < storage[index].length; i++) {
            if (storage[index][i][0] === key) {
                return storage[index][i][1];
            }
        }
        return null;
    }

    function has(key) {
        return get(key) !== null;
    }

    function remove(key) {
        let index = hash(key);
        if (storage[index] === undefined) {
            return false;
        }
        for (let i = 0; i < storage[index].length; i++) {
            if (storage[index][i][0] === key) {
                storage[index].splice(i, 1);
                if (storage[index].length === 0) {
                    delete storage[index];
                }
                loadFactor--;
                return true;
            }
        }
        return false;
    }

    function length() {
        let counter = 0;
        storage.forEach(bucket => {
            if (bucket !== undefined) {
                counter += bucket.length;
            }
        });
        return counter;
    }

    function clear() {
        storage = new Array(16);
        capacity = 16;
        loadFactor = 0;
    }

    function keys() {
        let arrayOfKeys = [];
        storage.forEach(bucket => {
            if (bucket !== undefined) {
                bucket.forEach(([key, value]) => {
                    arrayOfKeys.push(key);
                });
            }
        });
        return arrayOfKeys;
    }

    function values() {
        let arrayOfValues = [];
        storage.forEach(bucket => {
            if (bucket !== undefined) {
                bucket.forEach(([key, value]) => {
                    arrayOfValues.push(value);
                });
            }
        });
        return arrayOfValues;
    }

    function entries() {
        console.log(storage);
    }

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries
    };
}