import { GetStaticProps } from "next";
import { getPostsSummaries } from "../../services/posts";
import { PostLocalizedSerializable, SupportedLocales } from "../../types";
import styles from "./index.module.scss";

interface Props {
  posts: PostLocalizedSerializable[];
}

const Posts = ({ posts }: Props) => {
  return (
    <div>
      {posts.map((post) => (
        <article key={post.slug} className={styles.post}>
          <h4>
            <a href={`/posts/${post.slug}`}>{post.title}</a>
          </h4>
          <p>{post.summary}</p>
        </article>
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPostsSummaries(SupportedLocales.AmericanEnglish);

  return {
    props: {
      posts: posts
        .sort((a, b) => b.writtenAt.getTime() - a.writtenAt.getTime())
        .map((post) => ({
          ...post,
          writtenAt: post.writtenAt.toISOString(),
        })),
    },
  };
};

export default Posts;
