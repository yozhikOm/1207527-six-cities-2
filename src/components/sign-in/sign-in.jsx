import React from 'react';
import PropTypes from 'prop-types';
import {Header} from '../header/header.jsx';

const SignIn = (props) => {
  let emailInput = ``;
  let loginInput = ``;
  const {authenticateUser, history} = props;

  const isEmptyField = (field) => {
    if (field === undefined ||
      field === null) {
      console.warn(`Field is undefined or null`);
      return true;
    }
    if (field.value === null ||
      field.value.trim() === ``) {
      return true;
    }
    return false;
  };

  const redirect = () =>{
    const {history} = props;
    history.push(`/`);
  }
  
  const onSubmitHandler = (evt) => {
    if (evt) {
      evt.preventDefault();
    }
    if (!isEmptyField(emailInput) && !isEmptyField(loginInput)) {
      authenticateUser(emailInput.value, loginInput.value, redirect);
    } else {
      alert(`Вы забыли ввести логин и/или пароль. Пожалуйста, попробуйте еще раз`);
    }
  };
  return (
    <div className="page page--gray page--login">
      <Header isAuthorizationRequired={true} userInfo={null} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={onSubmitHandler}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input ref={(element) => {
                  emailInput = element;
                }} className="login__input form__input" type="email" name="email" placeholder="Email" required="" />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input ref={(element) => {
                  loginInput = element;
                }} className="login__input form__input" type="password" name="password" placeholder="Password" required="" />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

SignIn.propTypes = {
  authenticateUser: PropTypes.func,
};

export {SignIn};
