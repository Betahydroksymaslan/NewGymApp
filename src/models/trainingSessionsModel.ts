export interface TrainingSessionsExercise {
  exerciseName: string;
  exerciseId: string;
  weightFrom: number;
  weightTo?: number;
  repsFrom: number;
  repsTo?: number;
  weightOrReps: "weight" | "reps";
  notes?: { message: string; date: number; id: string }[];
}

export type TrainingSession = {
  trainingSessionId: string;
  dayId: string;
  dayName: string;
  trainingName: string;
  startTrainingDate: number;
  endTrainingDate?: number;
  exercises: TrainingSessionsExercise[];
};

export type TrainingSessions = {
  trainingSessions: TrainingSession[] | null;
  trainingSession: TrainingSession | null;
};

export type TrainingSessionsHistory = {
  trainingSessionId: string;
  dayId: string;
  dayName: string;
  trainingName: string;
  startTrainingDate: number;
  endTrainingDate?: number;
  exercises: TrainingSessionsExercise[];
} | null;

export interface TrainingSessionsExercisePayload {
  exerciseName: string;
  exerciseId: string;
  weightFrom: number;
  repsFrom: number;
  weightOrReps: "weight" | "reps";
}

export type TrainingSessionPayload = {
  sessionData: {
    trainingSessionId: string;
    dayId: string;
    dayName: string;
    trainingName: string;
    startTrainingDate: number;
  };

  exercises: TrainingSessionsExercisePayload[];
};

export type SessionPayloadArrived = { [key: string]: any };

export type UpdateSessionPayload = { [x: string]: number | object | string };

export type AddNotePayload = {
  path: string;
  message: {
    message: string;
    date: number;
    id: string;
  };
};
