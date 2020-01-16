const router = require("express").Router();
const Workout = require("../models/workout.js");

router.post("/api/workouts", (req, res) => {
  console.log("connected to post")
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// create a put route for /api/workouts/:id that updates the workout

router.put("/api/workouts/:id", ({body, params}, res) => {
  console.log("connected to put")
  console.log(body)
  Workout.findByIdAndUpdate(
    params.id,
    {
      $push: { exercise: body }
    },
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      console.log("after promise")
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// create a get route for /api/workouts that gets all the workouts

router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// create a get route for /api/workouts/range that gets all the workouts by a range

router.get("/api/workouts/range", (req, res) => {
  Workout.find({}).limit(3)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// create a delete route for /api/workouts that finds a workout and deletes from the database.

router.delete("/api/workouts", ({body}, res) => {
  Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});


module.exports = router;
