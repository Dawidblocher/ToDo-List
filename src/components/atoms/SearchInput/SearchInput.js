import styled from 'styled-components';

const SearchInput = styled.input`
  min-height: 50px;
  border: 0;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 24px;
  font-weight: 300;
  line-height: 28px;
  color: ${({ theme }) => theme.textGray};
  padding: 10px 18px;
  width: ${({ width }) => width};
  margin-bottom: 36px;
`;

export default SearchInput;
