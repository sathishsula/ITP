const router = require("express").Router();
let Appointment = require("../models/Appointment");
let Channel = require("../models/Channel");
let Patient = require("../models/Patient");

const nodemailer = require("nodemailer");
