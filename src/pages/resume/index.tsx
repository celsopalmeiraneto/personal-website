import styles from "./index.module.scss";

const ResumePage = () => {
  return (
    <div>
      <h1>Resume</h1>
      <div id={styles.resume}>
        <h2>Celso Palmeira Neto</h2>
        <section id="education">
          <h2>Education</h2>
          <div className={styles.item}>
            <div className="itemInstitution">School Name</div>
            <div className="itemLocation">Location, Country</div>
            <div className="itemDescription">B. Sc. Information Systems</div>
            <div className="itemPeriod">Julu 2000 - Sep. 2001</div>
            <div className="itemNotes">
              <p>
                Adipisicing minim eu culpa elit in. Id eiusmod amet occaecat qui laborum
                exercitation tempor reprehenderit voluptate eu reprehenderit enim. Laborum ipsum
                nisi do cupidatat. Ullamco nulla reprehenderit deserunt dolore ipsum duis in
                adipisicing Lorem enim incididunt adipisicing. Officia ut consectetur do ullamco
                irure mollit adipisicing.
              </p>
            </div>
          </div>
        </section>
        <section id="work"></section>
      </div>
    </div>
  );
};

export default ResumePage;
