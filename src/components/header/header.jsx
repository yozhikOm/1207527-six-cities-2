import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = (props) => {
  const {isAuthorizationRequired, userInfo} = props;
  let route = `/login`;
  let linkTitle = `Sign in`;
  let userAvatarWrapper = <React.Fragment />;

  if (!isAuthorizationRequired) {
    route = `/favorites`;
    linkTitle = userInfo.name;
    userAvatarWrapper = <img src={`https://es31-server.appspot.com/six-cities` + userInfo.avatarUrl}/>;
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={`/`} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={route} className="header__nav-link header__nav-link--profile">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                    {userAvatarWrapper}
                  </div>
                  <span className="header__user-name user__name">{linkTitle}</span>
                </Link>
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
