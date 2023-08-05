import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { ReactFlow } from 'reactflow';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const MyDocument = ({ nodes, edges }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        {nodes.map((node) => (
          <Text key={node.id}>{node.data.title}</Text>
        ))}
        {edges.map((edge) => (
          <Text key={edge.id}>{edge.label}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

const ExportPDF = ({ nodes, edges }) => {
  

  return (
    <PDFDownloadLink document={<MyDocument nodes={nodes} edges={edges} />} fileName="flow.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Exportando...' : 'Descargar PDF'
      }
    </PDFDownloadLink>
  );
};

export default ExportPDF;