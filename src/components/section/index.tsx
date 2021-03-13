import styles from "./index.module.scss";

export interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const Section = ({ title, children, className }: SectionProps) => {
  return (
    <section className={styles.container}>
      {title.trim() && <h5 className={styles.title}>{title}</h5>}
      <div className={className}>{children}</div>
    </section>
  );
};
