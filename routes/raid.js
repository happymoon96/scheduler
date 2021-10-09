const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('raid');
});

router.get('/mystic', (req, res, next) => {
    res.render('raid_mystic');
});

router.get('/kaischter', (req, res, next) => {
    res.render('raid_kaischter');
});

router.get('/argos', (req, res, next) => {
    res.render('raid_argos');
});

router.get('/valtan', (req, res, next) => {
    res.render('raid_valtan');
});

router.get('/biackiss', (req, res, next) => {
    res.render('raid_biackiss');
});

router.get('/koukusaton', (req, res, next) => {
    res.render('raid_koukusaton');
});

router.get('/abrelshud', (req, res, next) => {
    res.render('raid_abrelshud');
});

module.exports = router;
