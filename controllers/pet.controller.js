const { petService } = require("../services")

/*
 * call other imported services, or same service but different functions here
 */
const postPet = async (req, res, next) => {
    const {
        name,
        dob,
        species,
        gender,
        filename,
        spay_neut,
        vaxxed,
        description,
    } = req.body
    const files = req.files
    try {
        const result = await petService.createPet(
            name,
            dob,
            species,
            gender,
            filename,
            spay_neut,
            vaxxed,
            description,
            files
        )
        res.send(result)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const getPets = async (req, res, next) => {
    try {
        const pets = await petService.getPets()
        res.json(pets)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const getPetById = async (req, res, next) => {
    const id = req.params.id
    try {
        const pet = await petService.getPetById(id)
        res.json(pet)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const deletePetById = async (req, res, next) => {
    const id = req.params.id
    try {
        await petService.deletePetById(id)
        res.sendStatus(202)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const putPet = async (req, res, next) => {
    const id = req.params.id
    const {
        name,
        dob,
        species,
        gender,
        filename,
        spay_neut,
        vaxxed,
        description,
    } = req.body
    try {
        const result = await petService.putPet(
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

        res.send(result)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

module.exports = {
    postPet,
    getPets,
    getPetById,
    deletePetById,
    putPet,
}
