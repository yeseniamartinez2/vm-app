const sharp = require("sharp")

const optimizeImg = function () {
    return function (req, res, next) {
        console.log("🌺 ~ file: image-resizing.js ~ line 5 ~ file", file)
        console.log("🌺 ~ file: image-resizeing.js ~ line 3 ~ req", req.file)
        sharp(req.files[0])
            .toFormat("png", { palette: true })
            .toFile(__dirname + "/uploads/test.jpg")
        next()
    }
}
module.exports = {
    optimizeImg: optimizeImg,
}
