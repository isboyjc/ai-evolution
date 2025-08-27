import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';

export default function Layout({ children }: LayoutProps<'/book'>) {
  return (
    <DocsLayout tree={source.pageTree} {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
