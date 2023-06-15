import {useState, useEffect} from 'react'
import { Wrapper, TimeWrapper, TimeSpan } from "./EndOfTrainingBoard.style";
import { ReactComponent as EndOfTrainingImage } from "assets/images/endTrainingImage.svg";
import Button from "components/atoms/Button/Button";
import { getTrainingSession } from "slices/trainingSessionSlice";
import { useAppSelector } from "store/hooks";
import { calcTimeLength, calcHoursAndMinutes } from "helpers/calcTimeLength";
import { ReactComponent as AlarmIcon } from "assets/icons/alarmIcon.svg";

interface EndOfTrainingBoardType {
    closeSessionBoard: () => void
}

const EndOfTrainingBoard = 
  ({ closeSessionBoard }: EndOfTrainingBoardType) => {
    const session = useAppSelector(getTrainingSession)
    const [totalConvertedTime, setTotalConvertedTime] = useState({hours: 0, minutes: 0})

    useEffect(() => {
        if (!session || !session.endTrainingDate) return

        const sessionLength = calcHoursAndMinutes(
            calcTimeLength(session.startTrainingDate, session.endTrainingDate as number)
          );

        setTotalConvertedTime(sessionLength)
    }, [])
   

    return (
      <Wrapper>
        <EndOfTrainingImage />
          <h2>Gratulacje! Ukończyłeś swój trening :)
          </h2>
        <TimeWrapper>
            <AlarmIcon />
            {totalConvertedTime.hours > 0 && <TimeSpan suffix='g'>{totalConvertedTime.hours}</TimeSpan>} <TimeSpan suffix='min'>{totalConvertedTime.minutes}</TimeSpan>
        </TimeWrapper>
          <Button size="l" rounded wide callback={closeSessionBoard}>
            Wróć do menu
          </Button>
      </Wrapper>
    );
  }


export default EndOfTrainingBoard;