'use client'
import React, { useState, useEffect } from 'react';
import SideNav from "../ui/salesDashboard/sideNav";
import styles from "../ui/styles/sideNav.module.css";
import LoadingScreen from '../ui/loader/loadingScreen'



























export default function Layout({ children }) {







  

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular una carga de datos real aquí, por ejemplo, una llamada a API
    const loadData = async () => {
      // Simulando un retraso en la carga de datos (como una llamada API)
      await new Promise((resolve) => setTimeout(resolve, 500)); // Espera 1 segundo

      setLoading(false); // Termina la carga
    };

    loadData(); // Ejecutar la función de carga
  }, []);

  // Si está cargando, mostrar la pantalla de carga
  if (loading) {








    
    return <LoadingScreen />;
  }

  // Una vez cargado, renderizar el contenido

    return (
        <div className={styles.contain}>
         
        <div >
          <SideNav />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }