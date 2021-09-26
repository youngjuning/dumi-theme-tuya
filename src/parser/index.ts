export type TransformFunc = (code: string) => string;

const anchorScanner = /\[[\s\S]*?\]\([\s\S]*?\)/g;
const codeScanner = /(\`[\s\S]*?\`)|\*\*[\s\S]*?\*\*/g;
const badgeScanner = /<Badge>[\s\S].*?<\/Badge>/g;

const transformAnchor: TransformFunc = code => {
  if (code) {
    const inner = code.slice(1, code.length - 1);
    const split = '](';
    const splitIdx = inner.indexOf(split);
    const label = inner.slice(0, splitIdx);
    let href = inner.slice(splitIdx + split.length);
    if (href.startsWith('#')) {
      href = href.toLocaleLowerCase().replace(/\./, '');
    }
    return `<a href="${href}">${label}</a>`;
  }
};

const parseAnchor: TransformFunc = code =>
  code.replace(anchorScanner, transformAnchor);

const transformCode: TransformFunc = code => {
  if (code) {
    code = code.replace(/\`|\*/g, '');
    return `<code>${code}</code>`;
  }
};

const parseCode: TransformFunc = code =>
  code.replace(codeScanner, transformCode);

const transformBadge: TransformFunc = code => {
  if (code) {
    const text = code.replace(/^<Badge>|<\/Badge>$/, '');
    return `<span class="__dumi-default-badge">${text}</span>`;
  }
};

const parseBadge: TransformFunc = code =>
  code.replace(badgeScanner, transformBadge);

export const parseLinkTitle = (title: string) => {
  if (title.includes('::http')) {
    const [text, link] = title.split('::')
    return {
      text, link
    }
  }
  return {
    text: title,
    link: null
  }
}

const parseHref: TransformFunc = code =>
  code.includes(':http') ? parseLinkTitle(code).text : code

export const compose = <T>(...fns: Array<(value: T) => T>) =>
  (value: T) => fns.reduce((a, b) => b(a), value);

export const transform = compose(parseAnchor, parseBadge, parseCode, parseHref);

export { codeScanner, anchorScanner, badgeScanner, parseHref };
