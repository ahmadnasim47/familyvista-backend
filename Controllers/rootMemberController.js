const Member = require("../models/memberSchema");
const RootMember = require("../models/rootmember")

const addRootMember = async (req, res) => {
    try {
        // console.log(req);
        const { name, Dob, cnic } = req.body;
        console.log(req.body)
        const foundRootMember = await RootMember.findOne({cnic: cnic});
        if (!foundRootMember) {
            console.log(Dob)
            const newRootMember = new RootMember({
                name: name,
                dob: Dob,
                cnic: cnic,
                children: []
            });
            console.log(newRootMember)
            await newRootMember.save();
            res.status(201).json({message: "Root member created.", body: newRootMember});
        } else {
            res.status(400).json({ error: 'Root member already exists' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports= {addRootMember}