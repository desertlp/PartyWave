const express = require('express');
const app = express();
const db = require("./models");

const newCounty = [
    {
        name: 'Los Angeles County',
        lattitude: '34.0522° N', 
        longitude: '1118.2437° W', 
    },
    {
        name: 'Orange County',
        lattitude: '33.7175° N', 
        longitude: '117.8311° W', 
    },
    {
        name: 'San Diego County',
        lattitude: '32.7157° N', 
        longitude: '117.1611° W', 
    },
    {
        name: 'San Luis Obispo County',
        lattitude: '35.3102° N', 
        longitude: '120.4358° W', 
    },
    {
        name: 'Santa Barbara County ',
        lattitude: '34.4208° N', 
        longitude: '119.6982° W',
    },
    {
        name: 'Ventura County',
        lattitude: '34.3705° N', 
        longitude: '119.1391° W',
    },
];


// delete counties? Do we need to do this? 

// create
db.COUNTY.create(newCounty, (err, newCounty) => {
    if (err) console.log(err);
    console.log('New County Created');
    console.log(newCounty);
    process.exit();
 });  