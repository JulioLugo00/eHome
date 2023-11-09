import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

function SuccessPage() {
  const router = useRouter();
  const { session_id } = router.query;

  useEffect(() => {
    if (session_id) {
      axios.post('/api/confirm-payment', { session_id })
        .then(response => {
          // Aquí puedes redirigir o mostrar un mensaje de éxito
          toast.success('Payment successful!');
          router.push('/trips');
        })
        .catch(error => {
          toast.error('Payment confirmation failed');
        });
    }
  }, [session_id, router]);

  return (
    <div>
      Confirming your payment...
    </div>
  );
}

export default SuccessPage;