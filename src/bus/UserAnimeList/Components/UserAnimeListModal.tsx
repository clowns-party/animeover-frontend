import React, { useState, FC } from "react";

import BaseModal from "Elements/Base/Modal/BaseModal";
import { zIndexLayout } from "utils/constants/zIndexLayout";
import { BaseButton } from "Elements/Base/Button/BaseButton";

import styled from "styled-components";
import RateAnime from "Elements/RateAnime";
import { BaseTextarea } from "Elements/Base/BaseTextarea";
import { useCrudUserAnimeList } from "../hooks/useCrudUserAnimeList";
import { UserAnimeListFormData, UserAnimeListStars } from "../types";

type Props = {
  disabled?: boolean;
};

const Body = styled.div`
  width: 460px;
  border-radius: 24px;
  background: #ffffff;
  padding: 20px 30px 20px 30px;
  h2 {
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 34px;
    line-height: 44px;
    color: #2c2738;
    margin-bottom: 20px;
  }
  h3 {
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #2c2738;
    display: flex;
  }
`;

const Review = styled(BaseTextarea)`
  width: 100%;
  height: 170px;
  margin-top: 5px;
`;

const Submit = styled(BaseButton)`
  margin-top: 20px;
  width: 126px;
`;

export const UserAnimeListModal: FC<Props> = ({ disabled }) => {
  const { isFetching, inList, onChange } = useCrudUserAnimeList(false);
  const [form, setform] = useState<
    Omit<UserAnimeListFormData, "animeId" | "status">
  >({
    review: inList?.review || "",
    star: inList?.star || "0",
  });

  const [visible, setVisible] = useState(false);
  const show = () => {
    setVisible(true);
  };
  const cancel = () => {
    !isFetching && setVisible(false);
  };

  const updateStar = (value: number) => {
    setform((prev) => ({
      ...prev,
      star: value.toString() as UserAnimeListStars,
    }));
  };

  const updateReview = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setform((prev) => ({
      ...prev,
      review: target.value,
    }));
  };

  const submit = () => {
    onChange(inList.status, form);
  };

  return (
    <>
      <BaseButton disabled={disabled} onClick={show}>
        Edit
      </BaseButton>
      <BaseModal
        visible={visible}
        show={show}
        cancel={cancel}
        style={{ zIndex: zIndexLayout.MIDDLE_LEVEL }}
      >
        <Body>
          <h2>Give Feedback</h2>
          <h3>How to rate?</h3>
          <RateAnime
            star={Number(form.star)}
            setStar={updateStar}
            disabled={isFetching}
          />
          <h3>Care to share more about it?</h3>
          <Review
            disabled={isFetching}
            onChange={updateReview}
            value={form.review}
          />

          <Submit disabled={isFetching} onClick={submit}>
            Publish feedback
          </Submit>
        </Body>
      </BaseModal>
    </>
  );
};
