import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const weight = Number(req.query.weight);
  const height = Number(req.query.height);

  if (!weight || !height) {
    return res.json({ error: "malformed parameters" });
  } else {
    const response = {
      weight,
      height,
      bmi: calculateBmi(height, weight),
    };
    return res.json(response);
  }
});

app.post("/exercises", (req, res) => {
  interface Exercises {
    target: number;
    daily_exercises: Array<number>;
  }

  interface Rating {
    periodLength: number;
    trainingDays: number;
    average: number;
    target: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
  }

  const { target, daily_exercises } = req.body as Exercises;

  // check all required input present
  if (!target || !daily_exercises) {
    return res.json({ error: "parameters missing" });
  }

  // check input type
  const targetIsNumber = typeof target === "number" && !Number.isNaN(target);
  const exercisesAreNumbers = daily_exercises.every(
    (exercise) => typeof exercise === "number" && !Number.isNaN(exercise)
  );
  if (!targetIsNumber || !exercisesAreNumbers) {
    return res.json({ error: "malformatted parameters" });
  }

  // calculate and send rating
  const rating: Rating = calculateExercises(target, daily_exercises);
  return res.json(rating);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
