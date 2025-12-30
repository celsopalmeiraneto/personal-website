import { GetStaticProps } from "next";
import { PostIt } from "../components/post-it";
import { Section } from "../components/section";
import { getPostsSummaries } from "../services/posts";
import { PostLocalizedSerializable, SupportedLocales } from "../types";

interface Props {
  posts: Pick<
    PostLocalizedSerializable,
    "slug" | "title" | "tags" | "summary" | "coverMetadata" | "assetsPath"
  >[];
}

const DEFAULT_POSTIT_COVER = {
  alt: "Number in a ",
  src: "/img/numbers.jpg",
};

const Home = ({ posts }: Props) => {
  return (
    <div className="flex flex-col">
      <Section title="" className="flex flex-col text-center gap-4">
        <p className="text-3xl md:text-4xl font-thin">
          Father, Husband, Friend, Software Engineer.
        </p>
        <p className="text-lg md:text-xl">
          I work with a lot of fantastic people to deliver software that helps real people get
          things done throughout the world.
        </p>
      </Section>
      <Section title="Notes" className="flex flex-wrap justify-around gap-5">
        {posts.map((post) => (
          <PostIt
            key={post.slug}
            id={post.slug}
            title={post.title}
            tag={post.tags.slice(0, 5).join(", ")}
            text={post.summary}
            cover={
              post.coverMetadata && post.assetsPath
                ? {
                    alt: post.coverMetadata.alt,
                    src: `posts/${post.assetsPath}/${post.coverMetadata.filename}`,
                  }
                : DEFAULT_POSTIT_COVER
            }
          />
        ))}
      </Section>
      <Section
        title="Pages"
        className="flex justify-around tracking-wider uppercase flex-wrap text-xl md:text-2xl"
        type="nav"
      >
        <a href="/posts">Posts</a>
        <a href="/resumes/en-US">Résumé</a>
        <a href="/uses">Uses</a>
      </Section>
      <Section className="flex justify-around py-3" title="Find me on">
        <a target="_blank" rel="author noopener" href="https://github.com/celsopalmeiraneto">
          <picture>
            <source
              type="image/webp"
              srcSet="img/github-dark.webp"
              media="(prefers-color-scheme: dark)"
            />
            <source type="image/webp" srcSet="img/github.webp" />
            <img
              alt="GitHub's Logo"
              className="h-8"
              fetchPriority="low"
              height="32"
              src="img/github.webp"
            />
          </picture>
        </a>
        <a target="_blank" rel="author noopener" href="https://www.linkedin.com/in/celsopalmeira/">
          <img
            alt="LinkedIn's Logo"
            className="h-8"
            fetchPriority="low"
            height="32"
            src="img/linkedin.webp"
          />
        </a>
        <a
          target="_blank"
          rel="author noopener"
          href="https://www.goodreads.com/user/show/108800771-celso-palmeira"
        >
          <img
            alt="GoodRead's Logo"
            className="h-8 dark:invert"
            fetchPriority="low"
            height="32"
            src="img/goodreads.webp"
          />
        </a>
      </Section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPostsSummaries(SupportedLocales.AmericanEnglish);

  return {
    props: {
      posts: posts
        .map((post) => ({
          slug: post.slug,
          title: post.title,
          tags: post.tags,
          summary: post.summary,
          ...(post.coverMetadata ? { coverMetadata: post.coverMetadata } : {}),
          ...(post.assetsPath ? { assetsPath: post.assetsPath } : {}),
          writtenAt: post.writtenAt.toISOString(),
        }))
        .sort((a, b) => (a.writtenAt > b.writtenAt ? -1 : 1)),
    },
  };
};

export default Home;
