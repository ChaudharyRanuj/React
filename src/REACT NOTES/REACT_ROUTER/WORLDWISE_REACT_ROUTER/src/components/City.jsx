import styles from "./City.module.css";
import BackButton from "./BackButton";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { useCities } from "../context/CityContext";
import { useEffect } from "react";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();

  const { currCity, isLoading, getCity } = useCities();
  const { cityName, date, notes } = currCity;

  useEffect(
    function () {
      getCity(id);
    },
    [getCity, id]
  );

  // TEMP DATA

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City Name</h6>
        <h3>{cityName}</h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
