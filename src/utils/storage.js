import AsyncStorage from "@react-native-async-storage/async-storage";

const Storage = {
    // Save any value (object, string, number, boolean)
    set: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (error) {
            console.error("Error saving to storage:", error);
        }
    },

    // Get any value
    get: async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            return value != null ? JSON.parse(value) : null;
        } catch (error) {
            console.error("Error reading from storage:", error);
            return null;
        }
    },

    // Remove single item
    remove: async (key) => {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error("Error removing from storage:", error);
        }
    },

    // Clear everything
    clear: async () => {
        try {
            await AsyncStorage.clear();
        } catch (error) {
            console.error("Error clearing storage:", error);
        }
    },

    // Get all keys
    getAllKeys: async () => {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            console.error("Error getting keys:", error);
            return [];
        }
    },
};

export default Storage;