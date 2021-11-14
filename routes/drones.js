const express = require("express");
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get("/drones", (req, res, next) => {
  Drone.find()
    .then((drones) => {
      console.log(drones);
      res.render();
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/drones/create", (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("../views/drones/create-form.hbs");
});

router.post("/drones/create", (req, res) => {
  // Iteration #3: Add a new drone

  const { name, propellers, maxSpeed } = req.body;
  Drone.create({ name, propellers, maxSpeed })
    .then((newDrone) => {
      console.log(newDrone);
      res.render("../views/drones/newDrone.hbs", newDrone);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  Drone.findById(id)
    .then((drone) => {
      res.render("../views/drones/update-form.hbs");
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/drones/:id/edit", (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => {
      console.log("iteration 4");
      res.redirect("/drones");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/drones/:id/delete", (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;

  Drone.findByIdAndDelete(id)
  .then(() => {
    res.delete("/drones");
  });
});

module.exports = router;
