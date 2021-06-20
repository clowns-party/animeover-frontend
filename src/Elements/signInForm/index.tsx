import React, { FC } from "react";
import { Form, Checkbox, Row, Col, message } from "antd";
import { useDispatch } from "react-redux";
import { BaseButton, ButtonType } from "Elements/Base/Button/BaseButton";
import styled from "styled-components";
import { BaseInput } from "Elements/Base/Input/BaseInput";
import { AuthFormStates } from "Elements/authForm";
import { AuthBody, ModalFormItem } from "Elements/signUpForm";
import { useAuth } from "bus/auth/hooks/useAuth";
import { AuthFormData } from "../../bus/auth/types";
import { signInAsync } from "../../bus/auth/actions";

const LoginHeader = styled.div`
  color: #2c2738;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 44px;
  margin-bottom: 50px;
`;

const StyleInput = styled.div`
  .input {
    width: 100%;
    height: 52px;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 21px;
  }
`;

type Props = {
  updateAuthState: (state: AuthFormStates) => void;
};

const layout = {};
const tailLayout = {};

export const SignInForm: FC<Props> = ({ updateAuthState }) => {
  const dispatch = useDispatch();
  const { error } = useAuth("login");
  React.useEffect(() => {
    if (error) {
      message.error({
        content: error?.error?.message,
        duration: 3,
      });
    }
  }, [error]);

  const onFinish = (values: AuthFormData) => {
    dispatch(signInAsync(values));
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
      <Col span={24}>
        <LoginHeader>Login</LoginHeader>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <ModalFormItem
            label="Email"
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please enter your email",
              },
            ]}
          >
            <StyleInput>
              <BaseInput className="input" />
            </StyleInput>
          </ModalFormItem>

          <ModalFormItem
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <StyleInput>
              <BaseInput className="input" type="password" />
            </StyleInput>
          </ModalFormItem>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Row justify="space-between">
            <Col>
              <Form.Item {...tailLayout}>
                <BaseButton>login</BaseButton>
              </Form.Item>
            </Col>
            <Col>
              <BaseButton
                typeComponent={ButtonType.important}
                onClick={() => updateAuthState(AuthFormStates.register)}
              >
                register
              </BaseButton>
            </Col>
          </Row>
        </Form>
      </Col>
    </AuthBody>
  );
};
