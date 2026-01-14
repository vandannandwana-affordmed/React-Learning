import styles from './CarCard.module.css'

export default function CarCard({card_name, card_description, card_icon, card_color, corner_radius}) {
    return (
        <div className={styles.card} style={{backgroundColor: card_color, borderRadius: corner_radius}}>
            <img src={card_icon} width="66px" alt="group_icon" />
            <p class={styles.card_name}>{card_name}</p>
            <p class={styles.card_description}>
                {card_description}
            </p>
            <p class={styles.learn_more_button} style={{color: card_color}}>
                Learn More
            </p>
        </div>
    )
}