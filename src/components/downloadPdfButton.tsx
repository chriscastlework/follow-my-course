import { useState } from 'react';

const DownloadPDFButton = () => {
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDownloadUrl = async () => {
    setLoading(true);
    setError(null);
	  // const pdfPublicId = 'sulttw3zmcomqzni4pzr'; // Replace with your actual public ID
    try {
        const response = await fetch('/api/generate-signed-url/', {});

      if (!response.ok) {
        throw new Error('Failed to fetch download URL');
      }

      const data = await response.json();
      setDownloadUrl(data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={fetchDownloadUrl} disabled={loading}>
        {loading ? 'Generating download link...' : 'Download PDF'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {downloadUrl && (
        <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
          Click here to download
        </a>
      )}
    </div>
  );
};

export default DownloadPDFButton;
