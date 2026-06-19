import { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'

/**
 * @param {{ accept?: string, multiple?: boolean, onFiles: (files: File[]) => void, label?: string }} props
 */
export function FileDropzone({ accept, multiple = false, onFiles, label = 'Drag & drop files here, or click to browse' }) {
  const [dragOver, setDragOver] = useState(false)

  const handleFiles = useCallback(
    (fileList) => {
      if (!fileList?.length) return
      onFiles(Array.from(fileList))
    },
    [onFiles],
  )

  return (
    <Box
      component="label"
      onDragOver={(e) => {
        e.preventDefault()
        setDragOver(true)
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragOver(false)
        handleFiles(e.dataTransfer.files)
      }}
      sx={{
        display: 'grid',
        placeItems: 'center',
        gap: 1,
        p: 3,
        border: '2px dashed',
        borderColor: dragOver ? 'primary.main' : 'divider',
        borderRadius: 2,
        bgcolor: dragOver ? 'action.hover' : 'background.paper',
        cursor: 'pointer',
        textAlign: 'center',
      }}
    >
      <input
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <CloudUploadOutlinedIcon color="action" />
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
    </Box>
  )
}
