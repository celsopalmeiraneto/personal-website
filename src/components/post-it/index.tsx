import styles from "./index.module.scss";

export interface PostItProps {
  id: string;
  title: string;
  tag: string;
  text: string;
  cover: {
    src: string;
    alt: string;
  };
}

export const PostIt = ({ id, title, tag, text, cover }: PostItProps) => {
  return (
    <div className={styles.container}>
      <a href={`/posts/${id}`}>
        <img className={styles.image} src={cover.src} alt={cover.alt} />
      </a>
      <a href={`/posts/${id}`}>
        <h6 className={styles.title}>{title}</h6>
      </a>
      <a href={`/posts/${id}`}>
        <span className={styles.tag}>{tag}</span>
      </a>
      <a href={`/posts/${id}`}>
        <div className={styles.text}>{text}</div>
      </a>
    </div>
  );
};
