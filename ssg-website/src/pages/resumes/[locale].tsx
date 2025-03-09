import data from "./resume.json";
import { GetStaticPaths, GetStaticProps } from "next";
import { SupportedLocales } from "../../types";
import { DevicePhoneMobileIcon, EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { ContactInformation, getContactInformation } from "../../services/contact-information";
import { useTranslations } from "../../i18n/client";
import Head from "next/head";

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
    <div className="container mx-auto">
      <Head>
        <title>{`Celso Palmeira Neto's HP - ${translate({ key: "resume.resume" })}`}</title>
      </Head>
      <h1 className="text-3xl font-thin print:hidden">{translate({ key: "resume.resume" })}</h1>
      <div className="flex gap-3 print:hidden mb-10">
        <span onClick={() => window.print()}>Print</span>
        <a href="en-US">{translate({ key: "locales.en-US" })}</a>
        <a href="pt-BR">{translate({ key: "locales.pt-BR" })}</a>
      </div>
      <div className="grid gap-4">
        <header className="grid gap-5 md:gap-1">
          <h2 className="text-4xl font-thin">Celso Palmeira Neto</h2>
          <div className="flex justify-between font-thin text-2xl flex-wrap gap-2">
            <h3>Backend Software Engineer | Tech Lead</h3>
            <h3>Braga, Portugal</h3>
          </div>
          <div className="flex justify-between flex-wrap gap-2">
            <div className="flex items-center">
              <GlobeAltIcon className="size-5" />
              <a href="https://celsoneto.com.br" target="_blank">
                celsoneto.com.br
              </a>
            </div>
            {contactInfo.emailAddress && (
              <div className="flex items-center">
                <EnvelopeIcon className="size-5" />
                <a href={`mailto:${contactInfo.emailAddress}`}>{contactInfo.emailAddress}</a>
              </div>
            )}
            {contactInfo.phoneNumber && (
              <div className="flex items-center">
                <DevicePhoneMobileIcon className="size-5" />
                <a href={`tel:${contactInfo.phoneNumber.replaceAll(" ", "")}`}>
                  {contactInfo.phoneNumber}
                </a>
              </div>
            )}
          </div>
        </header>
        {data.sections.map((sectionInfo) => (
          <section key={sectionInfo.slug}>
            <h2 className="text-3xl font-thin underline decoration-1 mb-3">
              {sectionInfo.title[locale]}
            </h2>
            {sectionInfo.items.map((item) => (
              <div
                className="grid break-inside-avoid pl-2 gap-1 print:gap-0 grid-cols-2 mb-8 last:mb-0"
                key={item.slug}
              >
                <p className="col-span-2">
                  <span className="text-2xl">{item.description[locale]}</span>{" "}
                  {` ${translate({ key: "resume.at" })} `}
                  <span className="text-lg">
                    <a className="underline" href={item.website} target="_blank">
                      {item.institution[locale]}
                    </a>
                  </span>
                </p>
                <div className="text-lg content-center">{item.location[locale]}</div>
                <div className="text-lg text-right content-center">
                  {formatDate(new Date(item.period.begin))} -{" "}
                  {item.period.end
                    ? formatDate(new Date(item.period.end))
                    : translate({ key: "resume.presentDays" })}
                </div>
                {"highlights" in item && (
                  <ul className="col-span-2 list-inside list-disc">
                    {item.highlights[locale].map((highlight, index, array) => (
                      <li key={index}>
                        {highlight}
                        {index === array.length - 1 ? "." : ";"}
                      </li>
                    ))}
                  </ul>
                )}
                {"notes" in item && (
                  <div className="col-span-2">
                    <p className="leading-tight">{item.notes[locale]}</p>
                  </div>
                )}
                {"stack" in item && item.stack.length > 0 && (
                  <div className="text-sm col-span-2">
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
