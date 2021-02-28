import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import mainSquare from "../../assets/main-square.png";
import mainIntro from "../../assets/main-intro2.png";
import styles from "./index.module.scss";
import { useMediaQuery } from "react-responsive";

const pageList = ["Feature", "White Paper", "Career", "Support", "Language"];

const LandingPage = () => {
  const history = useHistory();
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 905px)" });
  const [isShowNavList, setIsShowNavList] = useState(false);

  const handleMenuClick = () => {
    history.push("/market");
  };
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div style={{ display: "flex" }}>
          <img className={styles.mainSquareImage} src={mainSquare}></img>
          <div className={styles.headerTitle}>PuiPi</div>
        </div>
        {!isTabletOrMobile ? (
          <>
            <ul className={styles.pageList}>
              {pageList.map((item) => (
                <li onClick={handleMenuClick} key={item}>
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={handleMenuClick} className={styles.joinWaitListButton}>Martetplace</button>
          </>
        ) : (
          <div
            onClick={() => setIsShowNavList(!isShowNavList)}
            className={styles.listButton}
          >
            <i className="fas fa-bars"></i>
          </div>
        )}
      </header>
      {isShowNavList && (
        <div className={styles.navList}>
          {pageList.map((item) => (
            <div onClick={handleMenuClick} key={item}>
              {item}
            </div>
          ))}
          <div
            onClick={() => setIsShowNavList(!isShowNavList)}
            className={styles.closeList}
          ></div>
        </div>
      )}
      <div>
        <img className={styles.introPic} src={mainIntro}></img>
        <div className={styles.introText}>
          THE MARKETPLACE FOR 3D ASSETS
        </div>
        <div className={styles.joinWaitListButtonContainer}>
          <button onClick={handleMenuClick} className={styles.joinWaitListButton}>Martetplace</button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
