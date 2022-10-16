const { petDb } = require("../db");

/*
 * if need to make calls to additional tables, data stores,
 * or call an external endpoint, add to this service
 */
const createPet = async (name, dob, species, gender, filename, kids_comp, pets_comp, description) => {
    try {
        return await petDb.insertPet(name, dob, species, gender, filename, kids_comp, pets_comp, description);
    } catch (e) {
        throw new Error(e.message);
    }
};

const getPets = async () => {
    try {
        const pets = await petDb.getPets();
        console.log("🚀 ~ file: pet.service.js ~ line 18 ~ getPets ~ pets", pets);
        return pets;
    } catch (e) {
        throw new Error(e.message);
    }
};

const getPetById = async (id) => {
    try {
        const pet = await petDb.getPetById(id);
        console.log("🚀 ~ file: pet.service.js ~ line 18 ~ getPets ~ pet", pet);
        return pet;
    } catch (e) {
        throw new Error(e.message);
    }
};

const deletePetById = async (id) => {
    try {
        return await petDb.deletePetById(id);
    } catch (e) {
        throw new Error(e.message);
    }
};

const putPet = async (id, name, dob, species, gender, filename, kids_comp, pets_comp, description) => {
    try {
        return await petDb.putPet(id, name, dob, species, gender, filename, kids_comp, pets_comp, description);
    } catch (e) {
        throw new Error(e.message);
    }
};

module.exports = {
    createPet,
    getPets,
    getPetById,
    deletePetById,
    putPet
};
