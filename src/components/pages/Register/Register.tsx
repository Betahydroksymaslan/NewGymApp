import React from "react";
import {
  Wrapper,
  Header,
  StyledForm,
  SubHeader,
  StyledSpan,
  InlineWrapper,
} from "components/pages/Login/Login.style";
import FormField from "components/molecules/FormField/FormField";
import Button from "components/atoms/Button/Button";
import SocialButton from "components/atoms/SocialButton/SocialButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { authActions } from "slices/authSlice";
import { getLoadingState } from "slices/apiCallSlice";
import StyledLink from "components/atoms/StyledLink/StyledLink";
import { SIGNIN } from "constants/routes";
import { useNavigate } from "react-router-dom";

type InputsTypes = { login: string; password: string, name: string };

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
    const registerData = {
      email: data.login,
      password: data.password,
      name: data.name,
      callback: navigate,
    };
    dispatch(authActions.register(registerData));
  };

  return (
    <Wrapper>
      <Header>Zarejestruj się</Header>
      <SubHeader>Hej, podaj swoje dane żeby się zarejestrować</SubHeader>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormField
          {...register("login", { required: "To pole jest wymagane", pattern: {
            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Niepoprawny adres email'
          } })}
          id="login"
          name="login"
          label="Adres email"
          isError={!!errors.login}
          errorMessage={errors?.login?.message}
        />
        <FormField
          {...register("name", { required: "To pole jest wymagane" })}
          id="name"
          name="name"
          label="Twoje imię"
          isError={!!errors.name}
          errorMessage={errors?.name?.message}
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
        <Button disabled={isLoading}>Zarejestruj się</Button>
      </StyledForm>
      <StyledSpan useLines>Albo zaloguj się z</StyledSpan>
      <InlineWrapper>
        <SocialButton
          isGoogle={true}
          src="https://img.icons8.com/?size=512&id=17949&format=png"
          alt="google icon"
        >
          Google
        </SocialButton>
        <SocialButton>Facebook</SocialButton>
      </InlineWrapper>
      <StyledSpan>
        Masz już konto? <StyledLink to={SIGNIN}>Zaloguj się!</StyledLink>
      </StyledSpan>
    </Wrapper>
  );
};

export default Login;
