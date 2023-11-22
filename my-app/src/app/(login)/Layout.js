// components/Layout.js
import React from 'react';
import styles from '../styles/Layout.module.css';
const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <header></header>
            <main>{children}</main>
            <footer></footer>
        </div>
    );
};

export default Layout;
