import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 6.4rem;
  text-align: center;
  color: ${({ theme }) => theme.primary};
  width: 100%;
  margin-bottom: ${({ marginBottom }) => marginBottom};

  @media (max-width: 767px) {
    margin-bottom: 87px;
  }
`;

export default Heading;
