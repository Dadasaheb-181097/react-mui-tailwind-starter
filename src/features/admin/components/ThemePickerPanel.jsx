import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import {
  CheckRounded as CheckRoundedIcon,
  DarkModeOutlined as DarkModeOutlinedIcon,
  LightModeOutlined as LightModeOutlinedIcon,
} from '@mui/icons-material'
import { useAdminAppearance } from '@/context/AdminAppearanceContext'

/** Shared appearance controls — used inside Navbar popover & Sidebar panel */
export function ThemePickerPanel({ dense = false }) {
  const { mode, presetId, presets, setMode, setPresetId } = useAdminAppearance()

  const gap = dense ? 1 : 1.5
  const swatchSize = dense ? 26 : 30

  return (
    <Box sx={{ p: dense ? 1.25 : 2, width: dense ? 'auto' : 320, maxWidth: '92vw' }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '0.08em', display: 'block', mb: 1 }}>
        Appearance
      </Typography>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.75 }}>
        Mode
      </Typography>
      <ToggleButtonGroup
        exclusive
        fullWidth={!dense}
        size="small"
        value={mode}
        onChange={(_, v) => v && setMode(v)}
        sx={{ mb: dense ? 1.5 : 2 }}
      >
        <ToggleButton value="light" aria-label="Light mode">
          <LightModeOutlinedIcon sx={{ mr: 0.75, fontSize: 18 }} />
          Light
        </ToggleButton>
        <ToggleButton value="dark" aria-label="Dark mode">
          <DarkModeOutlinedIcon sx={{ mr: 0.75, fontSize: 18 }} />
          Dark
        </ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
        Color themes
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: dense ? 'repeat(4, minmax(0, 1fr))' : 'repeat(4, 1fr)',
          gap,
        }}
      >
        {presets.map((p) => {
          const selected = presetId === p.id
          return (
            <Box key={p.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.25 }}>
              <Box
                component="button"
                type="button"
                onClick={() => setPresetId(p.id)}
                aria-label={`Use ${p.label} theme`}
                aria-pressed={selected}
                sx={{
                  position: 'relative',
                  width: dense ? 40 : 44,
                  height: dense ? 40 : 44,
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: selected ? 'primary.main' : 'divider',
                  bgcolor: 'background.paper',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'transform 120ms ease, border-color 120ms ease',
                  '&:hover': { transform: 'scale(1.04)' },
                }}
              >
                <Box
                  sx={{
                    width: swatchSize,
                    height: swatchSize,
                    borderRadius: '50%',
                    bgcolor: p.swatch,
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                  }}
                />
                {selected ? (
                  <CheckRoundedIcon
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      fontSize: 16,
                      color: 'primary.main',
                      bgcolor: 'background.paper',
                      borderRadius: '50%',
                    }}
                  />
                ) : null}
              </Box>
              {!dense ? (
                <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'center', lineHeight: 1.2, maxWidth: 72 }}>
                  {p.label}
                </Typography>
              ) : null}
            </Box>
          )
        })}
      </Box>
      {!dense ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1.5, lineHeight: 1.45 }}>
          Palettes tune accents, charts, and badges together — stored on this device.
        </Typography>
      ) : null}
    </Box>
  )
}

