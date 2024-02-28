import styled from "styled-components";

import { config } from "../config";
import { CustomizationSectionProps } from "./type";

const Title = styled.p`
  font-size: 16px;
  margin-top: 20px;
`;

const ShapeImg = styled.img`
  height: 40px;
  width: 40px;
  object-fit: contain;
`;

const StyledShape = styled.div<{ $active: boolean }>`
  cursor: pointer;
  border: 4px solid ${({ $active }) => ($active ? "#007C02" : "transparent")};
  border-radius: 4px;
  padding: 4px;
  background-color: white;
  transition: all 0.3s ease-in-out;
`;

const ShapeWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Shape = ({ setQrConfig, qrConfig }: CustomizationSectionProps) => {
  return (
    <>
      <ShapeWrapper>
        {config.body.map((item) => (
          <StyledShape
            key={item[0]}
            $active={item[0] === qrConfig.bodyShape}
            onClick={() =>
              setQrConfig((prev) => ({
                ...prev,
                bodyShape: item[0],
              }))
            }
          >
            <ShapeImg src={item[1]} />
          </StyledShape>
        ))}
      </ShapeWrapper>
      <Title>Eyeball Shape</Title>
      <ShapeWrapper>
        {config.eyeball.map((item) => (
          <StyledShape
            key={item[0]}
            $active={item[0] === qrConfig.eyeballShape}
            onClick={() =>
              setQrConfig((prev) => ({
                ...prev,
                eyeballShape: item[0],
              }))
            }
          >
            <ShapeImg src={item[1]} />
          </StyledShape>
        ))}
      </ShapeWrapper>
      <Title>Eye Frame Shape</Title>
      <ShapeWrapper>
        {config.eyeFrame.map((item) => (
          <StyledShape
            key={item[0]}
            $active={item[0] === qrConfig.eyeFrameShape}
            onClick={() =>
              setQrConfig((prev) => ({
                ...prev,
                eyeFrameShape: item[0],
              }))
            }
          >
            <ShapeImg src={item[1]} />
          </StyledShape>
        ))}
      </ShapeWrapper>
    </>
  );
};