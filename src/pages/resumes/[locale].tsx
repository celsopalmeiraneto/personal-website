import styles from "./[locale].module.scss";
import data from "./resume.json";
import { GetStaticPaths, GetStaticProps } from "next";
import { SupportedLocales } from "../../types";
import { DevicePhoneMobileIcon, EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { ContactInformation, getContactInformation } from "../../services/contact-information";

interface ResumePageProps {
  locale: "en-US";
  contactInfo: ContactInformation;
}

const ResumePage = ({ locale, contactInfo }: ResumePageProps) => {
  return (
    <div className={styles.container}>
      <h1>Résumé</h1>
      <div>
        <span onClick={() => window.print()}>Print</span>
      </div>
      <div id={styles.resume}>
        <header>
          <h2>Celso Palmeira Neto</h2>
          <div className={styles.titleAndLocation}>
            <h3>Backend Software Engineer | Tech Lead</h3>
            <h3>Braga, Portugal</h3>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <GlobeAltIcon className={styles.icon} />
              <a href="https://celsoneto.com.br" target="_blank">
                https://celsoneto.com.br
              </a>
            </div>
            {contactInfo.phoneNumber && (
              <div className={styles.contactItem}>
                <EnvelopeIcon className={styles.icon} />
                <a href={`mailto:${contactInfo.emailAddress}`}>{contactInfo.emailAddress}</a>
              </div>
            )}
            {contactInfo.phoneNumber && (
              <div className={styles.contactItem}>
                <DevicePhoneMobileIcon className={styles.icon} />
                <a href={`tel:${contactInfo.phoneNumber.replaceAll(" ", "")}`}>
                  {contactInfo.phoneNumber}
                </a>
              </div>
            )}
          </div>
        </header>
        {data.sections.map((sectionInfo) => (
          <section key={sectionInfo.slug}>
            <h2>{sectionInfo.title[locale]}</h2>
            {sectionInfo.items.map((item) => (
              <div className={styles.item} key={item.slug}>
                <p className={styles.itemTitle}>
                  <span>{item.description[locale]}</span> at{" "}
                  <span>
                    <a href={item.website} target="_blank">
                      {item.institution[locale]}
                    </a>
                  </span>
                </p>
                <div className={styles.itemLocation}>{item.location[locale]}</div>
                <div className={styles.itemPeriod}>
                  {item.period.begin} - {item.period.end ? `${item.period.end}` : "Present Days"}
                </div>
                {"highlights" in item && (
                  <ul className={styles.itemHighlights}>
                    {item.highlights[locale].map((highlight, index, array) => (
                      <li key={index}>
                        {highlight}
                        {index === array.length - 1 ? "." : ";"}
                      </li>
                    ))}
                  </ul>
                )}
                {"notes" in item && (
                  <div className={styles.itemNotes}>
                    <p>{item.notes[locale]}</p>
                  </div>
                )}
                {"stack" in item && item.stack.length > 0 && (
                  <div className={styles.itemStack}>
                    <p>
                      <strong>Stack:</strong> {item.stack.sort().join(", ")}.
                    </p>
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

export const getStaticProps: GetStaticProps<
  ResumePageProps,
  { locale: SupportedLocales }
> = async ({ params }) => {
  if (params?.locale !== SupportedLocales.AmericanEnglish) {
    return {
      notFound: true,
    };
  }

  const contactInfo = await getContactInformation();

  return {
    props: {
      locale: SupportedLocales.AmericanEnglish,
      contactInfo,
    },
  };
};

export default ResumePage;
