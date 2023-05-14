const dbo = require("../config/conn")
var ObjectId = require("mongodb").ObjectId
const insertAdoptionRequest = async (
    pet_id,
    user_email,
    user_fullname,
    phone_number,
    income,
    has_other_pets,
    has_kids,
    experience_description
) => {
    var o_pet_id = new ObjectId(pet_id)
    const adoption_request = {
        pet_id: o_pet_id,
        user_email: user_email,
        user_fullname: user_fullname,
        phone_number: phone_number,
        income: income,
        has_other_pets: has_other_pets,
        has_kids: has_kids,
        experience_description: experience_description,
        status: "submitted",
        date_submitted: new Date(),
    }
    const dbConnect = dbo.getDb()
    const result = await dbConnect
        .collection("adoption_requests")
        .insertOne(adoption_request)
    return result
}

const getAdoptionRequests = async () => {
    const dbConnect = dbo.getDb()
    return await dbConnect
        .collection("adoption_requests")
        .aggregate([
            {
                $lookup: {
                    from: "pets",
                    localField: "pet_id",
                    foreignField: "_id",
                    as: "pet",
                },
            },
        ])
        .toArray()
        .then((results) => {
            return results
        })
}

const deleteRequestById = async (id) => {
    const dbConnect = dbo.getDb()
    var o_id = new ObjectId(id)
    dbConnect
        .collection("adoption_requests")
        .deleteOne({ _id: o_id }, function (err, result) {
            if (err) {
                console.log("Error deleting request!")
            } else {
                console.log(`Deleted request with id ${id}`)
            }
        })
}

const updateRequestStatus = async (id, status) => {
    const dbConnect = dbo.getDb()
    var o_id = new ObjectId(id)

    return dbConnect.collection("adoption_requests").updateOne(
        { _id: o_id },
        {
            $set: {
                status: status,
            },
        },
        { upsert: true },
        function (err, result) {
            if (err) {
                console.log("Error updating request status!")
            } else {
                console.log(`Updated request with id ${id}`)
            }
        }
    )
}

const getRequestById = async (id) => {
    const dbConnect = dbo.getDb()
    var o_id = new ObjectId(id)
    return await dbConnect
        .collection("adoption_requests")
        .find({ _id: o_id })
        .toArray()
        .then((results) => {
            return results
        })
}

const getRequestsByUser = async (email) => {
    const dbConnect = dbo.getDb()
    return await dbConnect
        .collection("adoption_requests")
        .aggregate([
            {
                $lookup: {
                    from: "pets",
                    localField: "pet_id",
                    foreignField: "_id",
                    as: "pet",
                },
            },
            { $match: { user_email: email } },
        ])
        .toArray()
        .then((results) => {
            return results
        })
}

module.exports = {
    insertAdoptionRequest,
    getAdoptionRequests,
    deleteRequestById,
    updateRequestStatus,
    getRequestById,
    getRequestsByUser,
}
