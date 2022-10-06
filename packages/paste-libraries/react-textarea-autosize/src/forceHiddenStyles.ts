const HIDDEN_TEXTAREA_STYLE = {
  'min-height': '0',
  'max-height': 'none',
  height: '0',
  visibility: 'hidden',
  overflow: 'hidden',
  position: 'absolute',
  'z-index': '-1000',
  top: '0',
  right: '0',
};

export const forceHiddenStyles = (node: HTMLElement): void => {
  for (const key of Object.keys(HIDDEN_TEXTAREA_STYLE)) {
    node.style.setProperty(key, HIDDEN_TEXTAREA_STYLE[key as keyof typeof HIDDEN_TEXTAREA_STYLE], 'important');
  }
};
