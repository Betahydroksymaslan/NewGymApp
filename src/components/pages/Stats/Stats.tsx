import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import { useState } from "react";
import { getTrainingSessions } from "slices/trainingSessionSlice";
import { useAppSelector } from "store/hooks";
import {
  TrainingItem,
  TrainingItemsWrapper,
  StatsHeader,
  AlarmIconWrapper,
} from "./Stats.style";
import Button from "components/atoms/Button/Button";
import { calcTimeLength } from "helpers/calcTimeLength";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import StyledSelect from "components/molecules/StyledSelect/StyledSelect";
import { useForm, Controller } from "react-hook-form";
import { lightFormat, subDays, isAfter } from "date-fns";
import { motion } from "framer-motion";
import { ReactComponent as AlarmIcon } from "assets/icons/alarmIcon.svg";
import Modal from "components/templates/Modal/Modal";
import SessionReport from "components/organisms/SessionReport/SessionReport";
import { TrainingSessionsHistory } from "models/trainingSessionsModel";

type TimesType = 0 | 7 | 31 | 365;
type InputTypes = {
  selectTime: TimesType;
};

const Stats = () => {
  const [isSessionReportOpen, setIsSessionReportOpen] = useState(false);
  const openModal = () => setIsSessionReportOpen(true);
  const closeModal = () => setIsSessionReportOpen(false);

  const [choosenSession, setChoosenSession] =
    useState<TrainingSessionsHistory>(null);
  const chooseSession = (session: TrainingSessionsHistory) =>
    setChoosenSession(session);

  const { control, watch } = useForm<InputTypes>({
    defaultValues: {
      selectTime: 7,
    },
  });

  const selectValue = watch("selectTime");

  const filterSessions = (time: TimesType, date: Date) => {
    const today = new Date();
    const dayInPast = subDays(today, time);
    const isThisDate = isAfter(date, dayInPast);
    return isThisDate;
  };

  const sessions = useAppSelector(getTrainingSessions)
    ?.filter(
      (item) =>
        item.endTrainingDate &&
        filterSessions(selectValue, new Date(item.startTrainingDate))
    )
    .sort((a, b) => b.startTrainingDate - a.startTrainingDate);

  const selectOptions = [
    { value: 7, label: "tydzień" },
    { value: 31, label: "miesiąc" },
    { value: 365, label: "rok" },
    { value: 0, label: "wszystkie" },
  ];

  const renderTrainings = sessions?.map((item) => {
    const trainingLength = item.endTrainingDate
      ? calcTimeLength(item.startTrainingDate, item.endTrainingDate)
      : "0";

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
          <span>{trainingLength}</span>
        </AlarmIconWrapper>
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
          choosenSession={choosenSession}
          handleClose={closeModal}
        />
      </Modal>
    </MainPageTemplate>
  );
};

export default Stats;
