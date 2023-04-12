const dbo = require("../config/conn")
var ObjectId = require("mongodb").ObjectId
const insertPet = async (
    name,
    dob,
    species,
    gender,
    filename,
    spay_neut,
    vaxxed,
    description
) => {
    const pet = {
        name: name,
        dob: dob,
        species: species,
        gender: gender,
        filename: filename,
        spay_neut: spay_neut,
        vaxxed: vaxxed,
        description: description,
        last_modified: new Date(),
    }
    const dbConnect = dbo.getDb()
    const result = await dbConnect.collection("pets").insertOne(pet)
    return result
}

const getPets = async () => {
    const dbConnect = dbo.getDb()
    return await dbConnect
        .collection("pets")
        .find({})
        .toArray()
        .then((results) => {
            return results
        })
}

const getPetById = async (id) => {
    const dbConnect = dbo.getDb()
    var o_id = new ObjectId(id)
    return await dbConnect
        .collection("pets")
        .find({ _id: o_id })
        .toArray()
        .then((results) => {
            return results
        })
}

const deletePetById = async (id) => {
    const dbConnect = dbo.getDb()
    var o_id = new ObjectId(id)
    dbConnect
        .collection("pets")
        .deleteOne({ _id: o_id }, function (err, result) {
            if (err) {
                console.log("Error inserting pet!")
            } else {
                console.log(`Deleted pet with id ${id}`)
            }
        })
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
    const dbConnect = dbo.getDb()
    var o_id = new ObjectId(id)
    const pet = {
        name: name,
        dob: dob,
        species: species,
        gender: gender,
        filename: filename,
        spay_neut: spay_neut,
        vaxxed: vaxxed,
        description: description,
        last_modified: new Date(),
    }
    return dbConnect
        .collection("pets")
        .updateOne(
            { _id: o_id },
            { $set: pet },
            { upsert: true },
            function (err, result) {
                if (err) {
                    console.log("Error updating pet!")
                } else {
                    console.log(`Updated pet with id ${id}`)
                    console.log(`Updated pet with id ${name}`)
                }
            }
        )
}

module.exports = {
    insertPet,
    getPets,
    getPetById,
    deletePetById,
    putPet,
}
