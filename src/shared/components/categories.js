/**
 * Reusable component taxonomy — single source of truth for the design system.
 * Import from category barrels: `@/shared/components/ui`, `@/shared/components/form`, etc.
 */
export const COMPONENT_CATEGORIES = {
  ui: {
    id: 'ui',
    label: 'UI Components',
    description: 'Atomic primitives — buttons, inputs, badges, tooltips, spinners.',
    path: '@/shared/components/ui',
    components: ['Button', 'Input', 'Select', 'Checkbox', 'Radio', 'Badge', 'Tooltip', 'Spinner', 'UserAvatar'],
  },
  form: {
    id: 'form',
    label: 'Form Components',
    description: 'Form layout, field wrappers, and action bars.',
    path: '@/shared/components/form',
    components: ['FormField', 'FormSection', 'FormActions'],
  },
  table: {
    id: 'table',
    label: 'Table Components',
    description: 'Data tables, empty states, and table toolbars.',
    path: '@/shared/components/table',
    components: ['DataTable', 'TableEmpty', 'TableToolbar'],
  },
  modal: {
    id: 'modal',
    label: 'Modal Components',
    description: 'Dialogs, confirm prompts, and modal shells.',
    path: '@/shared/components/modal',
    components: ['AppModal', 'ConfirmDialog'],
  },
  drawer: {
    id: 'drawer',
    label: 'Drawer Components',
    description: 'Right-side panel drawers for chat, notifications, profile, and more.',
    path: '@/shared/components/drawer',
    components: ['AppDrawer', 'ChatDrawer', 'NotificationDrawer', 'ProfileDrawer'],
  },
  layout: {
    id: 'layout',
    label: 'Layout Components',
    description: 'Page shells, headers, sections, and content layout.',
    path: '@/shared/components/layout',
    components: ['PageContainer', 'PageHeader', 'Section'],
  },
  feedback: {
    id: 'feedback',
    label: 'Feedback Components',
    description: 'Alerts, empty states, loading overlays.',
    path: '@/shared/components/feedback',
    components: ['InlineAlert', 'EmptyState', 'LoadingOverlay'],
  },
  auth: {
    id: 'auth',
    label: 'Authentication Components',
    description: 'Auth UI shells and role-gated content.',
    path: '@/shared/components/auth',
    components: ['AuthCard', 'RoleGate'],
  },
  navigation: {
    id: 'navigation',
    label: 'Navigation Components',
    description: 'Breadcrumbs, nav links, and wayfinding.',
    path: '@/shared/components/navigation',
    components: ['AppBreadcrumbs', 'NavLink'],
  },
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard Components',
    description: 'KPI cards, stat grids, and dashboard widgets.',
    path: '@/shared/components/dashboard',
    components: ['StatCard', 'KpiGrid'],
  },
  card: {
    id: 'card',
    label: 'Card Components',
    description: 'Content cards and info panels.',
    path: '@/shared/components/card',
    components: ['AppCard', 'InfoCard'],
  },
  fileUpload: {
    id: 'fileUpload',
    label: 'File Upload Components',
    description: 'Dropzones and uploaded file lists.',
    path: '@/shared/components/file-upload',
    components: ['FileDropzone', 'FileList'],
  },
  searchFilter: {
    id: 'searchFilter',
    label: 'Search & Filter Components',
    description: 'Search bars, filter panels, and filter chips.',
    path: '@/shared/components/search-filter',
    components: ['SearchBar', 'FilterBar', 'FilterChip'],
  },
  business: {
    id: 'business',
    label: 'Business Components',
    description: 'Domain-specific display — status, currency, amounts, dates.',
    path: '@/shared/components/business',
    components: ['StatusBadge', 'CurrencyDisplay', 'AmountDisplay', 'DateDisplay'],
  },
}

export const COMPONENT_CATEGORY_LIST = Object.values(COMPONENT_CATEGORIES)
