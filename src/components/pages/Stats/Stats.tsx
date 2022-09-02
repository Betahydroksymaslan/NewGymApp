import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import { getTrainingSessions } from "slices/trainingSessionSlice";
import { useAppSelector } from "store/hooks";
import { TrainingItem, TrainingItemsWrapper, StatsHeader, AlarmIconWrapper } from "./Stats.style";
import Button from "components/atoms/Button/Button";
import { lightFormat } from "date-fns";
import { calcTimeLength } from "helpers/calcTimeLength";
import InlineWrapper from "components/templates/InlineWrapper/InlineWrapper";
import StyledSelect from "components/molecules/StyledSelect/StyledSelect";
import { useForm, Controller } from "react-hook-form";
import { isThisWeek, isThisMonth, isThisYear } from "date-fns";
import { motion } from "framer-motion";
import { ReactComponent as AlarmIcon } from "assets/icons/alarmIcon.svg";

const Stats = () => {
  const { control, watch } = useForm();

  const selectValue = watch("selectTime");

  const filterSessions = (
    time: "week" | "year" | "month" | "all",
    date: Date
  ) => {
    const data: any = {
      week: isThisWeek(date),
      month: isThisMonth(date),
      year: isThisYear(date),
    };

    return time === "all" ? true : data[time];
  };
  const sessions = useAppSelector(getTrainingSessions)
    ?.filter(
      (item) =>
        item.endTrainingDate &&
        filterSessions(selectValue, new Date(item.startTrainingDate))
    )
    .sort((a, b) => b.startTrainingDate - a.startTrainingDate);

  console.log(sessions);

  const SelectOptions = [
    { value: "week", label: "tydzień" },
    { value: "month", label: "miesiąc" },
    { value: "year", label: "rok" },
    { value: "all", label: "wszystkie" },
  ];

  const renderTrainings = sessions?.map((item) => {
    const trainingLength = item.endTrainingDate
      ? calcTimeLength(item.startTrainingDate, item.endTrainingDate)
      : "0";
  
    return (
      <TrainingItem
        as={motion.div}
        key={item.trainingSessionId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span>{`${item.dayName} (${item.trainingName})`}</span>
        {<p>{lightFormat(new Date(item.startTrainingDate), "dd-MM-yyyy")}</p>}
        <Button btnType="primary--pink" size="s" rounded>
          Sprawdź
        </Button>
        <AlarmIconWrapper><AlarmIcon /><span>{trainingLength}</span></AlarmIconWrapper>
      </TrainingItem>
    );
  });

  return (
    <MainPageTemplate padding="40px 5% 100px">
      <InlineWrapper justifyContent="space-between">
        <StatsHeader>Historia</StatsHeader>
        <Controller
          control={control}
          defaultValue={SelectOptions[0].value}
          name="selectTime"
          render={({ field }) => (
            <StyledSelect
              onChange={field.onChange}
              value={field.value}
              ref={field.ref}
              options={SelectOptions}
            />
          )}
        />
      </InlineWrapper>
      <TrainingItemsWrapper>{renderTrainings}</TrainingItemsWrapper>
    </MainPageTemplate>
  );
};

export default Stats;
