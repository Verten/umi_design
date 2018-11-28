import React from 'react'
import styles from './index.css'
import Button from '../components/button'
import Loading from '../components/loading'

export default function LandingPage() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
          <Button icon='icon-settings'>Setting Button</Button>
          <Loading />
        </li>
        <li>
          <a href='https://umijs.org/guide/getting-started.html'>Getting Started</a>
        </li>
      </ul>
    </div>
  )
}
