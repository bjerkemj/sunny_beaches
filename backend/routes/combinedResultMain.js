const express = require('express');
const combinedController = require('../controllers/combinedController'); // Import the combinedController

const router = express.Router();

const beachCoordinates = {
    "Sharpes Beach": { latitude: -28.8377, longitude: 153.6044 },
    Coolangatta: { latitude: -28.170994, longitude: 153.537628 },
    "Woorim Beach": { latitude: -27.0959, longitude: 153.195 },
  };

router.get('/', async (req, res) => {
    try {
        const combinedData = {};

        for (const beachName in beachCoordinates) {
            const { latitude, longitude } = beachCoordinates[beachName];
            const beachData = await combinedController.calculateCombinedData(latitude, longitude);
            combinedData[beachName] = beachData;
        }

        res.status(200).json(combinedData);
    } catch (error) {
        // Handle any errors that occur during the calculation
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
