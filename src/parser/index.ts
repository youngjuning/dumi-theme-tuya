export type TransformType = 'anchor' | 'code';
export type TransformFunc = (value: string) => string;

export type Transformer = Partial<Record<TransformType, TransformFunc>>;

export const defaultTransformer: Transformer = {
  anchor: value => {
    const inner = value.slice(1, value.length - 1);
    const split = '](';
    const splitIdx = inner.indexOf(split);
    const label = inner.slice(0, splitIdx);
    let href = inner.slice(splitIdx + split.length);
    if (href.startsWith('#')) {
      href = href.toLocaleLowerCase().replace(/\./, '');
    }
    return `<a href="${href}">${label}</a>`;
  },
  code: value => {
    value = value.replace(/\`|\*/g, '');
    return `<code>${value}</code>`;
  },
};

export const transform = (
  markdown: string,
  transformer: Transformer = defaultTransformer,
) => {
  const anchor = transformer?.anchor;
  if (anchor) {
    markdown = markdown.replace(
      /\[[\s\S]*?\]\([\s\S]*?\)/g,
      value => value && anchor(value),
    );
  }
  const code = transformer?.code;
  if (code) {
    markdown = markdown.replace(
      /(\`[\s\S]*?\`)|\*\*[\s\S]*?\*\*/g,
      value => value && code(value),
    );
  }
  return markdown;
};
