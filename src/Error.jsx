import { Link } from "react-router"
import styles from './home.module.css'
export default function Error(){
    return(
        <div className={styles.container}>
            <div className={styles.bkrnd}>
                <h1>This page doesn't exist!</h1>
                <div className={styles.buttons}>
                    <Link to={'/'}><button>Return Home</button></Link>
                </div>
            </div>
        </div>
    )
}