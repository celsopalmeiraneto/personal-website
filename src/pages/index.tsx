import { PostIt } from "../components/post-it";
import { Section } from "../components/section";
import styles from "./index.module.scss";

const Home = () => {
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
        <PostIt
          title="Monolith or Microservices"
          tag="Tech"
          text="Aliqua excepteur ut voluptate excepteur ea adipisicing enim officia cillum enim veniam nostrud."
        />
        <PostIt
          title="Color Transition using Math"
          tag="Tech"
          text="Quis do minim minim mollit fugiat magna."
        />
        <PostIt
          title="A Walk in the Park"
          tag="Short Stories"
          text="Dolore elit ea aute excepteur ad."
        />
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

export default Home;
