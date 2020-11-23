import express from "express";
import cors from "cors";
import morgan from "morgan";
import { validate as isUUID } from "uuid";
import patientService from "../services/patient";
import diagnosesService from "../services/diagnoses";
import { toNewPatientEntry, toNewEntry } from "../utils/utils";
import { NewPatient, NonSensitivePatientEntry } from "../types/types";

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/api/ping", (_req, res) => {
  console.log("something pinged");
  res.send("pong");
});

app.get("/api/patients", (_req, res) => {
  const patients = patientService.getPatients();
  res.json(patients);
});

app.post("/api/patients", (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatientEntry(req.body);
    const savedPatient: NonSensitivePatientEntry = patientService.create(
      newPatient
    );
    return res.status(201).json(savedPatient);
  } catch (e) {
    const err = e as Error;
    return res.status(400).send({ error: err.message });
  }
});

app.get("/api/patients/:id", (req, res) => {
  if (isUUID(req.params.id)) {
    const patient = patientService.getPatient(req.params.id);
    return res.json(patient);
  }
  return res.status(400).send({ error: "invalid id" });
});

app.post("/api/patients/:id/entries", (req, res) => {
  if (isUUID(req.params.id)) {
    try {
      const newEntry = toNewEntry(req.body);
      const patient = patientService.addEntry(req.params.id, newEntry);
      if (!patient) return res.status(404).send({ error: "patient not found" });
      return res.status(201).json(patient);
    } catch (e) {
      const err = e as Error;
      return res.status(400).send({ error: err.message });
    }
  }
  return res.status(400).send({ error: "invalid id" });
});

app.get("/api/diagnoses", (_req, res) => {
  const diagnoses = diagnosesService.getDiagnoses();
  res.json(diagnoses);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Starting app on port ${PORT}`);
});
