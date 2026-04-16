import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { registerUser } from '../api/client'
import type { AppLanguage } from '../i18n'

export function RegisterPage({
  language,
  onRegisterSuccess,
}: {
  language: AppLanguage
  onRegisterSuccess?: (user: { id: number; email: string }) => void
}) {
  const navigate = useNavigate()
  const [sp] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState('')
  const isEs = language === 'es'
  const redirectTo = sp.get('redirect') || '/boats'
  const prefillEmail = sp.get('email') || ''

  useEffect(() => {
    if (prefillEmail) setEmail(prefillEmail)
  }, [prefillEmail])

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setDone('')
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    try {
      const res = await registerUser({ email, password, remember_me: remember })
      if (!res.success) {
        setError(res.message || 'Registration failed')
        return
      }
      if (res.user && onRegisterSuccess) {
        onRegisterSuccess(res.user)
      }
      setDone('Registration successful. You can login now.')
      setTimeout(() => navigate(redirectTo), 700)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>{isEs ? 'Registrate gratis' : 'Register Free'}</h1>
        {error ? <p className="auth-error">{error}</p> : null}
        {done ? <p className="auth-success">{done}</p> : null}
        <label>
          {isEs ? 'Correo electronico' : 'Email Address'}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          {isEs ? 'Contrasena' : 'Password'}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          {isEs ? 'Confirmar contrasena' : 'Confirm Password'}
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        </label>
        <label className="auth-check">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          {isEs ? 'recordarme' : 'remember me'}
        </label>
        <button type="submit" className="auth-btn">{isEs ? 'Registrar' : 'Register'}</button>
      </form>
    </main>
  )
}
