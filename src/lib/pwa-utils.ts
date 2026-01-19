// PWA Native Features Utilities

/**
 * Download a file to device storage
 */
export async function downloadFile(
  filename: string,
  content: Blob | string,
  mimeType: string = 'application/octet-stream'
) {
  try {
    const blob = typeof content === 'string' ? new Blob([content], { type: mimeType }) : content;
    
    // Check if device has File System Access API (modern browsers)
    if ('showSaveFilePicker' in window) {
      try {
        const handle = await (window as any).showSaveFilePicker({
          suggestedName: filename,
          types: [{ description: 'File', accept: { [mimeType]: ['.' + filename.split('.').pop()] } }],
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log('✅ File saved successfully');
        return true;
      } catch (err) {
        console.log('File save cancelled or not supported, using fallback');
      }
    }

    // Fallback: Use download attribute (works on all devices)
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    console.log('✅ File downloaded successfully');
    return true;
  } catch (error) {
    console.error('❌ Download failed:', error);
    return false;
  }
}

/**
 * Capture image from camera
 */
export async function captureFromCamera(): Promise<Blob | null> {
  try {
    // Check if device has Camera API
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error('Camera not supported on this device');
    }

    // Request camera permission
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false,
    });

    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          stream.getTracks().forEach((track) => track.stop());
          
          canvas.toBlob((blob) => {
            console.log('✅ Photo captured from camera');
            resolve(blob);
          }, 'image/jpeg', 0.95);
        }
      };
    });
  } catch (error) {
    console.error('❌ Camera capture failed:', error);
    return null;
  }
}

/**
 * Generate a sample ID Card PDF/Image for download demo
 */
export function generateIDCard(): Blob {
  // Create a simple canvas-based ID card
  const canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 250;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 400, 250);

    // Pink header
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(0, 0, 400, 60);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('AMBETTER HEALTH', 200, 35);

    // Member ID
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'left';
    ctx.fillText('Member ID: ABT-2026-001234', 20, 100);
    ctx.fillText('Name: John Doe', 20, 130);
    ctx.fillText('Plan: Affordable Health', 20, 160);
    ctx.fillText('Group: Demo-2026', 20, 190);

    // Expiry
    ctx.fillText('Valid Until: 12/31/2026', 20, 220);

    // Logo placeholder
    ctx.fillStyle = '#ec4899';
    ctx.fillRect(320, 80, 60, 60);
    ctx.fillStyle = '#ffffff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('LOGO', 350, 115);
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob || new Blob());
    }, 'image/png');
  }) as any;
}

/**
 * Get file extension from MIME type
 */
export function getFileExtension(mimeType: string): string {
  const map: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'application/pdf': 'pdf',
    'image/webp': 'webp',
  };
  return map[mimeType] || 'bin';
}
