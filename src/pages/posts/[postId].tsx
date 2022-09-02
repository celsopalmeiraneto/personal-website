import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useRef } from "react";
import { getPost, getPostsSummaries } from "../../services/posts";
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

  const post = await getPost(params.postId);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      title: post.post.title,
      contentHtml: post.htmlContent,
    },
  };
};

export default BlogPost;
