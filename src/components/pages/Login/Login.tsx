import React from "react";
import {
  Wrapper,
  Header,
  StyledForm,
  SubHeader,
  StyledSpan,
  InlineWrapper,
} from "./Login.style";
import FormField from "components/molecules/FormField/FormField";
import Button from "components/atoms/Button/Button";
import SocialButton from "components/atoms/SocialButton/SocialButton";
import { useForm, SubmitHandler } from "react-hook-form";
import {authActions} from 'slices/authSlice';
import {useAppDispatch, useAppSelector} from 'store/hooks';
import {getLoadingState} from 'slices/apiCallSlice';

type InputsTypes = { login: string; password: string };

const Login = () => {
  const dispatch = useAppDispatch()
  const isLoading  = useAppSelector(getLoadingState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsTypes>();
  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    const userData = {
      email: data.login,
      password: data.password
    }
    dispatch(authActions.login(userData));
  };

  return (
    <Wrapper>
      <Header>Zaloguj się</Header>
      <SubHeader>Hej, podaj swoje dane żeby się zalogować</SubHeader>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormField
          {...register("login", { required: "To pole jest wymagane" })}
          id="login"
          name="login"
          label="Nazwa użytkownika"
          isError={!!errors.login}
          errorMessage={errors?.login?.message}
        />
        <FormField
          {...register("password", { required: "To pole jest wymagane" })}
          id="password"
          type="password"
          name="password"
          label="Hasło"
          isError={!!errors.password}
          errorMessage={errors?.password?.message}
        />
        <Button disabled={isLoading}>Zaloguj się</Button>
      </StyledForm>
      <StyledSpan useLines>Albo zaloguj się z</StyledSpan>
      <InlineWrapper>
        <SocialButton
          isGoogle={true}
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="google icon"
        >
          Google
        </SocialButton>
        <SocialButton>Facebook</SocialButton>
      </InlineWrapper>
      <StyledSpan>
        Nie masz jeszcze konta?{" "}
        <Button btnType="tertiary">Zarejestruj się</Button>
      </StyledSpan>
    </Wrapper>
  );
};

export default Login;
