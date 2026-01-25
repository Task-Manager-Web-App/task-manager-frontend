import React from "react";

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "Shane Dinod",
    email: "t3wish00@students.oamk.fi",
    bio: "Frontend Developer. Coffee enthusiast. Dog lover.",
    location: "Oulu, Finland",
  };

  return (
    <div
      style={{
        maxWidth: 440,
        margin: "60px auto",
        padding: 40,
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        background: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: 36,
          gap: 28,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#a3a3a3",
            fontSize: 36,
            fontWeight: 600,
            border: "2px dashed #cbd5e1",
            flexShrink: 0,
          }}
        >
          {/* Avatar Placeholder */}
          +
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{user.name}</h2>
          <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: 16 }}>{user.email}</p>
        </div>
      </div>
      <div style={{ marginBottom: 28 }}>
        <strong style={{ color: "#334155" }}>Bio:</strong>
        <p style={{ margin: "8px 0 20px 0", color: "#334155" }}>{user.bio}</p>
        <strong style={{ color: "#334155" }}>Location:</strong>
        <p style={{ margin: "8px 0 0 0", color: "#334155" }}>{user.location}</p>
      </div>
      <button
        style={{
          padding: "12px 32px",
          borderRadius: 8,
          border: "none",
          background: "#2563eb",
          color: "#fff",
          fontWeight: 600,
          fontSize: 16,
          cursor: "pointer",
          letterSpacing: 0.5,
        }}
      >
        Edit Profile
      </button>
    </div>
  );
}