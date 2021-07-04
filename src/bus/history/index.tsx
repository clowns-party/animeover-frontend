import React from "react";
import styled from "styled-components";

import HistoryStorage from "./helpers/history.storage";

const Container = styled.div`
  min-height: 267px;
  max-height: 267px;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
`;

const HistoryItem = styled.div`
  margin-bottom: 10px;
`;

const HistoryProfile = () => {
  const history = HistoryStorage.get();
  return (
    <>
      <h2>History</h2>
      <Container>
        {history?.length ? (
          history.map((item, index) => {
            return (
              <HistoryItem key={index.toString()}>
                <a href={item.url} target="_blank" rel="noreferrer">
                  {new Date(item.date).toISOString()}
                </a>
              </HistoryItem>
            );
          })
        ) : (
          <h3>You history is empty!</h3>
        )}
      </Container>
    </>
  );
};

export default HistoryProfile;
