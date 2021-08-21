import './SourceCode.less';

import axios from 'axios';
import { context, useCopy } from 'dumi/theme';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/github';
import React, { useContext, useEffect, useRef } from 'react';

export interface ICodeBlockProps {
  code: string;
  lang: Language;
  showCopy?: boolean;
}

let index = 0;
let last = '';
const getIndex = (ref: string) => {
  if (ref === last) {
    index++;
  } else {
    index = 0;
  }
  last = ref;
  return index;
};

const getStartPos = (token: string) => {
  const pref = token.match(/^( +)/);
  if (pref) {
    return pref[1].length;
  }
  return 0;
};

const createLanguageSelector = (index: number,lang: string, type: any) =>
  `span[data-${index}-${lang}-token=${type.targetString}-${type.line}-${type.character}]`;

export default ({ code, lang, showCopy = true }: ICodeBlockProps) => {
  const [copyCode, copyStatus] = useCopy();

  const ctx = useContext(context);
  const _demo = ctx.meta.demo;
  const index = getIndex(_demo);

  useEffect(() => {
    const typeAssetsUrl = ctx?.config?.theme?.typeAssetsUrl;
    if (typeAssetsUrl && _demo) {
      axios.get(typeAssetsUrl).then(res => {
        const props = res?.data;
        const types = props?.[_demo]?.[index];
        if (Array.isArray(types)) {
          types.forEach((type, i) => {
            const dom =
              document.querySelector(createLanguageSelector(index, 'jsx', type)) ??
              document.querySelector(createLanguageSelector(index, 'tsx', type)) ??
              document.querySelector(createLanguageSelector(index, 'ts', type)) ??
              document.querySelector(createLanguageSelector(index, 'js', type));
            if (dom) {
              dom.setAttribute(
                'data-lsp',
                `${type.text ?? ''}\n${type.docs ?? ''}`,
              );
            }
          });
        }
      });
    }
  }, [index, _demo]);

  const ref = useRef(0);
  const lastLine = useRef(0);

  return (
    <div className="__dumi-default-code-block">
      <Highlight {...defaultProps} code={code} language={lang} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {showCopy && (
              <button
                className="__dumi-default-icon __dumi-default-code-block-copy-btn"
                data-status={copyStatus}
                onClick={() => copyCode(code)}
              />
            )}
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => {
                  if (i !== lastLine.current) {
                    ref.current = 0;
                  }
                  lastLine.current = i;

                  const last = ref.current;
                  ref.current += token.content.length;
                  const props = getTokenProps({ token, key });
                  if (/ /.test(token.content)) {
                    return <span {...props} />;
                  }
                  return React.createElement('span', {
                    ...props,
                    [`data-${index}-${lang}-token`]: `${token.content.trim()}-${i}-${last +
                      getStartPos(token.content)}`,
                  });
                })}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
};
