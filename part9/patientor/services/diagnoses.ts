import { diagnosesData } from "../data/diagnoses";
import { DiagnosisEntry } from "../types/types";

const diagnoses: Array<DiagnosisEntry> = diagnosesData;

const getDiagnoses = (): Array<DiagnosisEntry> => {
  return diagnoses;
};

export default { getDiagnoses };
