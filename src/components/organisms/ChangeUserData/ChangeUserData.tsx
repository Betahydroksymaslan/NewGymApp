import { Wrapper, SmallArea } from "./ChangeUserData.style";
import FormField from "components/molecules/FormField/FormField";
import Button from "components/atoms/Button/Button";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getUser } from "slices/authSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { authActions } from "slices/authSlice";

type ChangeUserDataType = {
  handleClose: () => void;
};

type EmailInputType = { changeEmail: string };
type PasswordInputType = { changePassword: string };
type NameInputType = { changeName: string };

const ChangeUserData = ({ handleClose }: ChangeUserDataType) => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();

  /* !!!!!!!!!!!!!!!!!!!!!! CHANGE EMAIL !!!!!!!!!!!!!!!!!!!!!! */

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailInputType>();

  const onSubmit: SubmitHandler<EmailInputType> = (data) => {
    dispatch(
      authActions.changeCredentialsEmail({ newCredential: data.changeEmail })
    );
  };

  /* !!!!!!!!!!!!!!!!!!!!!! CHANGE PASSWORD !!!!!!!!!!!!!!!!!!!!!! */

  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
  } = useForm<PasswordInputType>();

  const onSubmitPassword: SubmitHandler<PasswordInputType> = (data) => {
    dispatch(
      authActions.changeCredentialsPassword({
        newCredential: data.changePassword,
      })
    );
  };

  /* !!!!!!!!!!!!!!!!!!!!!! CHANGE DISPLAY NAME !!!!!!!!!!!!!!!!!!!!!! */

  const {
    register: nameRegister,
    handleSubmit: nameHandleSubmit,
    formState: { errors: nameErrors },
  } = useForm<NameInputType>();

  const onSubmitName: SubmitHandler<NameInputType> = (data) => {
    dispatch(
      authActions.changeCredentialsName({ newCredential: data.changeName })
    );
  };

  return (
    <Wrapper>
      <h2>Edycja profilu</h2>

      {/* !!!!!!!!!!!!!!!!!!!!!! CHANGE EMAIL !!!!!!!!!!!!!!!!!!!!!! */}

      <SmallArea onSubmit={handleSubmit(onSubmit)}>
        <FormField
          {...register("changeEmail", {
            required: "To pole jest wymagane",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "Niepoprawny adres email",
            },
          })}
          label="Zmień email"
          name="changeEmail"
          id="changeEmail"
          placeholder={user?.email as string}
          isError={!!errors?.changeEmail}
          errorMessage={errors?.changeEmail?.message}
        />
        <Button size="s">Zmień</Button>
      </SmallArea>

      {/* !!!!!!!!!!!!!!!!!!!!!! CHANGE PASSWORD !!!!!!!!!!!!!!!!!!!!!! */}

      <SmallArea onSubmit={passwordHandleSubmit(onSubmitPassword)}>
        <FormField
          {...passwordRegister("changePassword", {
            required: "To pole jest wymagane",
          })}
          name="changePassword"
          label="Zmień hasło"
          type="password"
          id="changePassword"
          placeholder="Podaj nowe hasło"
          isError={!!passwordErrors?.changePassword}
          errorMessage={passwordErrors?.changePassword?.message}
        />
        <Button size="s">Zmień</Button>
      </SmallArea>

      {/* !!!!!!!!!!!!!!!!!!!!!! CHANGE DISPLAY NAME !!!!!!!!!!!!!!!!!!!!!! */}

      <SmallArea onSubmit={nameHandleSubmit(onSubmitName)}>
        <FormField
          {...nameRegister("changeName", {
            required: "To pole jest wymagane",
          })}
          label="Zmień imię"
          id="changeName"
          placeholder={user?.displayName as string}
          isError={!!nameErrors?.changeName}
          errorMessage={nameErrors?.changeName?.message}
        />
        <Button size="s">Zmień</Button>
      </SmallArea>

      <Button callback={handleClose} wide>Zamknij</Button>
    </Wrapper>
  );
};

export default ChangeUserData;
