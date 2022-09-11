import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useRef } from "react";
import { getPost, getPostsSummaries } from "../../services/posts";
import { PostLocalized, PostLocalizedSerializable } from "../../types";
import styles from "./[postId].module.scss";

interface BlogPostProps {
  post: PostLocalizedSerializable;
  htmlContent: string;
}

const BlogPost = ({ post, htmlContent }: BlogPostProps) => {
  const refContent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!refContent.current) return;

    refContent.current.innerHTML = htmlContent;
  }, []);

  return (
    <div id={styles.container}>
      <h1>{post.title}</h1>
      <div id={styles.postContent} ref={refContent}></div>
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
    props: post,
  };
};

export default BlogPost;
