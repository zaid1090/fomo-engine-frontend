/* eslint-disable react/no-unescaped-entities */

export const metadata = {
    title: 'FOMO Store | العروض الحصرية',
    description: 'اقتنص العروض الحصرية والإصدارات المحدودة قبل نفاذ الكمية',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="ar" dir="rtl">
        <body style={{ margin: 0, padding: 0, backgroundColor: "#0a0a0a", color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
          
          {/* شريط التنقل العلوي - Neon Style */}
          <header style={{ 
            padding: "20px 40px", 
            borderBottom: "1px solid #222", 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            backgroundColor: "#111",
            position: "sticky",
            top: 0,
            zIndex: 100
          }}>
            <div style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "1px", cursor: "pointer" }}>
              <span style={{ color: "#ff3b30", textShadow: "0 0 10px rgba(255,59,48,0.5)" }}>FOMO</span>
              <span style={{ color: "#fff" }}>STORE</span>
            </div>
            
            <nav style={{ display: "flex", gap: "25px", fontWeight: "500" }}>
              <a href="#" style={{ color: "#fff", textDecoration: "none", transition: "color 0.3s" }}>الرئيسية</a>
              <a href="#" style={{ color: "#a1a1aa", textDecoration: "none", transition: "color 0.3s" }}>العروض الحالية 🔥</a>
              <a href="#" style={{ color: "#a1a1aa", textDecoration: "none", transition: "color 0.3s" }}>الطلبات السابقة</a>
            </nav>
          </header>
  
          {/* محتوى الصفحات الديناميكي */}
          <main>
            {children}
          </main>
          
          {/* تذييل الصفحة */}
          <footer style={{ padding: "30px", textAlign: "center", borderTop: "1px solid #222", color: "#555", fontSize: "14px", marginTop: "40px" }}>
            جميع الحقوق محفوظة © {new Date().getFullYear()} - FOMO Store
          </footer>
        </body>
      </html>
    )
  }