import { context, Link } from 'dumi/theme';
import React, { ReactNode, useContext } from 'react';

import { getArray, join } from '../utils';

interface HomeMeta {
  image: string;
  title: string;
  desc: string;
  actions: Array<{
    link: string;
    text: string;
  }>;
  footer?: string;
  background?: string;
}

export const Home = ({ content }: { content?: ReactNode }) => {
  const { meta, base } = useContext(context);
  const { image, title, desc, actions, footer, background } = meta as HomeMeta;
  return (
    <div className={'__dumi-default-layout-home'}>
      <div
        className={'__dumi-default-layout-hero'}
        style={{
          backgroundColor: background ? 'transparent' : '#f5f6f8',
        }}
      >
        <img src={image} />
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: desc }} />
        {getArray(actions).map(action => (
          <Link to={join(base, action.link)} key={action.text}>
            <button type="button">{action.text}</button>
          </Link>
        ))}
      </div>
      <div
        style={{
          marginTop: 96,
        }}
      >
        {content}
      </div>
      {footer && (
        <div
          className="__dumi-default-layout-footer"
          dangerouslySetInnerHTML={{ __html: footer }}
        />
      )}
    </div>
  );
};
