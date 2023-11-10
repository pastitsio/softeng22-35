function formatData(format, data) {
    if (format === 'json' || format === undefined) {
        return JSON.stringify(data);
    } else if (format === 'csv') {
        return require('json2csv').parse(data);
    } else {
        throw new Error(`[${format}] is neither JSON nor CSV.`);
    }
}

module.exports = { formatData };
