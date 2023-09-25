import { useState } from 'react';

export function useCopyToClipboard(): [
  string,
  (text: string) => Promise<boolean>,
] {
  const [copiedText, setCopiedText] = useState('');
  async function copy(text: string) {
    if (!navigator?.clipboard) {
      return false;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      setCopiedText('');
      return false;
    }
  }
  return [copiedText, copy];
}
