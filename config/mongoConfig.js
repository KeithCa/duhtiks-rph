var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/GRPG'; 
var db = mongoose.connection;              
var assert = require('assert');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
mongoose.Promise = require('bluebird');