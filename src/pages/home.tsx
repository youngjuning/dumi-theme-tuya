import { context, Link } from 'dumi/theme';
import React, { ReactNode, useContext } from 'react';
import { FlushButton } from '../components/flush-button';

import { getArray, join } from '../utils';

interface HomeMeta {
  image: string;
  title: string;
  desc: string;
  actions: Array<{
    link: string;
    text: string;
    hot?: boolean;
  }>;
  footer?: string;
  background?: string;
}

export const Home = ({ content }: { content?: ReactNode }) => {
  const { meta, base } = useContext(context);
  const { image, title, desc, actions, footer } = (meta?.hero ??
    {}) as HomeMeta;
  return (
    <div className={'__dumi-default-layout-home'}>
      <div className={'__dumi-default-layout-hero'}>
        {image ? <img src={image} /> : null}
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: desc }} />
        {getArray(actions).map(action =>
          action.hot ? (
            <FlushButton text={action.text} link={action.link} />
          ) : (
            <Link to={join(base, action.link)} key={action.text}>
              <button type="button">{action.text}</button>
            </Link>
          ),
        )}
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
