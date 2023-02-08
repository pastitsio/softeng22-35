
exports.checkNotExistsError = (err) => {
    if (err) {
        if (err.name === 'TypeError' && /Cannot read property '\w+' of null/.test(err.message)) {
            return new Error("id does NOT exist!");
        }
        return err;
    }
}

