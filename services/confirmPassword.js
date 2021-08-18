const bcrypt = require('bcrypt');

exports.decrypt = async (loginPassword, hash) => {
    bcrypt.compare(loginPassword, hash)
        .then(result => {
            return result;
        });
};