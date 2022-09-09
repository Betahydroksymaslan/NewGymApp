export type TrainingBodyPayload = {
  defaultProgress: number;
  exerciseName: string;
  numberOfSeries: number;
  repsOrWeight: "weight" | "reps";
  repsQuantityFrom: number;
  repsQuantityTo: number;
  startWeightOrReps: number;
  actualRep: number;
  trainingId: string;
  virtualProgress: number;
  planName: string | undefined;
  planDay: string;
  dayId: string;
  order: number;
  notes: {message: string, date: number, id: string}[]
};

export type TrainingBodyToAdd = {
  defaultProgress: number;
  exerciseName: string;
  numberOfSeries: number;
  repsOrWeight: "weight" | "reps";
  repsQuantityFrom: number;
  repsQuantityTo: number;
  startWeightOrReps: number;
  actualRep: number;
  trainingId: string;
  virtualProgress: number;
  planName: string | undefined;
  planDay: string;
  dayId: string;
  order: number;
};

export interface TrainingDays {
  dayName: string;
  dayId: string;
  exercises: TrainingBodyPayload[];
}

export interface TrainingPlan {
  planName: string;
  step: number;
  planId: string;
  shortDescription: string;
  trainingDays: TrainingDays[];
}

export interface Trainings {
  [key: string]: TrainingPlan[] | null;
}

// !!!!!!!!!!!!!!!!!!! PAYLOAD TYPES !!!!!!!!!!!!!!!!!!!

export type TrainingsPayload = TrainingPlan[];

export type TrainingDaysPayload = {
  daysData: { dayName: string, dayId: string }[];
  step: number;
  planNamePath: string;
};

export type TrainingPlanNamePayload = {
  planName: string;
  step: number;
  planId: string;
  shortDescription: string;
};

export interface DefaultValuesToUpdate {
  defaultProgress: string;
  exerciseName: string;
  numberOfSeries: number;
  repsOrWeight: "weight" | "reps";
  repsQuantityFrom: number;
  repsQuantityTo: number;
  startWeightOrReps: number;
  order: number;
  trainingId: string;
  dayId: string;
  actualRep?: number;
}

export interface DefaultValuesToUpdatePayload {
  defaultProgress: number;
  exerciseName: string;
  numberOfSeries: number;
  repsOrWeight: "weight" | "reps";
  repsQuantityFrom: number;
  repsQuantityTo: number;
  startWeightOrReps: number;
  planName: string | undefined;
  dayName: string;
  order: number;
  trainingId: string;
  dayId: string;
}

export type DeleteLocationPayload = {
  path: string;
  message?: string;
  isFullPath?: boolean;
};

export type AddNewTrainingDayPayload = {
  dayName: string;
  dayId: string;
  planName: string;
}
export type UpdateDayNamePayload = {
  dayName: string;
  dayId: string;
  planName: string;
}