import { ImageZoom } from './components/mdx/image-zoom';
import './components/mdx/table-caption.css';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  console.log(12, components);
  return {
    ...defaultMdxComponents,
    img: (props) => {
      return <ImageZoom {...props} />
    },
    ...components,
  };
}
