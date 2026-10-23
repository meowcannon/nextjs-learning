export default function Layout({ children }: LayoutProps<"/dashboard">) {
  return <div className="container mx-auto max-w-5xl mt-8">{children}</div>;
}
