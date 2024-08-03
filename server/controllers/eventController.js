const { Event } = require("../models/eventsModel");

module.exports.getAllEvents = async function (req, res) {
    try {
        const events = await Event.findAll();
        res.status(201).json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.getEventById = async function (req, res) {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.createEvent = async function (req, res) {
    try {
        const { title,description,date }=req.body;
        const new_event = await Event.create({ title,description,date });
        res.status(201).json(new_event);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
}

module.exports.putEvent = async function (req, res) {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        for (let key in req.body) {
            if (event.dataValues.hasOwnProperty(key)) {
                event.set(key, req.body[key]);
            }
        }
        await event.save();
        await event.reload();
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.deleteEvent = async function (req, res) {
    try {
        const event = await Event.findByPk(req.params.id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }
        await event.destroy();
        res.status(204).json({ message: "Event Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
