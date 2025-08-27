// import { HomeLayout } from 'fumadocs-ui/layouts/home';
// import { baseOptions } from '@/lib/layout.shared';

import { redirect } from "next/navigation";

// export default function Layout({ children }: LayoutProps<'/'>) {
//   return <HomeLayout {...baseOptions()}>{children}</HomeLayout>;
// }


export default function Home() {
  redirect('/book');
}