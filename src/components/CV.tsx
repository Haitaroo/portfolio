import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { toolbarPlugin, ToolbarSlot } from '@react-pdf-viewer/toolbar';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import React from 'react';
import { version as pdfjsVersion } from 'pdfjs-dist/package.json';
import { Fullscreen } from 'lucide-react';

const CV = () => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <div style={{ width: '100%', }}>
      <div style={{ marginBottom: '10px' }}>
        <Toolbar>
          {(props: ToolbarSlot) => {
            const {
              CurrentPageInput,
              ZoomIn,
              ZoomOut,
              Download,
              Print,
              GoToNextPage,
              GoToPreviousPage,
              EnterFullScreen,
            } = props;
            return (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <GoToPreviousPage />
                <CurrentPageInput />
                <GoToNextPage />
                <ZoomOut />
                <ZoomIn />
                <EnterFullScreen />
                <Download />
                <Print />
              </div>
            );
          }}
        </Toolbar>
      </div>

      {/* Visionneuse de PDF */}
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjsVersion}/build/pdf.worker.min.js`}>
        <div style={{ height: '400px' }}>
          <Viewer
            fileUrl="./fichiers/CV_Olivier_BARBIN.pdf"
            plugins={[toolbarPluginInstance]}
          />
        </div>
      </Worker>

      {/* Bouton de téléchargement */}
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <a href="./fichiers/CV_Olivier_BARBIN.pdf" download>
          <button style={{ padding: '10px 20px', fontSize: '16px' }}>Télécharger le CV</button>
        </a>
      </div>
    </div>
  );
};

export default CV;
