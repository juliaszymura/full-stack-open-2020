/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  NewPatient,
  Patient,
  Gender,
  Entry,
  EntryType,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  NewEntry,
} from "../types/types";

const assertUnreachable = (value: never): never => {
  throw new Error(`Discriminated union member ${JSON.stringify(value)}`);
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: any): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  const entryType = Object.getOwnPropertyDescriptor(entry, "type");
  if (entryType && isString(entryType.value)) {
    return entryType.value === EntryType.Hospital;
  }
  return false;
};

const isOccupationalHealthcareEntry = (
  entry: any
): entry is OccupationalHealthcareEntry => {
  const entryType = Object.getOwnPropertyDescriptor(entry, "type");
  if (entryType && isString(entryType.value)) {
    return entryType.value === EntryType.OccupationalHealthcare;
  }
  return false;
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  const entryType = Object.getOwnPropertyDescriptor(entry, "type");
  if (entryType && isString(entryType.value)) {
    return entryType.value === EntryType.HealthCheck;
  }
  return false;
};

const isEntry = (entry: any): entry is Entry => {
  return (
    isHospitalEntry(entry) ||
    isOccupationalHealthcareEntry(entry) ||
    isHealthCheckEntry(entry)
  );
};

const isEntriesArray = (entries: any[]): entries is Entry[] => {
  return entries.every((e) => isEntry(e));
};

const isStringArray = (textArray: any[]): textArray is string[] => {
  return textArray.every((text) => isString(text));
};

const isDischarge = (
  discharge: any
): discharge is {
  date: string;
  criteria: string;
} => {
  return (
    Object.keys(discharge).includes("date") &&
    Object.keys(discharge).includes("criteria")
  );
};

const isSickLeave = (
  sickLeave: any
): sickLeave is {
  startDate: string;
  endDate: string;
} => {
  return (
    Object.keys(sickLeave).includes("startDate") &&
    Object.keys(sickLeave).includes("endDate")
  );
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Missing or invalid name");
  }
  return name;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Missing or invalid date");
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error("Missing or invalid ssn");
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Missing or invalid gender");
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error("Missing or invalid occupation");
  }
  return occupation;
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error("Missing or invalid description");
  }
  return description;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error("Missing or invalid specialist");
  }
  return specialist;
};

const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error("Missing or invalid employer name");
  }
  return employerName;
};

const parseEntries = (entries: any): Entry[] => {
  if (!entries || !Array.isArray(entries) || !isEntriesArray(entries)) {
    throw new Error("Missing or invalid entries");
  }
  return entries;
};

const parseDiagnosisCodes = (codes: any): string[] => {
  if (!Array.isArray(codes) || !isStringArray(codes)) {
    throw new Error("Invalid diagnosis codes");
  }
  return codes;
};

const parseDischarge = (
  discharge: any
): {
  date: string;
  criteria: string;
} => {
  if (!isDischarge(discharge)) {
    throw new Error("Invalid discharge");
  }
  if (!isDate(discharge.date)) {
    throw new Error("Discharge date is not a date");
  }
  return discharge;
};

const parseSickLeave = (
  sickLeave: any
): {
  startDate: string;
  endDate: string;
} => {
  if (!isSickLeave(sickLeave)) {
    throw new Error("Invalid sick leave");
  }
  if (!isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)) {
    throw new Error("Start or end date is not a date");
  }
  return sickLeave;
};

const parseHealthCheckRating = (rating: any): number => {
  if ((!rating && rating !== 0) || typeof rating !== "number") {
    throw new Error("Missing or invalid healthcheck rating");
  }
  return rating;
};

const parseNewEntry = (entry: any): NewEntry => {
  if (!entry || !isEntry(entry)) {
    throw new Error("Missing or invalid entry");
  }
  const parsedNewEntryBaseWithoutOptional = {
    type: entry.type,
    date: parseDate(entry.date),
    description: parseDescription(entry.description),
    specialist: parseSpecialist(entry.specialist),
  };

  const parsedNewEntryBase = entry.diagnosisCodes
    ? {
        ...parsedNewEntryBaseWithoutOptional,
        diagnosisCodes: parseDiagnosisCodes(entry.diagnosisCodes),
      }
    : { ...parsedNewEntryBaseWithoutOptional };

  switch (entry.type) {
    case "Hospital":
      const newHospitalEntry = entry.discharge
        ? {
            ...parsedNewEntryBase,
            discharge: parseDischarge(entry.discharge),
          }
        : { ...parsedNewEntryBase };
      return { ...newHospitalEntry, type: "Hospital" };
    case "HealthCheck":
      return {
        ...parsedNewEntryBase,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
        type: "HealthCheck",
      };
    case "OccupationalHealthcare":
      const newOccupationalHealthcareEntry = entry.sickLeave
        ? {
            ...parsedNewEntryBase,
            employerName: parseEmployerName(entry.employerName),
            sickLeave: parseSickLeave(entry.sickLeave),
          }
        : {
            ...parsedNewEntryBase,
            employerName: parseEmployerName(entry.employerName),
          };
      return {
        ...newOccupationalHealthcareEntry,
        type: "OccupationalHealthcare",
      };
    default:
      return assertUnreachable(entry);
  }
};

const toPatientEntry = (newPatient: Record<string, unknown>): Patient => {
  return {
    name: parseName(newPatient.name),
    dateOfBirth: parseDate(newPatient.dateOfBirth),
    ssn: parseSsn(newPatient.ssn),
    gender: parseGender(newPatient.gender),
    occupation: parseOccupation(newPatient.occupation),
    entries: parseEntries(newPatient.entries),
  };
};

const toNewPatientEntry = (newPatient: Record<string, unknown>): NewPatient => {
  return {
    name: parseName(newPatient.name),
    dateOfBirth: parseDate(newPatient.dateOfBirth),
    ssn: parseSsn(newPatient.ssn),
    gender: parseGender(newPatient.gender),
    occupation: parseOccupation(newPatient.occupation),
  };
};

const toNewEntry = (newEntry: Record<string, unknown>): NewEntry => {
  return parseNewEntry(newEntry);
};

export { toPatientEntry, toNewPatientEntry, toNewEntry };
