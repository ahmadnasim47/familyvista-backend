const Event = require("../models/EventSchema");

const addEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, date } = req.body;

    const event = new Event({
      name: name,
      date: date,
      creator: id,
    });
    await event.save();

    res.status(201).json({ message: "event added", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const getEvents = async (req, res) => {
    try {
        const {id} = req.params
        const events = await Event.find({creator: id})
        if(events.length !== 0) {
            res.status(200).json({message: "Events fetched", success: true, events: events})
        // console.log(req.data);
          } else {
            res.status(200).json({message: "No events added", succes: true, events: []})
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error", success: false})
    }
}

module.exports = { addEvent, getEvents };
