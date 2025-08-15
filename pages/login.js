import Head from 'next/head'
import { useState } from 'react'

export default function Login() {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const bg = '/assets/logo_jaguar.png'

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
    }}>
      <Head>
        <title>Login — KING_S_BALFX</title>
      </Head>

      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0,0,0,0.45)'
      }} />

      <main style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 960,
        width: '100%',
        padding: '48px',
        display: 'flex',
        gap: '48px',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <section style={{ flex: 1, color: '#fff' }}>
          <h1 style={{ fontSize: 48, margin: 0, lineHeight: 1.05 }}>True power is in you</h1>
          <p style={{ marginTop: 16, fontSize: 18, opacity: 0.9 }}>Sign in to access VIP content and exclusive features.</p>
        </section>

        <aside style={{ width: 420 }}>
          <div style={{
            background: 'rgba(255,255,255,0.96)',
            color: '#111',
            padding: 28,
            borderRadius: 12,
            boxShadow: '0 8px 30px rgba(2,6,23,0.4)'
          }}>
            <h2 style={{ marginTop: 0, marginBottom: 12 }}>Subscriber Login</h2>
            <label style={{ display:'block', fontSize:13, marginBottom:6 }}>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" style={{
              width:'100%', padding:'10px 12px', marginBottom:12, borderRadius:6, border:'1px solid #ddd'
            }} />

            <label style={{ display:'block', fontSize:13, marginBottom:6 }}>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" style={{
              width:'100%', padding:'10px 12px', marginBottom:16, borderRadius:6, border:'1px solid #ddd'
            }} />

            <button style={{
              width:'100%', padding:'12px', borderRadius:8, background:'#1558d6', color:'#fff', fontWeight:700, border:'none'
            }}>Sign in</button>

            <p style={{ marginTop:12, fontSize:13, color:'#555' }}>Don't have an account? <a href="/premium">Upgrade</a></p>
          </div>
        </aside>
      </main>
    </div>
  )
}
