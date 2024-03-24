import React, { useEffect } from 'react';

const BackToTop: React.FC = () => {
  const userScrollPosition = 0;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userScrollPosition]);

  return <div></div>;
};

export default BackToTop;
