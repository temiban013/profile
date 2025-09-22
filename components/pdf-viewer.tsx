"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, X, Maximize2, Minimize2, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/contexts/language-context";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export function PDFViewer({ isOpen, onClose, pdfUrl, title }: PDFViewerProps) {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1.2);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfDocRef = useRef<any>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderPage = async (pdf: any, pageNum: number) => {
      if (!canvasRef.current) return;

      try {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Error rendering page:', err);
        setError(true);
      }
    };

    const loadPDFAsync = async () => {
      try {
        setIsLoading(true);
        setError(false);

        // Load PDF.js dynamically
        const pdfjsLib = await import('pdfjs-dist');

        // Configure worker source to use local file
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

        const loadingTask = pdfjsLib.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        pdfDocRef.current = pdf;
        setTotalPages(pdf.numPages);
        setCurrentPage(1);

        // Render first page
        await renderPage(pdf, 1);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError(true);
        setIsLoading(false);
      }
    };

    if (isOpen && pdfUrl) {
      loadPDFAsync();
    } else {
      // Reset state when closed
      setIsLoading(true);
      setError(false);
      setCurrentPage(1);
      setTotalPages(0);
      pdfDocRef.current = null;
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, pdfUrl, scale]);

  // Render page function for navigation and zoom controls
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderPage = async (pdf: any, pageNum: number) => {
    if (!canvasRef.current) return;

    try {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale });

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
    } catch (err) {
      console.error('Error rendering page:', err);
      setError(true);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const goToPage = async (pageNum: number) => {
    if (pageNum >= 1 && pageNum <= totalPages && pdfDocRef.current) {
      setCurrentPage(pageNum);
      await renderPage(pdfDocRef.current, pageNum);
    }
  };

  const zoomIn = async () => {
    const newScale = Math.min(scale + 0.2, 3);
    setScale(newScale);
    if (pdfDocRef.current && currentPage) {
      await renderPage(pdfDocRef.current, currentPage);
    }
  };

  const zoomOut = async () => {
    const newScale = Math.max(scale - 0.2, 0.5);
    setScale(newScale);
    if (pdfDocRef.current && currentPage) {
      await renderPage(pdfDocRef.current, currentPage);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={`${
          isFullscreen
            ? "w-full h-full"
            : "w-[90vw] h-[85vh] max-w-4xl rounded-xl"
        } bg-background border border-border flex flex-col overflow-hidden professional-shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b flex-shrink-0 bg-background">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">{title}</h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFullscreen}
                className="h-8 w-8"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 relative bg-gray-100 dark:bg-gray-900 overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">
                  {language === "es" ? "Cargando documento..." : "Loading document..."}
                </p>
              </div>
            </div>
          )}

          {error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3">
                <p className="text-sm text-muted-foreground">
                  {language === "es"
                    ? "Error al cargar el documento. Por favor, descárgalo directamente."
                    : "Error loading document. Please download it directly."}
                </p>
                <Button onClick={handleDownload} variant="default">
                  <Download className="mr-2 h-4 w-4" />
                  {language === "es" ? "Descargar PDF" : "Download PDF"}
                </Button>
              </div>
            </div>
          ) : (
            <div
              ref={containerRef}
              className="w-full h-full overflow-auto bg-white dark:bg-gray-800"
            >
              <div className="flex justify-center p-4">
                <canvas
                  ref={canvasRef}
                  className="max-w-full h-auto border border-gray-300 dark:border-gray-600 shadow-lg"
                  style={{ display: isLoading ? 'none' : 'block' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        {!isLoading && !error && totalPages > 0 && (
          <div className="px-6 py-3 border-t flex items-center justify-between bg-background">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
              >
                {language === "es" ? "Anterior" : "Previous"}
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
              >
                {language === "es" ? "Siguiente" : "Next"}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={zoomOut}>
                -
              </Button>
              <span className="text-sm text-muted-foreground min-w-12 text-center">
                {Math.round(scale * 100)}%
              </span>
              <Button variant="outline" size="sm" onClick={zoomIn}>
                +
              </Button>
            </div>
          </div>
        )}

        {/* Footer with Download Button */}
        <div className="px-6 py-4 border-t flex-shrink-0 flex justify-between items-center bg-background">
          <p className="text-sm text-muted-foreground">
            {language === "es"
              ? "Vista previa solo lectura - Sin capacidad de edición"
              : "Read-only preview - No editing capabilities"}
          </p>
          <Button
            onClick={handleDownload}
            variant="default"
            className="rounded-full"
            disabled={isLoading}
          >
            <Download className="mr-2 h-4 w-4" />
            {language === "es" ? "Descargar PDF" : "Download PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}