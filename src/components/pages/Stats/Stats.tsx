import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import { useState } from "react";
import { getTrainingSessions } from "slices/trainingSessionSlice";
import { useAppSelector } from "store/hooks";
import {
  TrainingItem,
  TrainingItemsWrapper,
  StatsHeader,
  AlarmIconWrapper,
  ExercisesProgressWrapper,
  ExerciseProgressItem,
  StyledTimeSpan,
} from "./Stats.style";
import Button from "components/atoms/Button/Button";
import { calcTimeLength, calcHoursAndMinutes } from "helpers/calcTimeLength";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import StyledSelect from "components/molecules/StyledSelect/StyledSelect";
import { useForm, Controller } from "react-hook-form";
import { lightFormat, subDays, isAfter } from "date-fns";
import { motion } from "framer-motion";
import { ReactComponent as AlarmIcon } from "assets/icons/alarmIcon.svg";
import Modal from "components/templates/Modal/Modal";
import SessionReport from "components/organisms/SessionReport/SessionReport";
import { TrainingSessionsHistory } from "models/trainingSessionsModel";
import { useLocalStorage } from "hooks/useLocalStorage";

type TimesType = 0 | 7 | 31 | 365;
type InputTypes = {
  selectTime: TimesType;
};

const Stats = () => {
  const [minMaxVal, setMinMaxVal] = useLocalStorage("minMaxVal", {
    minVal: 20,
    maxVal: 180,
  });
  const [isSessionReportOpen, setIsSessionReportOpen] = useState(false);
  const openModal = () => setIsSessionReportOpen(true);
  const closeModal = () => setIsSessionReportOpen(false);

  const [choosenSession, setChoosenSession] =
    useState<TrainingSessionsHistory>(null);
  const chooseSession = (session: TrainingSessionsHistory) =>
    setChoosenSession(session);

  const checkProgress = (
    weightFrom: number,
    weightTo: number,
    repsFrom: number,
    repsTo: number
  ) => {
    if (weightFrom === weightTo && repsFrom === repsTo) return "info";
    if (weightTo > weightFrom || repsTo > repsFrom) return "success";
    return "error";
  };

  const { control, watch } = useForm<InputTypes>({
    defaultValues: {
      selectTime: 7,
    },
  });

  const selectValue = watch("selectTime");

  const filterSessions = (
    time: TimesType,
    date: Date,
    startSession: number,
    endSession: number
  ) => {
    const today = new Date();
    const dayInPast = subDays(today, time);
    const isThisDate = isAfter(date, dayInPast);

    const sessionTime = calcTimeLength(startSession, endSession);

    return time
      ? isThisDate &&
          sessionTime <= minMaxVal.maxVal &&
          sessionTime >= minMaxVal.minVal
      : sessionTime <= minMaxVal.maxVal && sessionTime >= minMaxVal.minVal;
  };

  const sessions = useAppSelector(getTrainingSessions)
    ?.filter(
      (item) =>
        item.endTrainingDate &&
        filterSessions(
          selectValue,
          new Date(item.startTrainingDate),
          item.startTrainingDate,
          item.endTrainingDate
        )
    )
    .sort((a, b) => b.startTrainingDate - a.startTrainingDate);

  const selectOptions = [
    { value: 7, label: "tydzień" },
    { value: 31, label: "miesiąc" },
    { value: 365, label: "rok" },
    { value: 0, label: "wszystkie" },
  ];

  const renderTrainings = sessions?.map((item) => {
    const sessionLength = calcHoursAndMinutes(
      calcTimeLength(item.startTrainingDate, item.endTrainingDate as number)
    );

    const pickSession = () => {
      chooseSession(item);
      openModal();
    };

    return (
      <TrainingItem
        as={motion.div}
        key={item.trainingSessionId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span>{`${item.dayName} (${item.trainingName})`}</span>
        {
          <p>
            {lightFormat(new Date(item.startTrainingDate), "dd.MM.yyyy HH:mm")}
          </p>
        }
        <Button btnType="primary--pink" size="s" rounded callback={pickSession}>
          Sprawdź
        </Button>
        <AlarmIconWrapper>
          <AlarmIcon />
          {sessionLength.hours > 0 && (
            <StyledTimeSpan suffix="g">{sessionLength.hours}</StyledTimeSpan>
          )}
          {sessionLength.minutes > 0 && (
            <StyledTimeSpan suffix="min">
              {sessionLength.minutes}
            </StyledTimeSpan>
          )}
        </AlarmIconWrapper>
        <ExercisesProgressWrapper>
          {item.exercises.map((item) => {
            const progressType = checkProgress(
              item.weightFrom,
              item.weightTo as number,
              item.repsFrom,
              item.repsTo as number
            );
            return <ExerciseProgressItem progressType={progressType} />;
          })}
        </ExercisesProgressWrapper>
      </TrainingItem>
    );
  });

  return (
    <MainPageTemplate padding="40px 5% 100px">
      <InlineWrapper justifyContent="space-between">
        <StatsHeader>Historia</StatsHeader>
        <Controller
          control={control}
          defaultValue={selectOptions[0].value as TimesType}
          name="selectTime"
          render={({ field }) => (
            <StyledSelect
              onChange={field.onChange}
              value={field.value}
              ref={field.ref}
              options={selectOptions}
            />
          )}
        />
      </InlineWrapper>
      <TrainingItemsWrapper>{renderTrainings}</TrainingItemsWrapper>

      {/* !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! MODALS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}

      <Modal isOpen={isSessionReportOpen} handleClose={closeModal}>
        <SessionReport
          checkProgress={checkProgress}
          choosenSession={choosenSession}
          handleClose={closeModal}
        />
      </Modal>
    </MainPageTemplate>
  );
};

export default Stats;
