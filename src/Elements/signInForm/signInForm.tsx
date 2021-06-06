import React, { FC, useState } from "react";
import { Form, Button, Checkbox, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { BaseButton } from "Elements/Base/Button/BaseButton";
import styled from "styled-components";
import { BaseInput } from "Elements/Base/Input/BaseInput";
import BaseModal from "Elements/Base/Modal/BaseModal";
import { useAuth } from "../../bus/auth/hooks/useAuth";
import { AuthFormData } from "../../bus/auth/types";
import { signInAsync, signModalToggle } from "../../bus/auth/actions";

const LoginBody = styled(Row)`
  width: 460px;
  border-radius: 24px;
  background: #ffffff;
  padding: 40px 30px;
`;

const LoginHeader = styled.div`
  color: #2c2738;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 44px;
  margin-bottom: 50px;
`;
const FormStyle = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  label {
    color: #756f86;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    &:after {
      content: "";
    }
  }
  .ant-form-item-label {
    text-align: left;
  }
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

type SingProps = {
  type?: string;
};

const layout = {};
const tailLayout = {};

export const SignInForm: FC<SingProps> = ({ type }) => {
  const dispatch = useDispatch();
  const { isFetching, error, data, showModal } = useAuth();

  const errorMessageJSX = error && <p>{error.message}</p>;
  const loaderJSX = isFetching && <p>loading data from Api...</p>;
  const AuthData = data && <pre>{data.user.email}</pre>;

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

  const show = () => {
    dispatch(signModalToggle(true));
  };

  const cancel = () => {
    dispatch(signModalToggle(false));
  };

  return (
    <>
      <BaseButton onClick={show} disabled={isFetching}>
        LOG IN
      </BaseButton>
      <BaseModal visible={showModal} show={show} cancel={cancel}>
        <LoginBody>
          <Col span={24}>
            <LoginHeader>Вход</LoginHeader>
            <Form
              {...layout}
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              validateMessages={validateMessages}
            >
              <FormStyle
                label="Email"
                name="email"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Пожалуйста введите ваш email!",
                  },
                ]}
              >
                <StyleInput>
                  <BaseInput className="input" />
                </StyleInput>
              </FormStyle>

              <FormStyle
                label="Пароль"
                name="password"
                rules={[
                  { required: true, message: "Пожалуйста введите ваш пароль!" },
                ]}
              >
                <StyleInput>
                  <BaseInput className="input" type="password" />
                </StyleInput>
              </FormStyle>

              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Запомнить меня</Checkbox>
              </Form.Item>
              <Row justify="space-between">
                <Col>
                  <Form.Item {...tailLayout}>
                    <BaseButton>Войти</BaseButton>
                  </Form.Item>
                </Col>
                <Col>
                  <Link href="/signUp">
                    <a>
                      <Button htmlType="button">Регистрация</Button>
                    </a>
                  </Link>
                </Col>
              </Row>
            </Form>
          </Col>
        </LoginBody>
      </BaseModal>
    </>
  );
};
