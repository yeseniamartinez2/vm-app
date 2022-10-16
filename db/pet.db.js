const dbo = require("../config/conn");
var ObjectId = require("mongodb").ObjectId;
const insertPet = async (name, dob, species, gender, filename, kids_comp, pets_comp, description) => {
    const pet = {
        name: name,
        dob: dob,
        species: species,
        gender: gender,
        filename: filename,
        kids_comp: kids_comp,
        pets_comp: pets_comp,
        description: description,
        last_modified: new Date(),
    };
    const dbConnect = dbo.getDb();
    dbConnect.collection("pets").insertOne(pet, function (err, result) {
        if (err) {
            console.log("Error inserting pet!");
        } else {
            console.log(`Added a new pet with id ${result.insertedId}`);
        }
    });
};

const getPets = async () => {
    const dbConnect = dbo.getDb();
    return await dbConnect
        .collection("pets")
        .find({})
        .toArray()
        .then((results) => {
            return results;
        });
};

const getPetById = async (id) => {
    const dbConnect = dbo.getDb();
    var o_id = new ObjectId(id);
    return await dbConnect
        .collection("pets")
        .find({ _id: o_id })
        .toArray()
        .then((results) => {
            return results;
        });
};

const deletePetById = async (id) => {
    const dbConnect = dbo.getDb();
    var o_id = new ObjectId(id);
    dbConnect.collection("pets").deleteOne({ _id: o_id }, function (err, result) {
        if (err) {
            console.log("Error inserting pet!");
        } else {
            console.log(`Added a new pet with id ${result.insertedId}`);
        }
    });
};

const putPet =async (id, name, dob, species, gender, filename, kids_comp, pets_comp, description) => {
    const dbConnect = dbo.getDb();
    var o_id = new ObjectId(id);
    const pet = {
        name: name,
        dob: dob,
        species: species,
        gender: gender,
        filename: filename,
        kids_comp: kids_comp,
        pets_comp: pets_comp,
        description: description,
        last_modified: new Date(),
    };
    dbConnect.collection("pets").updateOne(
        { _id: o_id },
        { $set: pet },
        { upsert: true }, 
        function (err, result) {
        if (err) {
            console.log("Error updating pet!");
        } else {
            console.log(`Updated pet with id ${id}`);
            console.log(`Updated pet with id ${name}`);
         
        }
    });
};

module.exports = {
    insertPet,
    getPets,
    getPetById,
    deletePetById,
    putPet
};
