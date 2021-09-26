import styled from 'styled-components';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const SortDropdownStyled = styled.div`
  border: 0;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  font-size: 24px;
  font-weight: 300;
  color: ${({ theme }) => theme.textGray};
  width: 100%;
  display: flex;
  flex-direction: column;
  display: ${({ show }) => (show ? 'block' : 'none')};
  position: absolute;
  z-index: 1;
`;

const SortSelectWrapepr = styled.div`
  margin-bottom: 36px;
  max-width: 265px;
  position: relative;
  width: 100%;
`;

const ButtonShowDropdown = styled.button`
  min-height: 50px;
  border: 0;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
  font-size: 24px;
  font-weight: 300;
  line-height: 28px;
  color: #000;
  padding: 10px 18px;
  width: 100%;
  position: relative;
  z-index: 2;
  cursor: pointer;
`;

const ButtonDropdown = styled.button`
  display: block;
  min-height: 50px;
  border: 0;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  font-size: 24px;
  font-weight: 300;
  line-height: 28px;
  color: ${({ theme }) => theme.textGray};
  padding: 10px 18px;
  width: 100%;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.primary};
    color: #ffffff;
  }
`;

const SortSelect = ({ options }) => {
  const [sortValue, changeSort] = useState('Sort by');
  const [dropdownExpanded, setDropdownExpanded] = useState(false);

  const handleDropdown = () => {
    setDropdownExpanded(!dropdownExpanded);
  };

  const handleSort = (e) => {
    setDropdownExpanded(false);
    changeSort(e.target.attributes.value.textContent);
  };

  const optionElement = options.map((option) => (
    <ButtonDropdown key={option} type="button" value={option} onClick={(e) => handleSort(e)}>
      {option}
    </ButtonDropdown>
  ));

  return (
    <SortSelectWrapepr>
      <ButtonShowDropdown type="button" onClick={() => handleDropdown()}>
        {sortValue}
      </ButtonShowDropdown>
      <SortDropdownStyled show={dropdownExpanded}>{optionElement}</SortDropdownStyled>
    </SortSelectWrapepr>
  );
};

SortSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SortSelect;
