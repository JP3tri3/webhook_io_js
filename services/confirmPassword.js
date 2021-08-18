const bcrypt = require('bcrypt');

module.exports = async (loginPassword, hash) => {
    bcrypt.compare(loginPassword, hash)
        .then(result => {
            return result;
        });
};