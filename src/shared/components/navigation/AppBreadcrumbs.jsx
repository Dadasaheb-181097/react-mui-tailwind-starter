import { Link } from 'react-router-dom'
import { ChevronRight, HomeOutlined } from '@mui/icons-material'
import { useAppBreadcrumbs } from './useAppBreadcrumbs'

/**
 * Dynamic breadcrumb trail — auto-resolves from the current route, or pass `items` to override.
 *
 * @param {{ items?: { label: string, to?: string, icon?: string }[], className?: string }} props
 */
export function AppBreadcrumbs({ items: itemsProp, className = '' }) {
  const autoItems = useAppBreadcrumbs()
  const items = itemsProp ?? autoItems

  if (!items.length) return null

  return (
    <nav
      className={['breadcrumb', className].filter(Boolean).join(' ')}
      aria-label="Breadcrumb"
    >
      <ol className="breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const showHomeIcon = index === 0 && item.icon === 'home'

          return (
            <li key={`${item.label}-${index}`} className="breadcrumb__item">
              {index > 0 ? (
                <ChevronRight className="breadcrumb__sep" fontSize="inherit" aria-hidden />
              ) : null}

              {!isLast && item.to ? (
                <Link to={item.to} className="breadcrumb__link">
                  {showHomeIcon ? <HomeOutlined className="breadcrumb__home-icon" fontSize="inherit" /> : null}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="breadcrumb__current" aria-current={isLast ? 'page' : undefined}>
                  {showHomeIcon && isLast ? (
                    <HomeOutlined className="breadcrumb__home-icon" fontSize="inherit" />
                  ) : null}
                  <span>{item.label}</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
