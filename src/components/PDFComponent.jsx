import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

// Créer des styles pour le PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    fontSize: 12,
    color: '#000',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
  },
});

// Créer le document PDF
const MyDocument = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Mon Document PDF</Text>
      <Text style={styles.text}>Ceci est un exemple de document PDF généré avec React-pdf.</Text>
      <Text style={styles.text}>Vous pouvez ajouter du texte, des images et d'autres éléments.</Text>
    </Page>
  </Document>
);

// Composant principal
const PDFComponent = () => {
  return (
    <div>
      <h1>Générer un PDF</h1>
      <PDFDownloadLink document={<MyDocument />} fileName="mon_document.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Chargement...' : 'Télécharger le PDF'
        }
      </PDFDownloadLink>
    </div>
  );
};

export default PDFComponent;
