import styles from "./index.module.scss";

export interface PostItProps {
  title: string;
  tag: string;
  text: string;
}

export const PostIt = ({ title, tag, text }: PostItProps) => {
  return (
    <div className={styles.container}>
      <img src="/img/numbers.jpg" />
      <h6 className={styles.title}>{title}</h6>
      <span className={styles.tag}>{tag}</span>
      <div className={styles.text}>{text}</div>
    </div>
  );
};
