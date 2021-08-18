module.exports = (emailAddress) => {
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    console.log(emailAddress)
    console.log(emailAddress.match(mailFormat) ? true : false)
    return (emailAddress.match(mailFormat) ? true : false);
};