const express = require("express")

const { petController, adoptionRequestController } = require("../controllers")
const { optimizeImg } = require("../middlewares/image-resizing")
const router = express.Router()
const sharp = require("sharp")
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

router.post("/pets", upload.array("petPhoto"), petController.postPet)
router.get("/pets", petController.getPets)
router.get("/pets/:id", petController.getPetById)
router.put("/pets/:id", upload.array("petPhoto"), petController.putPet)
router.delete("/pets/:id", petController.deletePetById)

router.post("/adoption-requests", adoptionRequestController.postAdoptionRequest)
router.get("/adoption-requests", adoptionRequestController.getAdoptionRequests)
router.get("/adoption-requests/:id", adoptionRequestController.getRequestById)
router.get(
    "/user-adoption-requests/:email",
    adoptionRequestController.getRequestsByUser
)
router.put("/adoption-requests", adoptionRequestController.updateRequestStatus)
router.delete(
    "/adoption-requests/:id",
    adoptionRequestController.deleteRequestById
)

module.exports = router
