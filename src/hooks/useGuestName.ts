import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useGuestName = () => {
  const [searchParams] = useSearchParams();
  
  const guestName = useMemo(() => {
    const name = searchParams.get('to');
    if (name) {
      // Replace underscores with spaces and decode URI
      return decodeURIComponent(name.replace(/_/g, ' '));
    }
    return 'Tamu Undangan';
  }, [searchParams]);

  return guestName;
};
