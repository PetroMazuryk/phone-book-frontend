import { Toaster } from 'react-hot-toast';
import styles from './ToasterBar.module.css';

export const ToasterBar = () => {
  return (
    <Toaster
      position="top-center"
      gutter={12}
      toastOptions={{
        duration: 6000,
        style: {
          fontSize: '18px',
          padding: '14px 20px',
          maxWidth: '700px',
          borderRadius: '20px',
          color: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          animation: `${styles.toastSlideIn} 0.35s ease-out`,
        },
        success: {
          icon: '✅',
          style: {
            background: 'linear-gradient(135deg, #82b574ff, #5a9843)',
          },
        },
        error: {
          icon: '🔥',
          style: {
            background: 'linear-gradient(135deg, #e89f9fff, #d33d3dff)',
          },
        },
      }}
    />
  );
};
