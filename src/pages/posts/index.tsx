import { GetStaticProps } from "next";
import { getPostsSummaries } from "../../services/posts";
import { PostLocalizedSerializable, SupportedLocales } from "../../types";

interface Props {
  posts: PostLocalizedSerializable[];
}

const Posts = ({ posts }: Props) => {
  return (
    <div>
      {posts.map((post) => (
        <article key={post.slug} className="mb-4">
          <h2 className="text-2xl font-thin">
            <a className="visited underline" href={`/posts/${post.slug}`}>
              {post.title}
            </a>
          </h2>
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
