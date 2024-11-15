import { useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

interface QrReaderProps {
    onScanSuccess: (decodedText: string) => void;
}
export default function QrReader(props: QrReaderProps) {
    useEffect(() => {
        const html5QrcodeScanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        html5QrcodeScanner.render(
            (decodedText) => props.onScanSuccess(decodedText),
            (error) => console.warn("Error while scanning: ", error)
        );

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Error while clearing: ", error);
            });
        };
    }, [props.onScanSuccess]);

    return (
        <div>
            <h2>Scan ticket QR code:</h2>
            <div id="reader" style={{ width: '300px', margin: 'auto', marginBottom: '20px' }}></div>
        </div>
    );
}