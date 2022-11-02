import React, { ComponentPropsWithoutRef } from "react";
import styles from "./index.module.scss";

export interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  type?: "section" | "nav";
}

const Container = ({
  type,
  children,
  ...props
}: ComponentPropsWithoutRef<"nav" | "section"> & {
  type: "section" | "nav";
}) => {
  return React.createElement(type, props, children);
};

export const Section = ({ title, children, className, type = "section" }: SectionProps) => {
  return (
    <Container type={type} className={styles.container}>
      {title.trim() && <h5 className={styles.title}>{title}</h5>}
      <div className={className}>{children}</div>
    </Container>
  );
};
