import Image from "next/image";
import styles from "./page.module.css";
import BusinessCard from "./components/businesses/BusinessCard";
import { businesses } from "./utils/mock_data";

export default function Home() {
  return (
    <div className={styles.page}>
      {businesses.map((business) => (
        <div className={styles.business}>
          <BusinessCard key={business.id} business={business} />
        </div>
      ))}
    </div>
  );
}
