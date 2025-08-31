// Utility to extract plain text from Contentful rich text for reading time calculation
export const extractTextFromRichText = (richTextDocument: any): string => {
  if (!richTextDocument || !richTextDocument.content) return '';
  
  const extractFromNode = (node: any): string => {
    if (node.nodeType === 'text') return node.value || '';
    if (node.content && Array.isArray(node.content)) {
      return node.content.map(extractFromNode).join(' ');
    }
    return '';
  };
  
  return richTextDocument.content.map(extractFromNode).join(' ');
};