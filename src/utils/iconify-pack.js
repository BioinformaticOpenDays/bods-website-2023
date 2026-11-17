export function createPack(data) {
  // Called as get(name) or get(pack, name) depending on version; name is always last.
  return async (...args) => {
    const name = args[0];
    let icon = data.icons[name];
    if (!icon && data.aliases?.[name]) {
      const alias = data.aliases[name];
      icon = { ...data.icons[alias.parent], ...alias };
    }
    if (!icon) {
      throw new Error(`[iconify-pack] "${name}" not found in "${data.prefix}"`);
    }
    const w = icon.width ?? data.width ?? 16;
    const h = icon.height ?? data.height ?? 16;
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}">${icon.body}</svg>`;
  };
}
