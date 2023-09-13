import { useMDXComponent } from 'next-contentlayer/hooks';

const components = {
  h1: (props: any) => <h3 {...props} />,
  h2: (props: any) => <h4 {...props} />,
};

export const Mdx = ({ code, tweets }: any) => {
  const Component = useMDXComponent(code);
  return (
    <article className="prose prose-zinc prose-li:my-1 max-w-none">
      <Component components={{ ...components }} />
    </article>
  );
};
export default Mdx;
