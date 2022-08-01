export type TrainingBodyPayload = {
  defaultProgress: number;
  exerciseName: string;
  numberOfSeries: number;
  repsOrWeight: "weight" | "reps";
  repsQuantityFrom: number;
  repsQuantityTo: number;
  startWeightOrReps: number;
  trainingId: string;
  virtualProgress: number;
  planName: string | undefined;
  planDay: string;
  order: number;
};

export interface TrainingDays {
  dayName: string;
  exercises: TrainingBodyPayload[]
}

export interface TrainingPlan {
  planName: string;
  step: number;
  planId: string;
  trainingDays: TrainingDays[];
}

export interface Trainings {
  [key: string]: TrainingPlan[] | null;
}

// !!!!!!!!!!!!!!!!!!! PAYLOAD TYPES !!!!!!!!!!!!!!!!!!!

export type TrainingsPayload = TrainingPlan[];

export type TrainingDaysPayload = {
  daysData: {dayName: string}[];
  step: number;
  planNamePath: string;
};

export type TrainingPlanNamePayload = {
  planName: string;
  step: number;
  planId: string;
};
