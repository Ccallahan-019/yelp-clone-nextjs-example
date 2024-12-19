import { business } from "@/app/utils/definitions"
import styles from './bussinessCardStyles.module.css'
import { checkHours } from "@/app/utils/helperFunctions/checkHours"

export default function BusinessCard({ business }: { business: business }) {
    const hours = checkHours(business);
    const prefix = hours.prefix;
    const time = hours.time;
    const day = hours.day;

    return (
        <div className={styles.container}>
            <img
                className={styles.image}
                src={business.image_url}
                alt={business.name}
            />
            <div className={styles.informationContainer}>
                <div className={styles.informationHeader}>
                    <p className={styles.name}>{business.name}</p>
                    <div className={styles.hours}>
                        <p>
                            {prefix}<span className={styles.time}>{time} {day}</span>
                        </p>
                    </div>
                    
                </div>
                <div className={styles.information}>
                    <div className={styles.address}>
                        <div>
                            <p>{business.location.address1}</p>
                            <p>{business.location.city}</p>
                            <p>{`${business.location.state} ${business.location.zip_code}`}</p>
                        </div>
                    </div>
                    <div className={styles.detailsContainer}>
                        <div className={styles.details}>
                            <p>{business.categories[0].title.toUpperCase()}</p>
                            <p>{`${business.rating} stars`}</p>
                            <p className={`${styles.details} ${styles.reviewCount}`}>{`${business.review_count} reviews`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}