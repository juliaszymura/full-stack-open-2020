interface UserData {
  target: number;
  trainingHours: Array<number>;
}

interface Rating {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  target: number,
  exerciseHours: Array<number>
): Rating => {
  const periodLength = exerciseHours.length;
  const average = exerciseHours.reduce((a, c) => a + c, 0) / periodLength;
  const ratingCalculator = (): number => {
    if (average >= target) return 3;
    else if (average >= 0.75 * target) return 2;
    else return 1;
  };
  const rating = ratingCalculator();
  const ratingDescription = (): string => {
    if (rating === 3) return "quite good";
    else if (rating === 2) return "almost there";
    else return "that's not good at all";
  };

  const result = {
    periodLength,
    trainingDays: exerciseHours.filter((e) => e).length,
    average,
    target,
    success: average >= target,
    rating,
    ratingDescription: ratingDescription(),
  };

  return result;
};

const parseArgsExercise = (args: Array<string>): UserData => {
  if (args.length < 4)
    throw new Error(
      "Not enough arguments, provide <target> <[dailyExcerciseHours]>"
    );

  if (!isNaN(Number(args[2]))) {
    const [, , , ...hours] = args;
    const trainingHours = hours.map((h) => {
      if (isNaN(Number(h))) {
        throw new Error("Provide exercise hours that are numbers");
      }
      return Number(h);
    });

    return { target: Number(args[2]), trainingHours };
  } else
    throw new Error("Provide target daily exercise hours that is a number");
};

try {
  const { target, trainingHours } = parseArgsExercise(process.argv);
  console.log(calculateExercises(target, trainingHours));
} catch (e) {
  // <Error> removes e any type error
  console.log("Error: ", (<Error>e).message);
}
