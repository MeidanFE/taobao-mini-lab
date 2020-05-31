export const render = (template, data) => {
  const valuePattern = /\{\{(\w+)\}\}/;
  for (
    let matchItem = template.match(valuePattern);
    matchItem != null;
    matchItem = template.match(valuePattern)
  ) {
    const [_, key] = matchItem;
    template = template.replace(valuePattern, data[key]);
  }
  return template;
};
