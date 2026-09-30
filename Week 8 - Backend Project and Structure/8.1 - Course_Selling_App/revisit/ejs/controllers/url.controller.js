const URL = require('../models/Url');
const crypto = require('crypto');

async function shortenURL(req, res) {
    const { url } = req.body;
    if (!url) return res.send({ err: "No URL Provided" });

    const shortCode = crypto.randomBytes(6).toString('base64url');

    try {
        let created = await URL.create({
            originalUrl: url,
            shortCode,
            clicks: 0
        });

        return res.send({ msg: "Shorten URL Created!", code: created.shortCode });
    } catch (err) {
        console.log("Err: url controller", err.message);
        return res.send({ err: "Inernal server error" });
    }
}

async function getOriginalURL(req, res) {
    const shortCode = req.params.code;
    if (!shortCode) return res.send({ err: "No Code is provided" });

    try {
        const url = await URL.findOne({ shortCode });
        if (!url) return res.send({ msg: "Invalid Code" });

        url.clicks = Number(url.clicks || 0) + 1;
        await url.save();

        return res.redirect(url.originalUrl);
    } catch (err) {
        console.log("Err: getOriginalURL", err.message);
        return res.send({ err: "Internal Server error" });
    }
}

async function getUrlList(req, res){
    try{
        const urls = await URL.find({});
        return res.render('UrlList', {urls})
    }catch(err){
        res.send({err: "Internal Server errror"});
    }
}


module.exports = {
    shortenURL,
    getOriginalURL,
    getUrlList
}