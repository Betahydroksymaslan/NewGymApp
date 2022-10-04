import { useState } from "react";
import { StyledPageArea, MinMaxSessionTimeWrapper } from "./Account.style";
import MainPageTemplate from "components/templates/MainPageTemplate/MainPageTemplate";
import { ReactComponent as FemaleAvatarIcon } from "assets/icons/femaleAvatarIcon.svg";
import { ReactComponent as MaleAvatarIcon } from "assets/icons/maleAvatarIcon.svg";
import { checkGender } from "helpers/checkGender";
import Button from "components/atoms/Button/Button";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getUser } from "slices/authSlice";
import { authActions } from "slices/authSlice";
import Modal from "components/templates/Modal/Modal";
import ChangeUserData from "components/organisms/ChangeUserData/ChangeUserData";
import Tooltip from "components/atoms/Tooltip/Tooltip";
import ChangeMinMaxFilter from "components/organisms/ChangeMinMaxFilter/ChangeMinMaxFilter";

type ModalsTypes = "userDataModal" | "changeMinMaxTime";

const Account = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const [modals, setModals] = useState({
    userDataModal: false,
    changeMinMaxTime: false,
  });
  const openModal = (modal: ModalsTypes) =>
    setModals((prevState) => ({ ...prevState, [modal]: true }));
  const closeModal = (modal: ModalsTypes) =>
    setModals((prevState) => ({ ...prevState, [modal]: false }));

  const renderGenderAvatar =
    checkGender(user?.displayName as string) === "male" ? (
      <MaleAvatarIcon />
    ) : (
      <FemaleAvatarIcon />
    );

  return (
    <MainPageTemplate>
      <StyledPageArea>
        {user && renderGenderAvatar}
        <h1>{user?.displayName}</h1>
        <span>{user?.email}</span>
        <Button rounded withArrow callback={() => openModal("userDataModal")}>
          Edytuj profil
        </Button>
      </StyledPageArea>

      <StyledPageArea>
        <MinMaxSessionTimeWrapper>
          <Tooltip message="Ustal, które z sesji mają nie być brane pod uwagę w raportach potreningowych. Odrzucane mogą być treningi zbyt któtkie, bądź te trwające zbyt długo">
            <p>Filtruj sesje</p>
          </Tooltip>
          <Button
            size="s"
            rounded
            callback={() => openModal("changeMinMaxTime")}
          >
            zmień
          </Button>
        </MinMaxSessionTimeWrapper>
      </StyledPageArea>

      <StyledPageArea>
        <Button
          withArrow
          rounded
          callback={() => dispatch(authActions.logout())}
        >
          Wyloguj się
        </Button>
      </StyledPageArea>

      <Modal
        handleClose={() => closeModal("userDataModal")}
        isOpen={modals.userDataModal}
      >
        <ChangeUserData handleClose={() => closeModal("userDataModal")} />
      </Modal>

      <ChangeMinMaxFilter
        isOpen={modals.changeMinMaxTime}
        handleClose={() => closeModal("changeMinMaxTime")}
      />
    </MainPageTemplate>
  );
};

export default Account;
