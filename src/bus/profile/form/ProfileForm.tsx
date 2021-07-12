import { Form } from "antd";
import styled from "styled-components";
import { BaseButton, ButtonType } from "Elements/Base/Button/BaseButton";
import React, { FC } from "react";
import { BaseInput } from "Elements/Base/Input/BaseInput";
import { VALIDA_IMAGE_URL_PATTERN } from "utils/validate/validateImgUrl";
import { useAuth } from "bus/auth/hooks/useAuth";
import { UpdateUserFormData } from "../types";
import { useProfileForm } from "../hooks/useProfileForm";

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
  /* display: flex !important;
  flex-direction: column !important; */
  /* display: contents !important; */
  display: block !important;
  .ant-form-item-label {
    text-align: left;
  }

  label {
    font-weight: bold;
    margin-bottom: 5px;
    width: 100%;
  }
  margin-bottom: 0px !important;
`;

type EditorProps = { toggle: () => void };

export const ProfileForm: FC<EditorProps> = ({ toggle }) => {
  const { data } = useAuth();
  const user = data?.user;

  const { onSubmit, loading } = useProfileForm();

  const [form] = Form.useForm();
  const onFinish = async (values: UpdateUserFormData & { email: string }) => {
    try {
      await onSubmit(values);
      toggle();
    } catch (error) {
      console.log(error);
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
        displayName: user?.displayName,
        email: user?.email,
        photoURL: user?.photoURL,
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
        <BaseInput disabled />
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
                .length > 0 || loading
            )}
          >
            save
          </BaseButton>
        )}
      </FormItem>
    </StyledForm>
  );
};
