import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { getPost, getPostsSummaries } from "../../services/posts";
import { PostLocalizedSerializable } from "../../types";
import styles from "./[postId].module.scss";

interface BlogPostProps {
  post: PostLocalizedSerializable;
  htmlContent: string;
}

const BlogPost = ({ post, htmlContent }: BlogPostProps) => {
  return (
    <div className="container mx-auto flex flex-col gap-5 text-xl">
      <Head>
        <title>{`Celso's Notes - ${post.title}`}</title>
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
        <meta property="og:url" content={`https://celsoneto.com.br/posts/${post.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
      </Head>
      <h1 className="text-center text-4xl font-thin my-2">&gt; {post.title}</h1>
      <div className="text-base">
        {`Written on ${new Date(post.writtenAt).toLocaleDateString([post.locale], {
          dateStyle: "long",
        })}`}
      </div>
      <div id={styles.postContent} dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
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
