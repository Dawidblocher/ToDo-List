import styled, { css } from 'styled-components';

const smallProps = css`
  min-width: 12.8rem;
  min-height: 4.4rem;
  font-size: 2.4rem;
  font-weight: 500;
  color: #fff;
  background: ${({ red, theme }) => (red ? theme.red : theme.primary)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const normalProps = css`
  min-width: 23.9rem;
  min-height: 7.8rem;
  font-weight: ${({ primary }) => (primary ? 500 : 300)};
  font-size: ${({ primary }) => (primary ? '36px' : '48px')};
  color: ${({ primary, theme }) => (primary ? '#ffffff' : theme.primary)};
  text-decoration: none;
  &:hover {
    background: ${({ primary }) => (primary ? '#e08600' : 'transparent')};
    text-decoration: ${({ primary }) => (primary ? 'none' : 'underline')};
  }
`;

const Button = styled.button`
  background: ${({ primary, theme }) => (primary ? theme.primary : 'transparent')};
  box-shadow: ${({ primary }) => (primary ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : 'none')};
  border-radius: 0.8rem;
  border: 0;
  cursor: pointer;
  font-style: normal;
  line-height: 42px;
  text-align: center;
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  ${({ small }) => (small ? smallProps : normalProps)};
`;

export default Button;
