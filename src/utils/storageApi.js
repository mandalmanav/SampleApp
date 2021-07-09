import  AsyncStorage  from '@react-native-community/async-storage';
export const addContact = (contact) => {
    let uid = new Date().getTime()
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                await AsyncStorage.setItem(String(uid), JSON.stringify({ id: uid, ...contact }))
                resolve({ id: uid, ...contact })
            }
            catch (e) { 
                reject()
            }
        })()
    })

}
export const getAllContacts = () => {
    let contacts = []

    return new Promise((resolve, reject) => {
        (async () => {
            try {
                AsyncStorage.getAllKeys((err, keys) => {
                    if (err != null) {
                        reject()
                    }
                    else {
                        AsyncStorage.multiGet(keys, (err, stores) => {
                            stores.map(store => {
                                contacts.push(JSON.parse(store[1]))
                            })
                            resolve(contacts)
                        });

                    }

                })
            }
            catch (e) {
                reject()
            }
        })()
    })
}

export const updateContact = (id, contact) => {
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                AsyncStorage.mergeItem(String(id), JSON.stringify(contact))
                resolve()
            }
            catch (e) {
                reject(e)
            }
        })()
    })
}

export const deleteContact = (id) => {
    return new Promise((resolve, reject) => {
        try {
            (async () => {
                await AsyncStorage.removeItem(String(id))
                resolve()
            })()


        }
        catch (e) {
            reject()
        }
    })
}