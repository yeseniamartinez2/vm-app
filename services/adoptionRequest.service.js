const { adoptionRequestDb } = require("../db")

/*
 * if need to make calls to additional tables, data stores,
 * or call an external endpoint, add to this service
 */

const createAdoptionRequest = async (
    pet_id,
    user_email,
    user_fullname,
    phone_number,
    income,
    has_other_pets,
    has_kids,
    experience_description
) => {
    try {
        return await adoptionRequestDb.insertAdoptionRequest(
            pet_id,
            user_email,
            user_fullname,
            phone_number,
            income,
            has_other_pets,
            has_kids,
            experience_description
        )
    } catch (e) {
        throw new Error(e.message)
    }
}

const getAdoptionRequests = async () => {
    try {
        const adoptionRequests = await adoptionRequestDb.getAdoptionRequests()
        return adoptionRequests
    } catch (e) {
        throw new Error(e.message)
    }
}

const deleteRequestById = async (id) => {
    try {
        return await adoptionRequestDb.deleteRequestById(id)
    } catch (e) {
        throw new Error(e.message)
    }
}

const updateRequestStatus = async (id, status) => {
    try {
        const result = await adoptionRequestDb.updateRequestStatus(id, status)

        return result
    } catch (e) {
        throw new Error(e.message)
    }
}

module.exports = {
    createAdoptionRequest,
    getAdoptionRequests,
    deleteRequestById,
    updateRequestStatus,
}
