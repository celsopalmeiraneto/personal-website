import { GetStaticProps } from "next";

function About() {
  return <div>About</div>;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

export default About;
