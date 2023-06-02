import styles from "./[locale].module.scss";
import data from "./resume.json";
import { GetStaticPaths, GetStaticProps } from "next";
import { SupportedLocales } from "../../types";

interface ResumePageProps {
  locale: "en-US";
}

const ResumePage = ({ locale }: ResumePageProps) => {
  return (
    <div className={styles.container}>
      <h1>Résumé</h1>
      <div>
        <span onClick={() => window.print()}>Print</span>
      </div>
      <div id={styles.resume}>
        <h2>Celso Palmeira Neto</h2>
        {data.sections.map((sectionInfo) => (
          <section key={sectionInfo.slug}>
            <h2>{sectionInfo.title[locale]}</h2>
            {sectionInfo.items.map((item) => (
              <div className={styles.item} key={item.slug}>
                <a href={item.website} target="_blank">
                  <div className={styles.itemInstitution}>{item.institution[locale]}</div>
                </a>
                <div className={styles.itemLocation}>{item.location[locale]}</div>
                <div className={styles.itemDescription}>{item.description[locale]}</div>
                <div className={styles.itemPeriod}>
                  {item.period.begin}
                  {item.period.end ? ` - ${item.period.end}` : ""}
                </div>
                {"notes" in item && (
                  <div className={styles.itemNotes}>
                    <p>{item.notes[locale]}</p>
                  </div>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          locale: SupportedLocales.AmericanEnglish,
        },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<ResumePageProps, { locale: SupportedLocales }> = ({
  params,
}) => {
  if (params?.locale !== SupportedLocales.AmericanEnglish) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      locale: SupportedLocales.AmericanEnglish,
    },
  };
};

export default ResumePage;
