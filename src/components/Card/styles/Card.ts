import styled from 'styled-components/macro';

interface CardWrapperStyleProps {
  invert: boolean;
  isActive: boolean;
  isCurrentCard: boolean;
}

export const CardWrapper = styled.div<CardWrapperStyleProps>`
  border: 2px solid
    ${({ isCurrentCard }): string => (isCurrentCard ? '#D32F2F' : '#fff')};
  width: 20rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #cacba2;
  ${({ invert }): string => (invert ? `transform: rotate(180deg)` : '')};
  ${({ isActive }): string => (isActive ? `&:hover { cursor: pointer; }` : '')};
`;

export const Main = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LeftHalf = styled.div`
  margin: 0;
  padding: 0;
  height: 9rem;
  width: 9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
export const RightHalf = styled.div``;

export const Character = styled.div`
  text-align: center;
  height: 6rem;
  & > img {
    width: 8rem;
    height: auto;
  }
`;

export const Name = styled.div`
  font-family: 'Arvo', Georgia, 'Times New Roman', Times, serif;
  font-size: 1.2rem;
  font-weight: 700;
  text-transform: uppercase;
  align-self: center;
  padding-top: 1.4rem;
  border-bottom: 1px dotted #333;
`;
