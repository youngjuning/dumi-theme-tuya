import './Navbar.less';

import { context, Link, NavLink } from 'dumi/theme';
import React, { FC, MouseEvent, useContext } from 'react';

import { classnames } from '../utils';
import LocaleSelect from './LocaleSelect';

interface INavbarProps {
  location: any;
  navPrefix?: React.ReactNode;
  onMobileMenuClick: (ev: MouseEvent<HTMLButtonElement>) => void;
  isHome?: boolean;
}

const Navbar: FC<INavbarProps> = ({
  onMobileMenuClick,
  navPrefix,
  location,
  isHome,
}) => {
  const {
    base,
    config: { mode, title, logo },
    nav: navItems,
    meta,
  } = useContext(context);
  const useBg = !!meta.background;

  return (
    <div
      className="__dumi-default-navbar"
      data-mode={mode}
      data-is-home={isHome}
      style={{
        backgroundColor: isHome ? (useBg ? 'transparent' : '#fff') : '#212121',
      }}
    >
      {/* menu toogle button (only for mobile) */}
      <button
        className="__dumi-default-navbar-toggle"
        onClick={onMobileMenuClick}
      />
      {/* logo & title */}
      <div className="logo_wrapper">
        <Link className="__dumi-default-navbar-logo" to={base}>
          <img src={logo as string} alt={title} />
          <span className="label">{title}</span>
        </Link>
        <div className="search_wrapper">{navPrefix}</div>
      </div>
      <span>
        <nav className="navbar_links">
          {/* nav */}
          {navItems.map((nav, index) => {
            const child = Boolean(nav.children?.length) && (
              <ul>
                {nav.children.map((item, i) => (
                  <li key={i}>
                    <NavLink to={item.path!}>{item.title}</NavLink>
                  </li>
                ))}
              </ul>
            );

            return (
              <span
                className={classnames('navbar_links-item', {
                  sub: Boolean(nav.children?.length),
                })}
                key={index}
              >
                {nav.path ? (
                  <NavLink to={nav.path} key={nav.path}>
                    {nav.title}
                  </NavLink>
                ) : (
                  nav.title
                )}
                {child}
              </span>
            );
          })}
        </nav>
        <LocaleSelect location={location} />
      </span>
    </div>
  );
};

export default Navbar;
