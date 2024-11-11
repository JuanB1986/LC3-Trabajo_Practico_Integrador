import styles from './Footer.module.css';
import { Button } from "react-bootstrap"
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <p> Acecrca de...</p>
                <li><a href="#">TravelROS</a></li>
                <li><a href="#">Normas comunitarias</a></li>
            </div>
            <div className={styles.right}>
                <div className={styles.text}>
                    <p>
                        DENUNCIÁ a Conductores o Pasajeros <br></br>
                    </p>
                    <p>
                        que no cumplan nuestras <a href="#">Normas Comunitarias</a>
                    </p>
                </div>
                <Button variant='danger'> Denunciar </Button>
            </div>
        </div >

    )
}

export default Footer