import { useEffect } from 'react';

const Custom404 = () => {
  useEffect(() => {
    window.setTimeout(() => {
      location.href = '/';
    }, 5000);
  }, []);
  return (
    <div>
      <div style={{ padding: '1em' }}>404 - Page Not Found</div>
    </div>
  );
};
export default Custom404;
