const express = require('express');
const combinedController = require('../controllers/combinedController'); // Import the wavesController

const router = express.Router();

router.get('/:latitude/:longitude', async (req, res) => {
    try {
        const { latitude, longitude } = req.params;
        const beachData = await combinedController.calculateCombinedData(latitude, longitude);

        // Send the combined data as JSON response
        res.status(200).json(beachData);
    } catch (error) {
        // Handle any errors that occur during the calculation
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
