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
    spay_neut,
    vaxxed,
    description,
    files
) => {
    try {
        const dateOfBirth = new Date(dob)
        sharp(path.join(__dirname, "..", "uploads", files[0].originalname))
            .resize(425, 300, {
                fit: "cover",
            })
            .toFormat("avif", { palette: true })
            .toFile(
                path.join(
                    __dirname,
                    "..",
                    "uploads",
                    name +
                        "_" +
                        dateOfBirth.getMonth() +
                        dateOfBirth.getFullYear() +
                        "_medium.avif"
                )
            )
        sharp(path.join(__dirname, "..", "uploads", files[0].originalname))
            .resize(50, 50, {
                fit: "fill",
            })
            .toFormat("avif", { palette: true })
            .toFile(
                path.join(
                    __dirname,
                    "..",
                    "uploads",
                    name +
                        "_" +
                        dateOfBirth.getMonth() +
                        dateOfBirth.getFullYear() +
                        "_thumbnail.avif"
                )
            )
        sharp(path.join(__dirname, "..", "uploads", files[0].originalname))
            .resize(550, 350, {
                fit: "contain",
                position: "right top",
            })
            .toFormat("avif", { palette: true })
            .toFile(
                path.join(
                    __dirname,
                    "..",
                    "uploads",
                    name +
                        "_" +
                        dateOfBirth.getMonth() +
                        dateOfBirth.getFullYear() +
                        "_large.avif"
                )
            )
        return await petDb.insertPet(
            name,
            dob,
            species,
            gender,
            filename,
            spay_neut,
            vaxxed,
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
    spay_neut,
    vaxxed,
    description
) => {
    try {
        const result = await petDb.putPet(
            id,
            name,
            dob,
            species,
            gender,
            filename,
            spay_neut,
            vaxxed,
            description
        )

        return result
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
