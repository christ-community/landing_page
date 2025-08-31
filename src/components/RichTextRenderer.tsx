import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

interface RichTextRendererProps {
  content: any;
  className?: string;
}

const RichTextRenderer = ({ content, className }: RichTextRendererProps) => {
  if (!content) return null;

  // Let prose classes handle the styling - just render the structure
  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => <strong>{text}</strong>,
      [MARKS.ITALIC]: (text: any) => <em>{text}</em>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node: any, children: any) => <p>{children}</p>,
      [BLOCKS.HEADING_1]: (node: any, children: any) => <h1>{children}</h1>,
      [BLOCKS.HEADING_2]: (node: any, children: any) => <h2>{children}</h2>,
      [BLOCKS.HEADING_3]: (node: any, children: any) => <h3>{children}</h3>,
      [BLOCKS.UL_LIST]: (node: any, children: any) => <ul>{children}</ul>,
      [BLOCKS.OL_LIST]: (node: any, children: any) => <ol>{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li>{children}</li>,
      [BLOCKS.QUOTE]: (node: any, children: any) => <blockquote>{children}</blockquote>,
      [BLOCKS.HR]: () => <hr />,
    },
  };

  return (
    <div className={className}>
      {documentToReactComponents(content, options)}
    </div>
  );
};

export default RichTextRenderer;