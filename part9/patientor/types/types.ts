enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

enum EntryType {
  HealthCheck = "HealthCheck",
  OccupationalHealthcare = "OccupationalHealthcare",
  Hospital = "Hospital",
}

interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: string[];
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: number;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: {
    date: string;
    criteria: string;
  };
}

type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

type NewEntry =
  | Omit<HealthCheckEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HospitalEntry, "id">;

interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

type NonSensitivePatientEntry = Omit<PatientEntry, "ssn" | "entries">;

type NewPatient = Omit<PatientEntry, "id" | "entries">;

type Patient = Omit<PatientEntry, "id">;

interface DiagnosisEntry {
  code: string;
  name: string;
  latin?: string;
}

export {
  Gender,
  PatientEntry,
  NonSensitivePatientEntry,
  NewPatient,
  DiagnosisEntry,
  Entry,
  NewEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
  Patient,
  EntryType,
};
