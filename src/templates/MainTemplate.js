import PropTypes from 'prop-types';
import GlobalStyle from 'theme/GlobalStyle';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from 'theme/mainTheme';
import Logo from 'components/atoms/Logo/Logo';
import Button from 'components/atoms/Button/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 44px;
`;

const handleLogout = () => {
  window.location.reload(false);
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('jwt');
};

const StyledButton = styled(Button)`
  min-width: inherit;
  margin-left: 40px;
  & .arrow {
    transition: transform 0.3s;
  }
  &:hover .arrow {
    transform: translateX(-5px);
  }
`;

const MainTemplate = ({ children, user }) => (
  <div>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <Header>
        <Link to="/">
          <Logo />
        </Link>
        {user ? (
          <StyledButton as={Link} to="/login" onClick={() => handleLogout()}>
            <svg
              width="85"
              height="85"
              viewBox="0 0 85 85"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M53.1244 46.0425C51.166 46.0425 49.583 47.6293 49.583 49.5839V63.7508C49.583 65.7021 47.9962 67.2922 46.041 67.2922H35.4161V14.1678C35.4161 11.1432 33.4894 8.44097 30.5926 7.43516L29.544 7.08432H46.041C47.9962 7.08432 49.583 8.67442 49.583 10.6264V21.2513C49.583 23.2058 51.166 24.7927 53.1244 24.7927C55.0829 24.7927 56.6659 23.2058 56.6659 21.2513V10.6264C56.6659 4.76856 51.8988 0.00149536 46.041 0.00149536H7.96867C7.83378 0.00149536 7.72094 0.0618052 7.58995 0.0793143C7.41939 0.0650476 7.25662 0.00149536 7.08348 0.00149536C3.17696 0.00149536 0 3.17781 0 7.08432V70.8337C0 73.8582 1.92667 76.5605 4.82348 77.5663L26.1375 84.6712C26.8599 84.8943 27.5784 85.0006 28.3333 85.0006C32.2398 85.0006 35.4161 81.8236 35.4161 77.9171V74.3757H46.041C51.8988 74.3757 56.6659 69.6087 56.6659 63.7508V49.5839C56.6659 47.6293 55.0829 46.0425 53.1244 46.0425Z"
                  fill="#FF9900"
                />
                <path
                  className="arrow"
                  d="M83.9616 32.9134L69.7946 18.7471C68.7823 17.7341 67.259 17.4293 65.9348 17.978C64.6138 18.5272 63.7494 19.8197 63.7494 21.2509V31.8758H49.5831C47.6279 31.8758 46.041 33.462 46.041 35.4172C46.041 37.3724 47.6279 38.9586 49.5831 38.9586H63.7494V49.5835C63.7494 51.0147 64.6138 52.3072 65.9348 52.8564C67.259 53.4051 68.7823 53.1003 69.7946 52.088L83.9616 37.921C85.3461 36.5365 85.3461 34.2979 83.9616 32.9134Z"
                  fill="#FF9900"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="85" height="85" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </StyledButton>
        ) : null}
      </Header>
      {children}
    </ThemeProvider>
  </div>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = ({ user, todoList }) => ({ user, todoList });

export default connect(mapStateToProps, null)(MainTemplate);
