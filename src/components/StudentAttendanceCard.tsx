// src/components/StudentAttendanceCard.tsx
import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

// html5-qrcode
import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";

// firebase
import { db } from "../firebase.js/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

interface Props {
  studentId: string;    // e.g. "1"
  classId: string;      // e.g. "Advanced_Mathematics"
}

export function StudentAttendanceCard({ studentId, classId }: Props) {
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [lastScannedCode, setLastScannedCode] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const divId = `qr-reader-${studentId}`;
  const toastTimerRef = useRef<number | null>(null);

  // show toast helper
  const showToast = (type: "success" | "error", text: string, duration = 3000) => {
    setToast({ type, text });
    // clear previous timer
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, duration);
  };

  const startScanner = async () => {
    setStatus(null);
    setLastScannedCode(null);
    setScanning(true);

    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(divId, false);
      }

      const config = { fps: 10, qrbox: { width: 250, height: 250 }, facingMode: "environment" as const };

      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        (decodedText: string) => {
          if (!decodedText) return;
          if (decodedText === lastScannedCode) return;
          setLastScannedCode(decodedText);
          handleScan(decodedText);
        },
        () => {
          // scan failure callback (silent)
        }
      );
    } catch (err: any) {
      console.error("Scanner start error:", err);
      setStatus("❌ Unable to access camera. Check permissions.");
      showToast("error", "Unable to access camera. Allow camera permissions.");
      setScanning(false);
    }
  };

  const stopScanner = async () => {
    try {
      if (scannerRef.current && scannerRef.current.getState() !== Html5QrcodeScannerState.NOT_STARTED) {
        await scannerRef.current.stop();
      }
      // safe clear (Html5Qrcode has clear() but types may not declare it)
      try {
        // @ts-ignore
        scannerRef.current && scannerRef.current.clear && scannerRef.current.clear();
      } catch {
        // fallback: try as any
        (scannerRef.current as any)?.clear?.();
      }
    } catch (err) {
      console.warn("stopScanner error", err);
    } finally {
      setScanning(false);
    }
  };

  const handleScan = async (code: string) => {
    try {
      // optional validation:
      // if (!code.startsWith("ATTEND-")) { showToast("error", "Invalid QR"); return; }

      await setDoc(doc(db, "classes", classId, "attendance", studentId), {
        present: true,
        scannedAt: new Date(),
        qrCode: code,
      });

      setStatus("✅ Attendance marked");
      showToast("success", "Attendance marked successfully!");
      await stopScanner();
    } catch (err) {
      console.error("Error marking attendance:", err);
      setStatus("❌ Error marking attendance");
      showToast("error", "Error marking attendance");
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        try {
          // @ts-ignore
          scannerRef.current.clear && scannerRef.current.clear();
        } catch {
          (scannerRef.current as any)?.clear?.();
        }
      }
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 dark:from-blue-950/20 dark:to-cyan-950/20 relative overflow-visible">
      <CardHeader>
        <CardTitle className="text-blue-600">📱 Mark Attendance</CardTitle>
      </CardHeader>

      {/* Toast (absolute top-right inside the card) */}
      {toast && (
        <div
          className={`absolute right-4 top-4 z-50 px-3 py-2 rounded-md text-sm font-medium shadow-lg transform transition-all`}
          style={{
            background: toast.type === "success" ? "linear-gradient(90deg,#16a34a,#22c55e)" : "linear-gradient(90deg,#dc2626,#ef4444)",
            color: "white",
          }}
        >
          {toast.text}
        </div>
      )}

      <CardContent className="flex flex-col items-center gap-4">
        {!scanning ? (
          <>
            <Button onClick={startScanner} className="bg-blue-600 text-white">
              Scan QR Code
            </Button>
            {status && <div className="text-sm">{status}</div>}
          </>
        ) : (
          <>
            <div id={divId} className="w-full max-w-sm" />
            <div className="flex gap-2 mt-2">
              <Button variant="outline" onClick={stopScanner}>Cancel</Button>
            </div>
            <div className="mt-2 text-xs text-foreground/60">
              Tip: point your phone camera at the teacher's QR displayed on their screen.
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
