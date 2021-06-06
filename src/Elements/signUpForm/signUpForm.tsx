// Core
import React, { FC, useEffect, useState } from "react";
// Antd
import { Row, Col, Form, Input, Button } from "antd";
// Hooks
import { useDispatch } from "react-redux";
import { useAuth } from "../../bus/auth/hooks/useAuth";
// Actions
import { signUpAsync } from "../../bus/auth/actions";
// Types
import { AuthFormData } from "../../bus/auth/types";
import styled from "styled-components";
import { BaseInput } from "Elements/Base/Input/BaseInput";
import { BaseButton, ButtonType } from "Elements/Base/Button/BaseButton";

const layout = {};
const tailLayout = {};

export const SignUpForm: FC = () => {
  const StyledContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 1rem;
  `;

  const StyledRow = styled.div`
    justify-content: center;
    width: 460px;
    background: #fff;
    padding: 40px 30px 16px 30px;
    border-radius: 24px;
  `;

  const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const ModalTitle = styled.div`
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 44px;
    color: #2c2738;
    margin-bottom: 20px;
  `;

  const ModalForm = styled(Form)`
    width: 100%;
  `;

  const ModalFormItem = styled(Form.Item)`
    flex-direction: column;
    .ant-form-item-label {
      text-align: left;
    }
    label {
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

  const SubmitButton = styled.div`
    .submitButton {
      width: 100%;
      height: 57px;
      font-family: IBM Plex Sans;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      text-align: center;
      border: none;
      background: #000000;
      color: #fff;
      &:disabled {
        background: #dbe2ea;
        color: #b1b5bf;
      }
    }
  `;

  const dispatch = useDispatch();
  const { isFetching, error, data } = useAuth();
  const [, forceUpdate] = useState({});
  const [form] = Form.useForm();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const disableButton = () => {
    return (
      !form.isFieldsTouched(true) ||
      !!form.getFieldsError().filter(({ errors }) => errors.length).length ||
      isFetching
    );
  };

  const onFinish = (values: AuthFormData) => {
    dispatch(signUpAsync(values));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is reqired",
    types: {
      email: "${label} is not a valid email",
    },
  };

  return (
    <StyledContainer>
      <StyledRow>
        <ModalContainer>
          <ModalTitle>Sign Up</ModalTitle>
          <ModalForm
            {...layout}
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
                <BaseInput className="input" />
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
                <BaseInput type="password" className="input" />
              </InputStyle>
            </ModalFormItem>

            <ModalFormItem
              label="Confirm"
              name="repassword"
              rules={[
                {
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
                <BaseInput type="password" className="input" />
              </InputStyle>
            </ModalFormItem>

            <ModalFormItem {...tailLayout} shouldUpdate>
              {() => (
                <SubmitButton>
                  <BaseButton
                    className="submitButton"
                    typeComponent={ButtonType.secondary}
                    type="submit"
                    disabled={disableButton()}
                  >
                    SignUp
                  </BaseButton>
                </SubmitButton>
              )}
            </ModalFormItem>
          </ModalForm>
        </ModalContainer>
      </StyledRow>
    </StyledContainer>
  );
};
