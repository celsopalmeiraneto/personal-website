import { GetStaticProps } from "next";
import { PostIt } from "../components/post-it";
import { Section } from "../components/section";
import { getPostsSummaries } from "../services/posts";
import { Post, PostWithLocale, SupportedLocales } from "../types";
import styles from "./index.module.scss";

interface Props {
  posts: PostWithLocale[];
}

const Home = ({ posts }: Props) => {
  return (
    <div>
      <Section title="" className={styles.bioContainer}>
        <p>Father, Husband, Friend, Software Engineer.</p>
        <p>
          I work with a lot of fantastic people to deliver software that helps
          real people get things done throughout the world.
        </p>
      </Section>
      <Section title="Notes" className={styles.notesContainer}>
        {posts.map((post) => (
          <PostIt
            key={post.id}
            id={post.localizedInfo.slug}
            title={post.localizedInfo.title}
            tag={post.tags[0] ?? ""}
            text={post.localizedInfo.summary}
          />
        ))}
      </Section>
      <Section className={styles.socialContainer} title="Social">
        <a
          target="_blank"
          rel="author noopener"
          href="https://github.com/celsopalmeiraneto"
        >
          <img src="img/github.png" alt="GitHub's Logo" />
        </a>
        <a
          target="_blank"
          rel="author noopener"
          href="https://www.linkedin.com/in/celsopalmeira/"
        >
          <img src="img/linkedin.png" alt="LinkedIn's Logo" />
        </a>
        <a
          target="_blank"
          rel="author noopener"
          href="https://stackoverflow.com/users/2455964/celsoneto07"
        >
          <img src="img/stackoverflow.png" alt="StackOverflow's Logo" />
        </a>
        <a
          target="_blank"
          rel="author noopener"
          href="https://www.goodreads.com/user/show/108800771-celso-palmeira"
        >
          <img src="img/goodreads.svg" alt="GoodRead's Logo" />
        </a>
      </Section>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = await getPostsSummaries(SupportedLocales.AmericanEnglish);

  return {
    props: {
      posts,
    },
  };
};

export default Home;
