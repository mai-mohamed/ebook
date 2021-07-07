import React, { useState } from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/thumbnail/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./PdfViewer.css";

export const PdfViewer = () => {
  const [viewPdf, setViewPdf] = useState(
    "https://arxiv.org/pdf/quant-ph/0410100.pdf"
  );
  const [waterMark, setWaterMark] = useState(false);
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Thumbnails } = thumbnailPluginInstance;

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [defaultTabs[1]], //to view only book mark icon
  });

  const onPageChange = (e) => {
    e?.currentPage >= 3 ? setWaterMark(true) : setWaterMark(false);
  };

  const renderWaterMark = (props) => (
    <>
      {props.canvasLayer.children}
      <div className="water-mark__wrapper">
        <div
          className="water-mark-content"
          style={{
            fontSize: `${8 * props.scale}rem`,
            userSelect: "none",
          }}
        >
          premuim
        </div>
      </div>
      {props.annotationLayer.children}
      {props.textLayer.children}
    </>
  );
  const renderPreventCopy = (props) => (
    <>
      {props.canvasLayer.children}
      <div style={{ userSelect: "none" }}>{props.textLayer.children}</div>
      {props.annotationLayer.children}
    </>
  );

  return (
    <div className="pdf-container">
      {viewPdf && (
        <>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer
              fileUrl={viewPdf}
              plugins={[defaultLayoutPluginInstance, thumbnailPluginInstance]}
              renderPage={waterMark ? renderWaterMark : renderPreventCopy}
              onPageChange={onPageChange}
            />
          </Worker>
        </>
      )}
      <div
        className="thumbnail__wrapper"
      >
        <Thumbnails renderPage={renderWaterMark} />
      </div>
    </div>
  );
};

export default PdfViewer;
