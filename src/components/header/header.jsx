import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => {
  const {isAuthorizationRequired, userInfo} = props;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    {!isAuthorizationRequired ? <img src={`https://es31-server.appspot.com/six-cities` + userInfo.avatarUrl}/> : <React.Fragment />}
                  </div>
                  <span className="header__user-name user__name">{isAuthorizationRequired ? `Sign in` : userInfo.name}</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
  userInfo: PropTypes.shape({
    id: PropTypes.id,
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
};

export {Header};
