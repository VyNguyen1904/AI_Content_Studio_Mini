import { useState } from "react";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("caption");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Form Inputs
  const [topic, setTopic] = useState("");
  const [mood, setMood] = useState("😎 Chill");
  const [text, setText] = useState("");
  const [style, setStyle] = useState("formal");
  const [language, setLanguage] = useState("Tiếng Việt");

  const handleGenerate = async () => {
    if (!topic && activeTab !== "rewrite") return alert("Cậu ơi, nhập chủ đề đã nhé!");
    if (!text && activeTab === "rewrite") return alert("Cậu chưa nhập văn bản cần viết lại nè!");

    setLoading(true);
    setResult(null);
    let endpoint = "";
    let body = { language };

    if (activeTab === "caption") {
      endpoint = "generate-caption";
      Object.assign(body, { topic, mood });
    } else if (activeTab === "rewrite") {
      endpoint = "rewrite";
      Object.assign(body, { text, style });
    } else {
      endpoint = "generate-idea";
      Object.assign(body, { topic });
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Lỗi kết nối đến Backend rồi cậu ơi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">✨</div>
          <div className="logo-text">
            <h2>AI Content Studio Mini</h2>
          </div>
        </div>

        <nav className="nav-menu">
          <div className={`nav-item ${activeTab === "caption" ? "active" : ""}`} onClick={() => setActiveTab("caption")}>
            <span>📝</span> Caption
          </div>
          <div className={`nav-item ${activeTab === "rewrite" ? "active" : ""}`} onClick={() => setActiveTab("rewrite")}>
            <span>✍️</span> Rewrite Content
          </div>
          <div className={`nav-item ${activeTab === "idea" ? "active" : ""}`} onClick={() => setActiveTab("idea")}>
            <span>💡</span> Idea Generator
          </div>
        </nav>

        <div className="tips-card">
          <h4>💡 Mẹo sử dụng</h4>
          <ul>
            <li>• Nhập chủ đề rõ ràng</li>
            <li>• Chọn mood / style phù hợp</li>
            <li>• Kết quả sẽ tốt hơn khi mô tả chi tiết</li>
          </ul>
        </div>

        <div style={{ marginTop: 'auto', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
          AI Content Studio Mini v1.0.0
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main-content">
        <div className="header-top">
          <div>
            <h1>Xin chào! 👋</h1>
            <p style={{ color: '#64748b' }}>Tạo nội dung sáng tạo với sức mạnh của AI</p>
          </div>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ width: '130px', padding: '8px', borderRadius: '20px' }}
            >
              <option value="Tiếng Việt">🇻🇳 Tiếng Việt</option>
              <option value="English">🇺🇸 English</option>
            </select>
            <div className="status-badge">
              <span className="dot"></span> AI API: Connected
            </div>
          </div>
        </div>

        {/* TABS SWITCHER */}
        <div className="tab-switcher">
          <button className={`tab-btn ${activeTab === "caption" ? "active" : ""}`} onClick={() => setActiveTab("caption")}>
            <span>✨ Caption</span>
            <span>Tạo caption & hashtag</span>
          </button>
          <button className={`tab-btn ${activeTab === "rewrite" ? "active" : ""}`} onClick={() => setActiveTab("rewrite")}>
            <span>✍️ Rewrite</span>
            <span>Viết lại nội dung theo style</span>
          </button>
          <button className={`tab-btn ${activeTab === "idea" ? "active" : ""}`} onClick={() => setActiveTab("idea")}>
            <span>💡 Idea Generator</span>
            <span>Gợi ý ý tưởng content</span>
          </button>
        </div>

        {/* WORKSPACE */}
        <div className="workspace">
          {/* Cột trái: Input */}
          <div className="card">
            <div className="card-header">📝 Thông tin đầu vào</div>

            {activeTab === "caption" && (
              <>
                <div className="form-field">
                  <label className="input-label">Chủ đề (Topic)</label>
                  <input type="text" placeholder="Nhập chủ đề (VD: summer, cafe...)" value={topic} onChange={(e) => setTopic(e.target.value)} />
                  <div style={{ textAlign: 'right', fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{topic.length}/200</div>
                </div>
                <div className="form-field">
                  <label className="input-label">Mood (Phong cách)</label>
                  <select value={mood} onChange={(e) => setMood(e.target.value)}>
                    <option value="😎 Chill">😎 Chill</option>
                    <option value="😂 Funny">😂 Hài hước</option>
                    <option value="❤️ Romantic">❤️ Lãng mạn</option>
                    <option value="🔥 Deep">🔥 Sâu sắc</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === "rewrite" && (
              <>
                <div className="form-field">
                  <label className="input-label">Văn bản gốc</label>
                  <textarea placeholder="Nhập văn bản cần viết lại..." value={text} onChange={(e) => setText(e.target.value)} />
                </div>
                <div className="form-field">
                  <label className="input-label">Style muốn đổi</label>
                  <select value={style} onChange={(e) => setStyle(e.target.value)}>
                    <option value="formal">Trang trọng</option>
                    <option value="genz">Vibe Gen Z</option>
                    <option value="storytelling">Kể chuyện</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === "idea" && (
              <div className="form-field">
                <label className="input-label">Chủ đề muốn gợi ý ý tưởng</label>
                <input type="text" placeholder="Cậu muốn làm về gì? (VD: du lịch, nấu ăn...)" value={topic} onChange={(e) => setTopic(e.target.value)} />
              </div>
            )}

            <button className="btn-generate" onClick={handleGenerate} disabled={loading}>
              {loading ? "Đang xử lý..." : `✨ Generate ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
            </button>
          </div>

          {/* Cột phải: Results */}
          <div className="card">
            <div className="card-header" style={{ justifyContent: 'space-between' }}>
              <span>✨ Kết quả</span>
              {result && <button className="copy-btn" onClick={() => alert("Đã copy!")}>📋 Copy all</button>}
            </div>

            {!result && !loading && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                Chưa có nội dung. Hãy nhập thông tin và nhấn nút Generate nhé!
              </div>
            )}

            {loading && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <div className="spinner"></div>
                <p style={{ marginTop: '10px', color: '#6366f1' }}>AI đang suy nghĩ...</p>
              </div>
            )}

            {result && (
              <div className="result-content">
                {activeTab === "caption" && (
                  <>
                    <div className="result-box">
                      <h4>📄 Caption</h4>
                      <p>{result.caption}</p>
                    </div>
                    <div className="result-box">
                      <h4>🏷️ Hashtags</h4>
                      <p style={{ color: '#6366f1' }}>{result.hashtags}</p>
                    </div>
                  </>
                )}
                {activeTab === "rewrite" && (
                  <div className="result-box">
                    <h4>✍️ Rewritten Text</h4>
                    <p>{result.rewritten_text}</p>
                  </div>
                )}
                {activeTab === "idea" && (
                  <div className="idea-list">
                    {result.ideas?.map((idea, index) => (
                      <div key={index} className="result-box">
                        <h4>💡 {idea.title}</h4>
                        <p><strong>Hook:</strong> {idea.hook}</p>
                        <p>{idea.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <footer style={{ marginTop: '40px', fontSize: '12px', color: '#94a3b8', textAlign: 'center' }}>
          ⚠️ Lưu ý: Nội dung được tạo bởi AI, vui lòng kiểm tra lại trước khi sử dụng.
        </footer>
      </main>
    </div>
  );
}

export default App;
