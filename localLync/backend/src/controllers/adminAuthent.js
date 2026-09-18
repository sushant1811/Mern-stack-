const mongoose = require('mongoose');
const Item = require("../models/item");
const Store = require("../models/store");
const validate_store_data = require("../utils/validate_store_data");

const addStore = async (req, res) => {
    try {
        validate_store_data(req.body);
        console.log("validated store data successfully");
        const { store_name, location, owner_id, category } = req.body;

        const reply = { store_name, location, owner_id, category };

        const store = await Store.create(reply);
        reply.store_id = store._id;

        res.status(200).json({
            user: reply,
            message: "Store Registered Successfully"
        });
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
};

const addItemtoStore = async (req, res) => {
    try {
        const { storeId } = req.params;
        console.log("store id : ", storeId);

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(storeId)) {
            throw new Error("Invalid store ID format");
        }

        const store = await Store.findById(storeId);
        console.log("store fetched : ", store);

        if (!store) {
            throw new Error("Store not found");
        }

        const { item_name } = req.body;
        if (!item_name) {
            throw new Error("item name should be present");
        }

        
        const reply = { ...req.body, store_id: storeId };

        const item = await Item.create(reply);

        reply.store_name = store.store_name;
        store.items.push(item._id);
        await store.save();

        res.status(200).json({
            user: reply,
            message: "Item Added Successfully"
        });
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
};

module.exports = { addStore, addItemtoStore };
