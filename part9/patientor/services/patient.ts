import { patientsEntries } from "../data/patients";
import { v4 as randomUuid } from "uuid";
import {
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatient,
  NewEntry,
} from "../types/types";

const patients: Array<PatientEntry> = patientsEntries;

const getPatients = (): Array<NonSensitivePatientEntry> => {
  return patients.map(({ name, dateOfBirth, id, occupation, gender }) => ({
    name,
    dateOfBirth,
    id,
    occupation,
    gender,
  }));
};

const getPatient = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
};

const create = (patient: NewPatient): NonSensitivePatientEntry => {
  const patientWithId = { id: randomUuid(), entries: [], ...patient };
  patients.push(patientWithId);

  return {
    id: patientWithId.id,
    name: patientWithId.name,
    dateOfBirth: patientWithId.dateOfBirth,
    gender: patientWithId.gender,
    occupation: patientWithId.occupation,
  };
};

const addEntry = (
  patientId: string,
  entry: NewEntry
): PatientEntry | undefined => {
  const index = patients.findIndex((patient) => patient.id === patientId);
  if (index === -1) return undefined;
  patients[index].entries.push({
    id: randomUuid(),
    ...entry,
  });
  return patients[index];
};

export default { getPatients, getPatient, create, addEntry };
