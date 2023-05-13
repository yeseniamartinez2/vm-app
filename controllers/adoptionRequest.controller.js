const { adoptionRequestService } = require("../services")

/*
 * call other imported services, or same service but different functions here
 */
const postAdoptionRequest = async (req, res, next) => {
    const {
        pet_id,
        user_email,
        user_fullname,
        phone_number,
        income,
        has_other_pets,
        has_kids,
        experience_description,
    } = req.body

    try {
        const result = await adoptionRequestService.createAdoptionRequest(
            pet_id,
            user_email,
            user_fullname,
            phone_number,
            income,
            has_other_pets,
            has_kids,
            experience_description
        )
        res.send(result)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const getAdoptionRequests = async (req, res, next) => {
    try {
        const adoptionRequests =
            await adoptionRequestService.getAdoptionRequests()
        res.json(adoptionRequests)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const deleteRequestById = async (req, res, next) => {
    const id = req.params.id
    try {
        await adoptionRequestService.deleteRequestById(id)
        res.sendStatus(202)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

const updateRequestStatus = async (req, res, next) => {
    const { id, status } = req.body
    try {
        const result = await adoptionRequestService.updateRequestStatus(
            id,
            status
        )

        res.send(result)
        next()
    } catch (e) {
        console.log(e.message)
        res.sendStatus(500) && next(error)
    }
}

module.exports = {
    postAdoptionRequest,
    getAdoptionRequests,
    deleteRequestById,
    updateRequestStatus,
}
