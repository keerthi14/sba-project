import './NotificationBar.css'

interface NotificationBarProps {
  message: string
}

export function NotificationBar({ message }: NotificationBarProps) {
  return (
    <div className="notification-bar" role="status">
      <div className="notification-bar__inner">
        <span className="notification-bar__info" aria-hidden>
          ⓘ
        </span>
        <p>{message}</p>
      </div>
    </div>
  )
}
