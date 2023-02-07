function formatData(format, data) {
    if (data instanceof Object) {
        if (format ===  undefined) {
            format = 'json'; // default format if not specified.
        }
        if (format === 'json') {
            return JSON.stringify(data);
        }
        if (format === 'csv') {
            var json2csv = require('json2csv').parse;
            return json2csv(data);
        }
    } else {
        throw new Error(`${data} is neither JSON nor CSV.`);
    }
}

module.exports = {formatData}