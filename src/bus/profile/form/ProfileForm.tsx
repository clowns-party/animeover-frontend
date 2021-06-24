/* eslint-disable jsx-a11y/label-has-associated-control */
import { AuthFormData, User } from "bus/auth/types";
import { Form } from "antd";
import styled from "styled-components";
import { BaseButton, ButtonType } from "Elements/Base/Button/BaseButton";
import React, { FC } from "react";
import { BaseInput } from "Elements/Base/Input/BaseInput";
import { VALIDA_IMAGE_URL_PATTERN } from "utils/validate/validateImgUrl";
import { service } from "Services";
import { UpdateUserFormData } from "../types";

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  input {
    width: 100%;
  }
  .btn {
    margin-top: 15px;
  }
`;

const FormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column !important;
  .ant-form-item-label {
    text-align: left;
  }
  label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  margin-bottom: 0px !important;
`;

type EditorProps = { toggle: () => void; user: User["user"] | null };

export const ProfileForm: FC<EditorProps> = ({ user, toggle }) => {
  const [form] = Form.useForm();
  const onFinish = async (values: UpdateUserFormData & { email: string }) => {
    delete values.email;
    try {
      const res = await service.userService.updateUser(values);
      toggle();
    } catch (error) {
      alert("сделать тост на ошибку");
    }
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is reqired",
    types: {
      email: "${label} is not a valid email",
    },
  };
  return (
    <StyledForm
      form={form}
      initialValues={{
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <FormItem
        label="Display Name"
        name="displayName"
        rules={[
          {
            type: "string",
            message: "Please input your name!",
            min: 5,
          },
        ]}
      >
        <BaseInput />
      </FormItem>
      <FormItem
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "Please input your email!",
            min: 8,
          },
        ]}
      >
        <BaseInput />
      </FormItem>
      <FormItem
        label="Photo URL ( jpeg | jpg | png)"
        name="photoURL"
        rules={[
          {
            type: "string",
            message: "Please input your url!",
            pattern: VALIDA_IMAGE_URL_PATTERN,
          },
        ]}
      >
        <BaseInput />
      </FormItem>
      <FormItem shouldUpdate>
        {() => (
          <BaseButton
            typeComponent={ButtonType.important}
            className="btn"
            disabled={Boolean(
              form.getFieldsError().filter(({ errors }) => errors.length)
                .length > 0
            )}
          >
            save
          </BaseButton>
        )}
      </FormItem>
    </StyledForm>
  );
};
