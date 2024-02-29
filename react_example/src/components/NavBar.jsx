import { NavLink } from 'react-router-dom';

const NavBar = () => {
    
const navlinkArr = [
  'SearchBar',
  'DebouncedSearchBar',
  'ThrottlingSearchBar',
  'FuzzySearchBar',
  'ReactSelectSearchBar',
  'StyledSearchBar',
  'ARIASearchBar',
  'MemoSearchBar',
  'BackEndFilterdSearchBar',
];

  return (
    <nav>

      <ul>
        {navlinkArr.map((navlink, index) => (
            <NavLink key={index} to={`/${navlink}`} activeClassName="active">
          <li >
                {navlink}
          </li>
                </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
