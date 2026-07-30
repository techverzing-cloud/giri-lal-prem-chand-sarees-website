import { useNotification } from '@/state/NotificationContext'
import { Toast } from './Toast'

export function ToastContainer() {
  const { notifications, removeNotification } = useNotification()

  if (notifications.length === 0) return null

  return (
    <div className="fixed right-6 top-24 z-[9999] flex flex-col gap-2">
      {notifications.map((n) => (
        <Toast key={n.id} message={n.message} type={n.type} isVisible onClose={() => removeNotification(n.id)} />
      ))}
    </div>
  )
}
