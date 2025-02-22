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
import StyledLink from "components/atoms/StyledLink/StyledLink";
import { useForm, SubmitHandler } from "react-hook-form";
import { authActions } from "slices/authSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getLoadingState } from "slices/apiCallSlice";
import { SIGNUP } from "constants/routes";
import { useNavigate } from "react-router-dom";

type InputsTypes = { login: string; password: string };

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(getLoadingState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsTypes>();

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    const userData = {
      email: data.login,
      password: data.password,
      callback: navigate,
    };

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
          onClick={() => dispatch(authActions.loginWithGoogle({callback: navigate}))}
          src="https://img.icons8.com/?size=512&id=17949&format=png"
          alt="google icon"
        >
          Google
        </SocialButton>
        <SocialButton onClick={() => dispatch(authActions.loginWithFacebook({callback: navigate}))}>Facebook</SocialButton>
      </InlineWrapper>
      <StyledSpan>
        Nie masz jeszcze konta?{" "}
        <StyledLink to={SIGNUP}>Zarejestruj się</StyledLink>
      </StyledSpan>
    </Wrapper>
  );
};

export default Login;
