const router = require("express").Router();
let Appointment = require("../models/Appointment");
let Channel = require("../models/Channel");
let Patient = require("../models/Patient");

const nodemailer = require("nodemailer");

outer.route("/channelAppointments/:id").get(async (req, res) => {
  let cid = req.params.id;

  const apt = await Appointment.find({ channel: cid })
    .then((appointments) => {
      res.status(200).json({ data: appointments });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting appointment details",
        error: err.message,
      });
    });
});

router.route("/patientAppointments/:id").get(async (req, res) => {
  let pid = req.params.id;

  const apt = await Appointment.find({ patient: pid })
    .then((appointments) => {
      res.status(200).json({ data: appointments });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send({
        status: "Error in getting appointment details",
        error: err.message,
      });
    });
});
