import { Section } from "../components/section";
import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.mainContainer}>
      <header id={styles.header}>
        <p>Hey there! I am</p>
        <h1>Celso Neto</h1>
      </header>
      <Section title="" className={styles.bioContainer}>
        <div>
          <p>Father, Husband, Friend, Software Engineer.</p>
          <p>
            I've been in the software industry since 2006, in this time I worked
            with a lot of fantastic people to deliver pieces of technology that
            helped real people get things done throughout the world.
          </p>
        </div>
        <div className={styles.portrait}>
          <img src="img/celso.png" alt="Celso Neto's Portrait" />
        </div>
      </Section>
      <Section title="Notes" className={styles.notesContainer}>
        <div className={styles.noteSummary}>
          <h6 className={styles.title}>Monolith or Microservices?</h6>
          <span className={styles.category}>Tech</span>
          <div className={styles.text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
            deleniti molestiae quam eveniet atque iste provident excepturi quos
            ipsum itaque sequi veritatis saepe nobis quasi, sed ducimus
            praesentium, expedita dolorem!
          </div>
        </div>
        <div className={styles.noteSummary}>
          <h6 className={styles.title}>Color Transition using Math</h6>
          <span className={styles.category}>Tech</span>
          <div className={styles.text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
            deleniti molestiae quam eveniet atque iste provident excepturi quos
            ipsum itaque sequi veritatis saepe nobis quasi, sed ducimus
            praesentium, expedita dolorem!
          </div>
        </div>
        <div className={styles.noteSummary}>
          <h6 className={styles.title}>A Walk in the Park</h6>
          <span className={styles.category}>Short Stories</span>
          <div className={styles.text}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
            deleniti molestiae quam eveniet atque iste provident excepturi quos
            ipsum itaque sequi veritatis saepe nobis quasi, sed ducimus
            praesentium, expedita dolorem!
          </div>
        </div>
      </Section>
      <Section className={styles.socialContainer} title="Social">
        <a href="">
          <img src="img/github.png" alt="GitHub's Logo" />
        </a>
        <a href="">
          <img src="img/stackoverflow.png" alt="StackOverflow's Logo" />
        </a>
        <a href="">
          <img src="img/goodreads.svg" alt="GoodRead's Logo" />
        </a>
      </Section>
    </div>
  );
};

export default Home;
