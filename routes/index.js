const express = require("express");

const { petController } = require("../controllers");

const router = express.Router();

const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null , file.originalname );
    }
  });
  
  const upload = multer({ storage: storage });

router.post("/pets", upload.array('petPhoto'), petController.postPet);
router.get("/pets", petController.getPets);
router.get("/pets/:id", petController.getPetById);
router.put("/pets/:id", petController.putPet);
router.delete("/pets/:id", petController.deletePetById);

module.exports = router;
