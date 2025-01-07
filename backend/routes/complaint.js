const express = require('express');
const Complaint = require('../models/Complaint');
// const auth = require('../middleware/auth');
const { auth, verifyAdmin } = require('../middleware/auth');
const router = express.Router();

// Submit new complaint
router.post('/', auth, async (req, res) => {
    const { description, category, location, imageUrl } = req.body;

    try {
        const complaint = new Complaint({
            user: req.user.id,
            description,
            category,
            location,
            imageUrl
        });
        await complaint.save();
        res.status(201).json(complaint);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get all complaints (for admin)
router.get('/', auth, async (req, res) => {
    try {
        // if (req.user.role !== 'admin') {
        //     return res.status(403).json({ msg: 'Access denied' });
        // }
        //For now all everyone to see
        const complaints = await Complaint.find().populate('user', ['name', 'email']);
        res.status(200).json(complaints);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Get complaints by user (for students)
router.get('/mycomplaints', auth, async (req, res) => {
    try {
        const complaints = await Complaint.find({ user: req.user.id });
        res.status(200).json(complaints);
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Route to update complaint status
router.put('/:id/status', auth, verifyAdmin, async (req, res) => {
    const { status } = req.body;
    try {
        const complaint = await Complaint.findById(req.params.id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }
        
        complaint.status = status;
        await complaint.save();
        res.json({ message: 'Complaint status updated', complaint });
    } catch (error) {
        //debugging
        //console.error('Error updating complaint status:', error.message); // Detailed logging
        res.status(500).json({ message: 'Server error', error });
    }
});

// Get a specific complaint by ID (for admin and user)
router.get('/:id', auth, async (req, res) => {
    // console.log(`Received request for complaint with ID: ${req.params.id}`);  // Log the incoming request
    try {
        // Find the complaint by its ID
        const complaint = await Complaint.findById(req.params.id).populate('user', ['name', 'email']);

        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found' });
        }

        res.status(200).json(complaint);
    } catch (err) {
        console.error('Error fetching complaint:', err);
        res.status(500).json({ msg: 'Server error' });
    }
});


module.exports = router;
