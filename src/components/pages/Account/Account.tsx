import { useState } from "react";
import { StyledPageArea } from "./Account.style";
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

const Account = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  const [isUserDataModalOpen, setIsUserDataModalOpen] = useState(false);
  const openUserDataModal = () => setIsUserDataModalOpen(true);
  const closeUserDataModal = () => setIsUserDataModalOpen(false);

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
        <Button rounded withArrow callback={openUserDataModal}>
          Edytuj profil
        </Button>
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

      <Modal handleClose={closeUserDataModal} isOpen={isUserDataModalOpen}>
        <ChangeUserData handleClose={closeUserDataModal} />
      </Modal>
    </MainPageTemplate>
  );
};

export default Account;
