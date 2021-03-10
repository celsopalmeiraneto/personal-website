import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.mainContainer}>
      <header id={styles.header}>
        <div className={styles.name}>
          <p>Hey there! I am</p>
          <h1>Celso Neto</h1>
        </div>
        <div className={styles.portrait}>
          <img src="img/celso.jpg" alt="Celso Neto's Portrait" />
        </div>
      </header>
      <section className={styles.bio}>
        <p>
          I am a father, husband, friend, software engineer, F1 buff and science
          nerd.
          <br />
          I've been developing software since 2006, in this time I worked with a
          lot of fantastic people to deliver pieces of technology that helped
          real people get things done throughout the world.
        </p>
      </section>
      <section className={styles.notes}>
        <h5 className="title">Notes</h5>
        <div className={styles.content}>
          <div className={styles.noteSummary}>
            <h6 className={styles.title}>Monolith or Microservices?</h6>
            <span className={styles.category}>Tech</span>
            <div className={styles.text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
              deleniti molestiae quam eveniet atque iste provident excepturi
              quos ipsum itaque sequi veritatis saepe nobis quasi, sed ducimus
              praesentium, expedita dolorem!
            </div>
          </div>
          <div className={styles.noteSummary}>
            <h6 className={styles.title}>Color Transition using Math</h6>
            <span className={styles.category}>Tech</span>
            <div className={styles.text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
              deleniti molestiae quam eveniet atque iste provident excepturi
              quos ipsum itaque sequi veritatis saepe nobis quasi, sed ducimus
              praesentium, expedita dolorem!
            </div>
          </div>
          <div className={styles.noteSummary}>
            <h6 className={styles.title}>A Walk in the Park</h6>
            <span className={styles.category}>Short Stories</span>
            <div className={styles.text}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid
              deleniti molestiae quam eveniet atque iste provident excepturi
              quos ipsum itaque sequi veritatis saepe nobis quasi, sed ducimus
              praesentium, expedita dolorem!
            </div>
          </div>
        </div>
      </section>
      <section>
        <h5 className="title">Projects</h5>
        <div></div>
      </section>
      <section>
        <h5 className="title">Talk to me</h5>
        <form>
          <input type="text" />
        </form>
      </section>
      <section className={styles.social}>
        <a href="">
          <img src="img/github.png" alt="GitHub's Logo" />
        </a>
        <a href="">
          <img src="img/stackoverflow.png" alt="StackOverflow's Logo" />
        </a>
        <a href="">
          <img src="img/goodreads.svg" alt="GoodRead's Logo" />
        </a>
      </section>
    </div>
  );
};

export default Home;
