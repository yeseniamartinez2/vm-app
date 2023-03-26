const { petDb } = require("../db")

/*
 * if need to make calls to additional tables, data stores,
 * or call an external endpoint, add to this service
 */
const path = require("path")
const sharp = require("sharp")
const createPet = async (
    name,
    dob,
    species,
    gender,
    filename,
    kids_comp,
    pets_comp,
    description,
    files
) => {
    try {
        console.log(
            "🌿 ~ file: pet.service.js ~ line 22 ~ path.join(__dirname + ../uploads/ + files[0].originalname)",
            path.join(__dirname, "..", "uploads", files[0].originalname)
        )

        sharp(path.join(__dirname, "..", "uploads", files[0].originalname))
            .toFormat("png", { palette: true })
            .toFile(
                path.join(
                    __dirname,
                    "..",
                    "uploads",
                    files[0].originalname + "converted"
                )
            )
        return await petDb.insertPet(
            name,
            dob,
            species,
            gender,
            filename,
            kids_comp,
            pets_comp,
            description
        )
    } catch (e) {
        throw new Error(e.message)
    }
}

const getPets = async () => {
    try {
        const pets = await petDb.getPets()
        return pets
    } catch (e) {
        throw new Error(e.message)
    }
}

const getPetById = async (id) => {
    try {
        const pet = await petDb.getPetById(id)
        return pet
    } catch (e) {
        throw new Error(e.message)
    }
}

const deletePetById = async (id) => {
    try {
        return await petDb.deletePetById(id)
    } catch (e) {
        throw new Error(e.message)
    }
}

const putPet = async (
    id,
    name,
    dob,
    species,
    gender,
    filename,
    kids_comp,
    pets_comp,
    description
) => {
    try {
        return await petDb.putPet(
            id,
            name,
            dob,
            species,
            gender,
            filename,
            kids_comp,
            pets_comp,
            description
        )
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    createPet,
    getPets,
    getPetById,
    deletePetById,
    putPet,
}
