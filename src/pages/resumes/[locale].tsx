import styles from "./[locale].module.scss";
import data from "./resume.json";
import { GetStaticPaths, GetStaticProps } from "next";
import { SupportedLocales } from "../../types";
import { DevicePhoneMobileIcon, EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { ContactInformation, getContactInformation } from "../../services/contact-information";
import { useTranslations } from "../../i18n/client";

interface ResumePageProps {
  locale: SupportedLocales;
  contactInfo: ContactInformation;
}

const ResumePage = ({ locale, contactInfo }: ResumePageProps) => {
  const { translate } = useTranslations({ locale });
  const { format: formatDate } = new Intl.DateTimeFormat(locale, {
    month: "2-digit",
    year: "numeric",
  });
  return (
    <div className={styles.container}>
      <h1>{translate({ key: "resume.resume" })}</h1>
      <div className={styles.languages}>
        <span onClick={() => window.print()}>Print</span>
        <a href="en-US">{translate({ key: "locales.en-US" })}</a>
        <a href="pt-BR">{translate({ key: "locales.pt-BR" })}</a>
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
                  <span>{item.description[locale]}</span> {` ${translate({ key: "resume.at" })} `}
                  <span>
                    <a href={item.website} target="_blank">
                      {item.institution[locale]}
                    </a>
                  </span>
                </p>
                <div className={styles.itemLocation}>{item.location[locale]}</div>
                <div className={styles.itemPeriod}>
                  {formatDate(new Date(item.period.begin))} -{" "}
                  {item.period.end
                    ? formatDate(new Date(item.period.end))
                    : translate({ key: "resume.presentDays" })}
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
      {
        params: {
          locale: SupportedLocales.BrazilianPortuguese,
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
  const contactInfo = await getContactInformation();

  return {
    props: {
      locale: params?.locale ?? SupportedLocales.AmericanEnglish,
      contactInfo,
    },
  };
};

export default ResumePage;
