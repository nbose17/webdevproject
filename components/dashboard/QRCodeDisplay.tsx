'use client';

import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { mockGyms } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import Button from '@/components/shared/Button';
import { FaWhatsapp, FaTelegram, FaDownload } from 'react-icons/fa';
import { getFullUrl } from '@/lib/utils';

export default function QRCodeDisplay() {
  const { user } = useAuth();
  const gymId = '1';
  const gym = mockGyms.find(g => g.id === gymId) || mockGyms[0];
  const [gymPageUrl, setGymPageUrl] = useState(`/gym/${gymId}`);

  useEffect(() => {
    // Set the full URL with base path
    setGymPageUrl(getFullUrl(`/gym/${gymId}`));
  }, [gymId]);

  const handleDownloadQR = () => {
    const qrContainer = document.querySelector('.qr-code-container');
    const svg = qrContainer?.querySelector('svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = 'gym-qr-code.png';
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(`Check out ${gym.name}!\n\nScan the QR code or visit: ${gymPageUrl}`);
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleShareTelegram = () => {
    const message = encodeURIComponent(`Check out ${gym.name}!\n\nScan the QR code or visit: ${gymPageUrl}`);
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(gymPageUrl)}&text=${message}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <div style={{ display: 'flex', gap: 'var(--spacing-2xl)', flexWrap: 'wrap', justifyContent: 'center' }}>
      {/* QR Share Section */}
      <div style={{ flex: '1', maxWidth: '600px', minWidth: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-lg)', background: 'var(--color-white)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)' }}>
        <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-sm)' }}>Share QR Code</h3>
        <div className="qr-code-container">
          <QRCodeSVG value={gymPageUrl} size={200} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-md)', width: '100%' }}>
          <div style={{ display: 'flex', gap: 'var(--spacing-sm)', width: '100%', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={handleShareWhatsApp}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                backgroundColor: '#25D366',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#20BA5A';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#25D366';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaWhatsapp />
              <span>Share on WhatsApp</span>
            </button>
            <button
              onClick={handleShareTelegram}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-xs)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                backgroundColor: '#0088cc',
                color: 'white',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 'var(--font-weight-medium)',
                transition: 'all var(--transition-base)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0077B5';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#0088cc';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FaTelegram />
              <span>Share on Telegram</span>
            </button>
          </div>
          <Button variant="outline" onClick={handleDownloadQR} size="sm">
            <FaDownload style={{ marginRight: '6px' }} />
            Download QR Code
          </Button>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
            Scan QR or go to the below link
            <br />
            <a
              href={gymPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
            >
              {gymPageUrl}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

