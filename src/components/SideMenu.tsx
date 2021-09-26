import './SideMenu.less';

import { Menu } from 'antd';
import { AnchorLink, context, Link, NavLink } from 'dumi/theme';
import React, { FC, useContext, useMemo } from 'react';

import { useDerivedStateFromProps } from '../hooks/useDerivedStateFromProps';
import { badgeScanner, parseHref, parseLinkTitle } from '../parser';
import { getArray } from '../utils';
import LocaleSelect from './LocaleSelect';

interface INavbarProps {
  mobileMenuCollapsed: boolean;
  location: any;
}

const getDisplayTitle = (title: string) => {
  let text = title ? title.replace(badgeScanner, '') : title;
  text = parseHref(text);
  return text;
};

const getSlugItemKey = (slug: { value: string }) =>
  typeof slug?.value === 'string' && slug.value.trim().toLowerCase();
// toc 子列表不显示父节点（depth=1为父节点）
const getSlugsList = (meta: any) =>
  getArray<any>(meta?.slugs).filter(s => s.depth !== 1);

const SideMenu: FC<INavbarProps> = ({ mobileMenuCollapsed, location }) => {
  const {
    config: {
      logo,
      title,
      description,
      mode,
      repository: { url: repoUrl },
    },
    nav: navItems,
    base,
    meta,
    menu,
  } = useContext(context);
  const isHiddenMenus =
    Boolean((meta.hero || meta.features || meta.gapless) && mode === 'site') ||
    meta.sidemenu === false ||
    undefined;

  const defaultOpenKeys = useMemo(
    () =>
      menu.reduce(
        (acc, item) => (item.children ? acc.concat(item.title) : acc),
        [],
      ),
    [menu],
  );

  const [openKeys, setOpenKeys] = useDerivedStateFromProps(defaultOpenKeys);

  const isTocMenu = meta.toc === 'menu';
  return (
    <div
      className="__dumi-default-menu"
      data-mode={mode}
      data-hidden={isHiddenMenus}
      data-mobile-show={!mobileMenuCollapsed || undefined}
    >
      <div className="__dumi-default-menu-inner">
        <div className="__dumi-default-menu-header">
          <Link
            to={base}
            className="__dumi-default-menu-logo"
            style={{
              backgroundImage: logo && `url('${logo}')`,
            }}
          />
          <h1>{title}</h1>
          <p>{description}</p>
          {/* github star badge */}
          {/github\.com/.test(repoUrl) && mode === 'doc' && (
            <p>
              <object
                type="image/svg+xml"
                data={`https://img.shields.io/github/stars${repoUrl.match(/((\/[^\/]+){2})$/)[1]
                  }?style=social`}
              />
            </p>
          )}
        </div>
        {/* mobile nav list */}
        {navItems.length ? (
          <div className="__dumi-default-menu-mobile-area">
            <ul className="__dumi-default-menu-nav-list">
              {navItems.map(nav => {
                const child = Boolean(nav.children?.length) && (
                  <ul>
                    {nav.children.map(item => (
                      <li key={item.path || item.title}>
                        <NavLink to={item.path}>{item.title}</NavLink>
                      </li>
                    ))}
                  </ul>
                );

                return (
                  <li key={nav.path || nav.title}>
                    {nav.path ? (
                      <NavLink to={nav.path}>{nav.title}</NavLink>
                    ) : (
                      nav.title
                    )}
                    {child}
                  </li>
                );
              })}
            </ul>
            {/* site mode locale select */}
            <LocaleSelect location={location} />
          </div>
        ) : (
          <div className="__dumi-default-menu-doc-locale">
            {/* doc mode locale select */}
            <LocaleSelect location={location} />
          </div>
        )}
        {/* menu list */}
        <ul className="__dumi-default-menu-list">
          {!isHiddenMenus && (
            <Menu
              openKeys={openKeys}
              selectedKeys={isTocMenu ? [location?.hash] : [meta.title]}
              onOpenChange={setOpenKeys}
              mode="inline"
            >
              {menu.map(item => {
                // always use meta from routes to reduce menu data size
                const hasSlugs = Boolean(meta?.slugs?.length);
                const hasChildren =
                  item.children && Boolean(item.children.length);
                const show1LevelSlugs =
                  meta.toc === 'menu' &&
                  !hasChildren &&
                  hasSlugs &&
                  item.path === location.pathname.replace(/([^^])\/$/, '$1');

                if (Boolean(item.children && item.children.length)) {
                  return (
                    <Menu.SubMenu
                      key={item.title}
                      title={getDisplayTitle(item.title)}
                    >
                      {item.children.map(child => {
                        const isGroup = Boolean(
                          meta.toc === 'menu' &&
                          typeof window !== 'undefined' &&
                          child.path === location.pathname &&
                          hasSlugs,
                        );
                        if (isGroup) {
                          return (
                            <Menu.ItemGroup
                              title={getDisplayTitle(child.title)}
                              key={child.title}
                            >
                              {getSlugsList(meta).map(slug => (
                                <Menu.Item key={`#${getSlugItemKey(slug)}`}>
                                  <AnchorLink to={`#${slug.heading}`}>
                                    <span>{slug.value}</span>
                                  </AnchorLink>
                                </Menu.Item>
                              ))}
                            </Menu.ItemGroup>
                          );
                        }
                        const { link } = parseLinkTitle(child.title);
                        return (
                          <Menu.Item key={child.title} onClick={() => {
                            if (link) {
                              window.location.href = link
                            }
                          }}>
                            {link ? (
                              <a>{getDisplayTitle(child.title)}</a>
                            ) : (
                              <NavLink to={child.path} exact>
                                <span>{getDisplayTitle(child.title)}</span>
                              </NavLink>
                            )}
                          </Menu.Item>
                        );
                      })}
                    </Menu.SubMenu>
                  );
                }

                if (show1LevelSlugs) {
                  return (
                    <Menu.ItemGroup title={getDisplayTitle(item.title)}>
                      {getSlugsList(meta).map(slug => (
                        <Menu.Item key={`#${getSlugItemKey(slug)}`}>
                          <AnchorLink to={`#${slug.heading}`}>
                            <span>{slug.value}</span>
                          </AnchorLink>
                        </Menu.Item>
                      ))}
                    </Menu.ItemGroup>
                  );
                }

                const { link } = parseLinkTitle(item.title);
                return (
                  <Menu.Item key={item.title}>
                    {link ? (
                      getDisplayTitle(item.title)
                    ) : (
                      <NavLink
                        to={item.path}
                        exact={!(item.children && item.children.length)}
                      >
                        {getDisplayTitle(item.title)}
                      </NavLink>
                    )}
                  </Menu.Item>
                );
              })}
            </Menu>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;
