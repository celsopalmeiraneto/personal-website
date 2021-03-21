import styles from "./index.module.scss";

export interface PostItProps {
  title: string;
  tag: string;
  text: string;
}

export const PostIt = ({ title, tag, text }: PostItProps) => {
  return (
    <div className={styles.container}>
      <a href="/blog-post">
        <img className={styles.image} src="/img/numbers.jpg" />
      </a>
      <a href="/blog-post">
        <h6 className={styles.title}>{title}</h6>
      </a>
      <a href="/blog-post">
        <span className={styles.tag}>{tag}</span>
      </a>
      <a href="/blog-post">
        <div className={styles.text}>{text}</div>
      </a>
    </div>
  );
};
