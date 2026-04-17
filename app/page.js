"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlePurchase = async () => {
    setLoading(true);
    setResponseMsg(null);
    // سيتم ربط هذا الرابط بمحرك Google Cloud لاحقاً
    const baseUrl = "https://fomo-engine-backend-800871339199.asia-east1.run.app";
    const endpoint = `${baseUrl}/api/checkout`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: "VIP-100", action: "fomo_purchase", timestamp: Date.now() }),
      });
      if (!res.ok) throw new Error("السيرفر رفض الطلب، تأكد من مسار الـ API");
      const data = await res.json();
      setResponseMsg({ type: "success", text: "تم تأكيد الطلب بنجاح! الرد: " + JSON.stringify(data) });
    } catch (err) {
      setResponseMsg({ type: "error", text: "فشل الاتصال: " + err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0a0a0a", color: "#fff", fontFamily: "sans-serif", direction: "rtl", padding: "20px" }}>
      <div style={{ maxWidth: "450px", width: "100%", padding: "30px", backgroundColor: "#1a1a1a", borderRadius: "16px", border: "1px solid #333", textAlign: "center", boxShadow: "0 10px 40px rgba(255, 60, 48, 0.15)" }}>
        <div style={{ display: "inline-block", backgroundColor: "#ff3b30", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold", marginBottom: "25px", animation: "pulse 2s infinite" }}>
          🔥 عرض فلاش - متبقي قطعتين فقط!
        </div>
        <h1 style={{ fontSize: "26px", marginBottom: "15px", color: "#fff" }}>ساعة الإصدار المحدود</h1>
        <p style={{ color: "#a1a1aa", marginBottom: "25px", lineHeight: "1.6" }}>
          احصل على الإصدار الحصري قبل نفاذ الكمية. العرض ينتهي بانتهاء العداد التنازلي.
        </p>
        <div style={{ fontSize: "40px", fontWeight: "900", color: "#ff3b30", marginBottom: "30px", letterSpacing: "2px" }}>
          {formatTime(timeLeft)}
        </div>
        <button 
          onClick={handlePurchase} 
          disabled={loading || timeLeft === 0}
          style={{ width: "100%", padding: "16px", fontSize: "18px", fontWeight: "bold", backgroundColor: (loading || timeLeft === 0) ? "#3f3f46" : "#ff3b30", color: "#fff", border: "none", borderRadius: "10px", cursor: (loading || timeLeft === 0) ? "not-allowed" : "pointer", transition: "all 0.3s ease" }}
        >
          {loading ? "جاري معالجة الطلب..." : timeLeft === 0 ? "انتهى العرض" : "اقتنص العرض الآن"}
        </button>
        {responseMsg && (
          <div style={{ marginTop: "20px", padding: "15px", borderRadius: "10px", backgroundColor: responseMsg.type === "success" ? "rgba(34, 197, 94, 0.1)" : "rgba(239, 68, 68, 0.1)", color: responseMsg.type === "success" ? "#4ade80" : "#f87171", border: `1px solid ${responseMsg.type === "success" ? "#22c55e" : "#ef4444"}`, fontSize: "14px" }}>
            {responseMsg.text}
          </div>
        )}
      </div>
    </div>
  );
}
