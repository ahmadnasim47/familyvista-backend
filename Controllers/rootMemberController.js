const Member = require("../models/memberSchema");
const RootMember = require("../models/rootmember")
const RootUser = require("../models/RootUser")
const FamilyMember = require("../models/FamilyMember")

const addRootMember = async (req, res) => {
    try {
        // console.log(req);
        const { name, cnic, username, } = req.body;
        console.log(req.body)
        const foundRootMember = await RootUser.findOne({ cnic: cnic });
        if (!foundRootMember) {
            // console.log()
            const newRootMember = new RootUser({
                name: name,
                username: username,
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

const getRootMember = async (req, res) => {
    try {
        const {cnic} = req.params
        console.log("cnic: ",cnic)

        const rootMemberFound = await RootUser.findOne({ cnic: cnic })
        if(!rootMemberFound) {
            return res.status(400).json({ error: "Root member doesn't exists." });
        } 
        res.status(200).json({message: "Root member found.", body: rootMemberFound})
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

const addChildernToRoot = async (req, res) => {
    try {
        const {cnic} = req.params

        const rootMemberFound = await RootUser.findOne({ cnic: cnic })
        if(!rootMemberFound) {
            return res.status(400).json({ error: "Access denied." });
        }

        const { name, gender } = req.body
        const childCNIC = req.body.cnic

        const newChild = new FamilyMember({
            name: name,
            cnic: childCNIC,
            gender: gender,
            parent: {cnic : cnic},
            children: [],
            createdBy: rootMemberFound._id
        })

        rootMemberFound.children.push({cnic: childCNIC})
        await newChild.save()
        await rootMemberFound.save()
        res.status(200).json({ message: "Children updated.", body: rootMemberFound.children})
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

const getChildernToRoot = async (req, res) => {
    try {
        const { cnic } = req.params

        const rootMemberFound = await RootUser.findOne({ cnic: cnic })
        if(!rootMemberFound) {
            return res.status(400).json({ error: "Error occurred." });
        }
        const childCNICs = rootMemberFound.children
        const familyMemberPromises = childCNICs.map((children) => {
            return FamilyMember.findOne({cnic: children.cnic})
        })

        const childernToRoot = await Promise.all(familyMemberPromises)

        res.status(200).json({message: "All children fetched", body: childernToRoot})
    } catch (error) {
        res.status(500).json({ error: error.message });  
    }
}

module.exports= {addRootMember, getRootMember, addChildernToRoot, getChildernToRoot}