'use client';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// الاتصال بالخادم اللحظي
const socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fomo-engine-backend-800871339199.asia-east1.run.app', {
  transports: ['websocket'] // إجبار الاتصال المباشر لتخطي قيود جوجل
});

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [stock, setStock] = useState(500); 

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));
    
    // استقبال تحديثات المخزون اللحظية
    socket.on('stock_update', (data) => {
      if (data.productId === 'prod_001') {
        setStock(data.newStock);
      }
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('stock_update');
    };
  }, []);

  const reserveItem = () => {
    socket.emit('reserve_item', { productId: 'prod_001', quantity: 1 }, (response) => {
      if (response.success) {
        console.log(`تم الحجز. رقم المعاملة: ${response.reservationId}`);
      } else {
        alert(`خطأ: ${response.error}`);
      }
    });
  };

  return (
    <div style={{ padding: '30px', fontFamily: 'system-ui', maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
      <h2>FOMO-Engine Checkout</h2>
      <p style={{ color: isConnected ? 'green' : 'red', fontSize: '12px' }}>
        {isConnected ? '🟢 متصل بمحرك التسعير' : '🔴 جاري الاتصال...'}
      </p>
      
      <div style={{ border: '2px solid #333', borderRadius: '10px', padding: '20px', marginTop: '30px' }}>
        <h3>Lotion Pumps (PP)</h3>
        <h1 style={{ color: stock < 100 ? 'red' : 'black' }}>
          {stock} حبة متبقية فقط!
        </h1>
        <button 
          onClick={reserveItem}
          disabled={stock <= 0}
          style={{ 
            width: '100%', padding: '15px', marginTop: '10px',
            backgroundColor: stock > 0 ? '#ff4d4f' : '#ccc', 
            color: 'white', border: 'none', borderRadius: '5px',
            fontWeight: 'bold', fontSize: '16px', cursor: stock > 0 ? 'pointer' : 'not-allowed' 
          }}
        >
          {stock > 0 ? 'تأكيد الحجز اللحظي' : 'نفدت الكمية'}
        </button>
      </div>
    </div>
  );
}