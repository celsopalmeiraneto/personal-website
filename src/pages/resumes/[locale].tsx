import styles from "./[locale].module.scss";
import data from "./resume.json";

const LOCALE = "en-US";

const ResumePage = () => {
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
            <h2>{sectionInfo.title[LOCALE]}</h2>
            {sectionInfo.items.map((item) => (
              <div className={styles.item} key={item.slug}>
                <div className={styles.itemInstitution}>{item.institution[LOCALE]}</div>
                <div className={styles.itemLocation}>{item.location[LOCALE]}</div>
                <div className={styles.itemDescription}>{item.description[LOCALE]}</div>
                <div className={styles.itemPeriod}>Julu 2000 - Sep. 2001</div>
                {"notes" in item && (
                  <div className={styles.itemNotes}>
                    <p>{item.notes[LOCALE]}</p>
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

export default ResumePage;
