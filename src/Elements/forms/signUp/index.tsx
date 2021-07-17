// Core
import React, { FC } from "react";
// Antd
import { Form } from "antd";
// Hooks
import { useDispatch } from "react-redux";
import { BaseButton, ButtonType } from "stories/BaseButton";
import styled from "styled-components";
import { BaseInput } from "stories/BaseInput";
import { AuthFormStates } from "Elements/forms/auth";
import { useToast } from "utils/hooks/useToast";
import { useAuth } from "../../../bus/auth/hooks/useAuth";
// Actions
import { signUpAsync } from "../../../bus/auth/actions";
// Types
import { AuthFormData } from "../../../bus/auth/types";

// const layout = { labelCol: { span: 24 }, wrapperCol: { span: 24 } };

export const AuthBody = styled.div`
  width: 460px;
  border-radius: 24px;
  background: #ffffff;
  padding: 40px 30px;
  @media (max-width: 576px) {
    width: 320px;
  }
  @media (max-height: 768px) {
    max-height: 90vh;
    max-width: 90vh;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: baseline;
`;

const Title = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 44px;
  color: #2c2738;
  margin-bottom: 20px;
`;

const Subtitle = styled.div`
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #2c2738;
  display: flex;
  .underlined {
    color: #0880ae;
    margin-left: 5px;
    cursor: pointer;
    transition: 0.3s all ease;
    &:hover {
      opacity: 0.7;
    }
  }
  margin-bottom: 58px;
`;

const StyledForm = styled(Form)`
  width: 100%;
`;

export const ModalFormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column !important;
  .ant-form-item-label {
    text-align: left;
  }
  label {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    color: #756f86;
    &:after {
      content: "";
    }
  }
`;

const InputStyle = styled.div`
  .input {
    width: 100%;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
    color: #7c9cbf;
    border: 1px solid #dbe2ea;
    box-sizing: border-box;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
    border-radius: 6px;
    height: 52px;
  }
`;

const SubmitButton = styled(BaseButton)`
  width: 100%;
  height: 57px;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  border: none;
  background: #000000;
  color: #fff;
  margin-top: 33px;
  border: none !important;
  &:disabled {
    background: #dbe2ea;
    color: #b1b5bf;
  }
  &:hover {
    color: #fff;
  }
`;

type Props = {
  updateAuthState: (state: AuthFormStates) => void;
};

export const SignUpForm: FC<Props> = ({ updateAuthState }) => {
  const dispatch = useDispatch();
  const { isFetching, error, data } = useAuth("register");
  const msg = (error && error?.error?.message) || "";
  const hasErr = Boolean(msg);
  useToast(msg, 3, "error");

  const [form] = Form.useForm();

  const onFinish = (values: AuthFormData) => {
    dispatch(signUpAsync(values));
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is reqired",
    types: {
      email: "${label} is not a valid email",
    },
  };

  return (
    <AuthBody>
      <Container>
        <Title>Sign Up</Title>
        <Subtitle>
          Already have an account?
          <div
            className="underlined"
            onClick={() => updateAuthState(AuthFormStates.login)}
          >
            login
          </div>
        </Subtitle>

        <StyledForm
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <ModalFormItem
            label="email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <InputStyle>
              <BaseInput className="input" hasError={hasErr} />
            </InputStyle>
          </ModalFormItem>

          <ModalFormItem
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                min: 8,
                message: "Please input your password!",
              },
            ]}
          >
            <InputStyle>
              <BaseInput type="password" className="input" hasError={hasErr} />
            </InputStyle>
          </ModalFormItem>

          <ModalFormItem
            label="Confirm"
            name="repassword"
            rules={[
              {
                min: 8,
                required: true,
                message: "Please input your password again!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <InputStyle>
              <BaseInput type="password" className="input" hasError={hasErr} />
            </InputStyle>
          </ModalFormItem>
          <Form.Item shouldUpdate className="submit">
            {() => (
              <SubmitButton
                className="submitButton"
                typeComponent={ButtonType.secondary}
                type="submit"
                disabled={
                  !form.isFieldsTouched(true) ||
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0 ||
                  isFetching
                }
              >
                Sign Up
              </SubmitButton>
            )}
          </Form.Item>
        </StyledForm>
      </Container>
    </AuthBody>
  );
};
