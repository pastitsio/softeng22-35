function formatData(format, data) {
    if (format === 'json' || format === undefined) {
        return JSON.stringify(data);
    } else if (format === 'csv') {
        var json2csv = require('json2csv').parse;
        return json2csv(data);
    } else {
        throw new Error(`[${format}] is neither JSON nor CSV.`);
    }
}

module.exports = {
    formatData
};
