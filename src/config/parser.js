const multer = require('multer');

const upload = multer ({ dest: 'public/imgs/' });

module.exports = {upload};
