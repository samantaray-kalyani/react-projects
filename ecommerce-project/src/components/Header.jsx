import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';  
import CartIcon from '../assets/images/icons/cart-icon.png';
import SearchIcon from '../assets/images/icons/search-icon.png';
import LogoWhite from '../assets/images/icons/logo-white.png';
import MobileLogoWhite from '../assets/images/icons/mobile-logo-white.png';

import './header.css';

export default function Header({ cart }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchText = searchParams.get('search');

  const [search, setSearch] = useState(searchText || '');

  const updateSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const searchProducts = () => {
    navigate(`/?search=${search}`);
  };

 let totalQuantity = 0;

 cart.forEach((cartItem) => {
  totalQuantity += cartItem.quantity;
 });

  return (
    <div className="header">
      <div className="left-section">
        <Link to="/" className="header-link">
          <img className="logo"
          data-testid="header-logo"
            src={LogoWhite} />
          <img className="mobile-logo"
          data-testid="header-mobile-logo"
            src={MobileLogoWhite} />
        </Link>
      </div>

      <div className="middle-section">
        <input className="search-bar" type="text" placeholder="Search" 
        data-testid="header-search-bar"
        value={search} onChange={updateSearchInput} />

        <button className="search-button"
        data-testid="header-search-button"
        onClick={searchProducts}>
          <img className="search-icon" src={SearchIcon} />
        </button>
      </div>

      <div className="right-section">
        <Link className="orders-link header-link" to="/orders"
          data-testid="header-orders-link">

          <span className="orders-text">Orders</span>
        </Link>

        <Link className="cart-link header-link" to="/checkout"
          data-testid="header-cart-link">
          <img className="cart-icon" src={CartIcon} />
          <div className="cart-quantity">{totalQuantity}</div>
          <div className="cart-text">Cart</div>
        </Link>
      </div>
    </div>
  );
}