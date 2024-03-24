import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FiChevronUp } from 'react-icons/fi';

const useScrollToTop: React.FC = () => {
  const [showScroll, setShowScroll] = useState<boolean>(false);

  const scrollToTop = useCallback(() => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true);
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false);
    }
  }, [showScroll]);

  useEffect(() => {
    window.addEventListener('scroll', scrollToTop);

    return function cleanup() {
      window.removeEventListener('scroll', scrollToTop);
    };
  }, [scrollToTop]);

  const backToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const iconStyle = useMemo(
    () => ({
      height: 45,
      width: 45,
      borderRadius: 50,
      right: 50,
      bottom: 50,
      display: showScroll ? 'flex' : 'none',
      padding: 5,
      color: localStorage.getItem('theme') === 'dark' ? '#fff' : '#000',
    }),
    [showScroll]
  );

  return (
    <>
      <FiChevronUp className="scrollToTop" onClick={backToTop} style={iconStyle} />
    </>
  );
};

export default useScrollToTop;
