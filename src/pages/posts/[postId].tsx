import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { getPost, getPostsSummaries } from "../../services/posts";
import { PostLocalizedSerializable } from "../../types";
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
      <Head>
        <title>Celso's Notes: {post.title}</title>
        <script id={`schema-blog-post-${post.postId}`} type="application/ld+json">
          {JSON.stringify({
            "@id": post.postId,
            "@type": "BlogPost",
            description: post.summary,
            datePublished: post.writtenAt,
            dateModified: post.writtenAt,
            name: post.title,
            inLanguage: post.locale,
          })}
        </script>
      </Head>
      <h1>&gt; {post.title}</h1>
      <div id={styles.dateAndAuthor}>
        Written on&nbsp;
        {new Date(post.writtenAt).toLocaleDateString([post.locale], {
          dateStyle: "long",
        })}
      </div>
      <div id={styles.postContent} ref={refContent}></div>
      <hr />
      <div>Tags: {post.tags.join(", ")}</div>
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
