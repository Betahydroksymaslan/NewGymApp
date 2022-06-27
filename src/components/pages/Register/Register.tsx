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
import {useAppDispatch} from 'store/hooks';
import {signUp} from 'services/authService';

type InputsTypes = { login: string; password: string };


const Login = () => {
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputsTypes>();

  const onSubmit: SubmitHandler<InputsTypes> = (data) => {
    signUp(data.login, data.password)
  };

  return (
    <Wrapper>
      <Header>Zarejestruj się</Header>
      <SubHeader>Hej, podaj swoje dane żeby się zarejestrować</SubHeader>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <FormField
          {...register("login", { required: 'To pole jest wymagane' })}
          id="login"
          name="login"
          label="Nazwa użytkownika"
          isError={!!errors.login}
          errorMessage={errors?.login?.message}
        />
        <FormField
          {...register("password", { required: 'To pole jest wymagane' })}
          id="password"
          type="password"
          name="password"
          label="Hasło"
          isError={!!errors.password}
          errorMessage={errors?.password?.message}
        />
        <Button>Zarejestruj się</Button>
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
        Masz już konto?
        {' '}
        <Button btnType="tertiary">Zaloguj się</Button>
      </StyledSpan>
    </Wrapper>
  );
};

export default Login;