function generateToken(){
    return 'sha' + Date.now();
}

module.exports = {generateToken};