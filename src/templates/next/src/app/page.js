import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>{{ PROJECT_NAME }}</h1>
      <p>
        Get started by editing&nbsp;
        <code>src/app/page.js</code>
      </p>
    </main>
  )
}
