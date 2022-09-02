import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useRef } from "react";
import { getPostsSummaries } from "../../services/posts";
import styles from "./[postId].module.scss";

interface BlogPostProps {
  title: string;
  contentHtml: string;
}

const BlogPost = ({ title, contentHtml }: BlogPostProps) => {
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refContent.current) return;

    refContent.current.innerHTML = contentHtml;
  }, []);

  return (
    <div id={styles.container}>
      <h1>{title}</h1>
      <div ref={refContent}></div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const summaries = await getPostsSummaries();

  return {
    paths: summaries.map((summary) => ({
      params: {
        postId: summary.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps, { postId: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: "A Title",
      contentHtml:
        "<p>Eiusmod ad qui elit consequat. Nostrud id incididunt consequat amet. Nostrud consequat ullamco cupidatat quis ad. Commodo ex ea duis in aliquip Lorem Lorem mollit ad sunt tempor minim.</p>" +
        "<p>Lorem ullamco excepteur sit veniam. Irure officia excepteur fugiat cillum ullamco aliquip commodo. Velit nostrud consequat commodo ad id reprehenderit irure. Irure nisi anim fugiat esse nostrud deserunt ipsum minim ex ut Lorem. Sint aliquip excepteur ipsum non non aute ad id deserunt aliquip. Mollit sunt adipisicing veniam officia esse nisi quis pariatur.</p>",
    },
  };
};

export default BlogPost;
