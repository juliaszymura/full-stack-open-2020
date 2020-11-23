type Bmi = "Underweight" | "Normal (healthy weight)" | "Overweight" | "Obese";

interface BmiArgs {
  height: number;
  weight: number;
}

export const calculateBmi = (height: number, weight: number): Bmi => {
  const bmi = weight / (height / 100) ** 2;
  let category: Bmi;

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal (healthy weight)";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return category;
};

const parseArgsBmi = (args: Array<string>): BmiArgs => {
  if (args.length < 4)
    throw new Error("Not enought arguments, provide <height(cm)> <weight>");
  if (args.length > 4)
    throw new Error("Too much arguments, provide <height(cm)> <weight>");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[2]) < 3) throw new Error("Provide height in cm");
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else throw new Error("Provided args are not numbers");
};

try {
  const { height, weight } = parseArgsBmi(process.argv);
  console.log(calculateBmi(height, weight));
} catch (e) {
  // <Error> removes e any type error
  console.log("Error: ", (<Error>e).message);
}
