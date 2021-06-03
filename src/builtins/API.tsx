import { context } from 'dumi/theme';
import React, { useContext, useEffect, useState } from 'react';

import { CodeContext } from '../context';

const LOCALE_TEXTS = {
  'zh-CN': {
    name: '属性名',
    description: '描述',
    type: '类型',
    default: '默认值',
    required: '(必选)',
  },
  'en-US': {
    name: 'Name',
    description: 'Description',
    type: 'Type',
    default: 'Default',
    required: '(required)',
  },
};

const useLocaleName = () => {
  const { locale } = useContext(context);
  return /^zh|cn$/i.test(locale) ? 'zh-CN' : 'en-US';
};

export default ({ name }) => {
  const localeName = useLocaleName();
  const texts = LOCALE_TEXTS[localeName];
  const [data, setData] = useState(null);

  const { apiData } = useContext(CodeContext);

  useEffect(() => {
    if (apiData && apiData[name]) {
      const renderData = apiData[name].map(item => ({
        name: item.name,
        optional: item.optional,
        types: item.types,
        ...item.meta.i18n[localeName],
      }));
      setData(renderData);
    }
  }, [apiData, localeName]);

  return (
    <>
      {data && data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th className="col-0">{texts.name}</th>
              <th className="col-1">{texts.description}</th>
              <th className="col-2">{texts.type}</th>
              <th className="col-3">{texts.default}</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.name}>
                <td className="col-0">{row.name}</td>
                <td className="col-1">{row.description || '--'}</td>
                <td className="col-2">
                  <div dangerouslySetInnerHTML={{ __html: row.types }}></div>
                </td>
                <td className="col-3">
                  <code>
                    {row.defaultValue ||
                      (!row.optional && texts.required) ||
                      '--'}
                  </code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
