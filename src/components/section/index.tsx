import React, { ComponentPropsWithoutRef } from "react";

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
    <Container type={type} className="mb-8">
      {title.trim() && (
        <h5 className="tracking-widest uppercase my-4 text-2xl md:text-3xl font-thin">{title}</h5>
      )}
      <div className={className}>{children}</div>
    </Container>
  );
};
