import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const isSignUpPage = location.pathname === '/sign-up';

  return (
    <header className="header">
      <div className="header__logo"></div>
      <Link
        to={isSignUpPage ? '/sign-in' : '/sign-up'}
        className="header__link"
      >
        {isSignUpPage ? 'Войти' : 'Регистрация'}
      </Link>
    </header>
  );
}

export default Header;

// function handelPage() {
//   if (to === '/sign-up') {
//     return '/sign-in';
//   }
//   if (to === '/sign-in') {
//     return '/sign-up';
//   }
// }
