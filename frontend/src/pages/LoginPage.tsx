import { useState, type FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { loginUser } from '../api/client'
import type { AppLanguage } from '../i18n'

interface LoginPageProps {
  onLoginSuccess: (user: { id: number; email: string }) => void
  language: AppLanguage
}

export function LoginPage({ onLoginSuccess, language }: LoginPageProps) {
  const navigate = useNavigate()
  const [sp] = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')
  const isEs = language === 'es'
  const redirectTo = sp.get('redirect') || '/boats'

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await loginUser({ email, password, remember_me: remember })
      if (!res.success || !res.user) {
        setError(res.message || 'Login failed')
        return
      }
      onLoginSuccess(res.user)
      navigate(redirectTo)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <h1>{isEs ? 'Iniciar sesion' : 'Login'}</h1>
        {error ? <p className="auth-error">{error}</p> : null}
        <label>
          {isEs ? 'Correo electronico' : 'Email Address'}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          {isEs ? 'Contrasena' : 'Password'}
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label className="auth-check">
          <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
          {isEs ? 'recordarme' : 'remember me'}
        </label>
        <a href="#" className="auth-link">{isEs ? 'Olvide mi contrasena' : 'Forget my password'}</a>
        <button type="submit" className="auth-btn">{isEs ? 'Ingresar' : 'Login'}</button>
      </form>
    </main>
  )
}
