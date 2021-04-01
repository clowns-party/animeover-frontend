import React, { FC } from "react";
import { Form, Input, Button, Checkbox, Row, Col, PageHeader } from "antd";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { LoginOutlined } from "@ant-design/icons";
import styles from "./login.module.scss";
import { useAuth } from "../../bus/auth/hooks/useAuth";
import { AuthFormData } from "../../bus/auth/types";
import { signInAsync } from "../../bus/auth/actions";

type SingProps = {
  type?: string;
};

const layout = {};
const tailLayout = {};

export const SignInForm: FC<SingProps> = ({ type }) => {
  const dispatch = useDispatch();
  const { isFetching, error, data } = useAuth();

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

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  let className = "position";
  if (type) {
    className += type;
  }

  return (
    <Row className={styles[`${className}`]} justify="center">
      {/* {errorMessageJSX}
      {loaderJSX}
      {AuthData} */}
      <Col span={24}>
        <PageHeader style={{ paddingLeft: 0, fontSize: 20 }}>Вход</PageHeader>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
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
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[
              { required: true, message: "Пожалуйста введите ваш пароль!" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Запомнить меня</Checkbox>
          </Form.Item>
          <Row justify="space-between">
            <Col>
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<LoginOutlined />}
                >
                  Войти
                </Button>
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
    </Row>
  );
};
