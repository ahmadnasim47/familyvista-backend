// controllers/treeController.js

const FamilyMember = require('../models/FamilyMember');
const Member = require('../models/memberSchema');

// Controller methods for tree operations
// ... (previous controller code)
//Code before  Image.

const addRootMember = async (req, res) => {
    try {
        // console.log(req);
        const { name, Dob } = req.body;
        console.log(req.body)
        const foundMember = await Member.findOne({});
        if (!foundMember) {
            console.log(Dob)
            const newMember = new Member({
                name,
                Dob,
                children: []
            });
            console.log(newMember)
            await newMember.save();
            res.status(201).json(newMember);
        } else {
            res.status(400).json({ error: 'Root member already exists' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addFamilyMember = async (req, res) => {
    try {
        // console.log(req);
        const { parentCnic } = req.params
        const { name, cnic, gender } = req.body;
        console.log(req.body)
        const foundFamilyMember = await FamilyMember.findOne({ cnic: cnic });
        const foundParent = await FamilyMember.findOne({ cnic: parentCnic})
        if (!foundFamilyMember) {
            console.log(foundParent)
            const newFamilyMember = new FamilyMember({
                name: name,
                parent: { cnic: parentCnic },
                gender: gender,
                cnic: cnic,
                children: []
            });
            console.log(newFamilyMember)
            foundParent.children.push({cnic: cnic})
            await newFamilyMember.save();
            await foundParent.save()
            res.status(201).json({ message: "Family member added.", body: newFamilyMember });
        } else {
            res.status(400).json({ error: 'Family member already exists' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getChildrenToFamilyMember = async (req, res) => {
    try {
        const { parentCnic } = req.params
        const familyMemberFound = await FamilyMember.findOne({cnic: parentCnic})
        if(!familyMemberFound) {
            return res.status(200).json({ message: "No family member found.", success: false})
        }
        console.log(familyMemberFound)
        const childrenCnicList = familyMemberFound.children

        const childrenListPromises = childrenCnicList.map((childCnic) => {
            return FamilyMember.findOne({ cnic: childCnic.cnic})
        })

        const childrenList = await Promise.all(childrenListPromises)

        res.status(200).json({ message: "Children found.", success: true, body: childrenList})
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

// Code with image
const addChildMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, Dob } = req.body;
        const foundMember = await Member.findOne({ id: id }).populate('children');
        if (foundMember) {
            const newChild = new Member({
                name,
                Dob,
                children: []
            });
            await newChild.save();
            foundMember.children.push(newChild.id);
            await foundMember.save();


            // Populate the parent member again to include the newly added child
            const updatedParent = await Member.findOne({ id: id }).populate('children');

            res.status(201).json({ parent: updatedParent, newChild: newChild });
        } else {
            res.status(404).json({ error: 'Node not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// controllers/treeController.js

// ... (previous imports and code)

const updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, Dob } = req.body;
        const foundMember = await Member.findOne({ id: id });
        if (foundMember) {
            foundMember.name = name;
            foundMember.Dob = Dob;
            await foundMember.save();
            res.status(200).json(foundMember);
        } else {
            res.status(404).json({ error: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        const removedMember = await Member.findOneAndRemove({ id: id });
        if (removedMember) {
            res.status(200).json({ message: 'Member deleted successfully' });
        } else {
            res.status(404).json({ error: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTree = async (req, res) => {
    try {
        // Assuming you have a method to retrieve the entire tree structure
        const tree = await Member.find({}).populate('children').exec();

        res.status(200).json(tree);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





module.exports = {
    addRootMember,
    addChildMember,
    addFamilyMember,
    getChildrenToFamilyMember,
    updateMember,
    deleteMember,
    getTree, // Add the new method to export
};