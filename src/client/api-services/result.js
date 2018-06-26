const result = (isSuccess, message) => {
    return {
        success: isSuccess,
        message,
    };
};

export default {
    fail: (message) => {
        return result(false, message);
    },
    success: (message) => {
        return result(true, message);
    }
};