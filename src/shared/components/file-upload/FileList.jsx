import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'

/**
 * @param {{ files: { id: string, name: string, size?: number }[], onRemove?: (id: string) => void }} props
 */
export function FileList({ files, onRemove }) {
  if (!files.length) return null

  return (
    <List dense disablePadding sx={{ mt: 1 }}>
      {files.map((file) => (
        <ListItem
          key={file.id}
          secondaryAction={
            onRemove ? (
              <IconButton edge="end" aria-label={`Remove ${file.name}`} onClick={() => onRemove(file.id)} size="small">
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            ) : null
          }
        >
          <ListItemText
            primary={file.name}
            secondary={file.size != null ? `${(file.size / 1024).toFixed(1)} KB` : undefined}
          />
        </ListItem>
      ))}
    </List>
  )
}
