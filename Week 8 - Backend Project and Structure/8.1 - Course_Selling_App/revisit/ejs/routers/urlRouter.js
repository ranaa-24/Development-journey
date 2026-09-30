const {Router} = require('express');
const { shortenURL, getOriginalURL, getUrlList } = require('../controllers/url.controller');

const router = Router();

// /url/shortner
router.post('/shortner', shortenURL)

router.get('/list', getUrlList)

// /url/53JqqQ1e
router.get('/:code', getOriginalURL)


module.exports = router;