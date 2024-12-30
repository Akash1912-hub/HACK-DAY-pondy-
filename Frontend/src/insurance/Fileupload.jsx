import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle } from 'lucide-react'

export default function FileUpload({ documents, setDocuments }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setDocuments([...documents, ...acceptedFiles])
    }
  })

  return (
    <div>
      <motion.div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />
        <motion.div
          animate={{ 
            y: isDragActive ? -10 : 0,
            scale: isDragActive ? 1.1 : 1
          }}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          {isDragActive ? (
            <p className="text-indigo-600">Drop the files here...</p>
          ) : (
            <p className="text-gray-600">Drag & drop files here, or click to select files</p>
          )}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {documents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <h3 className="font-medium mb-2">Selected Files:</h3>
            <ul className="space-y-2">
              {documents.map((file, index) => (
                <motion.li
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center text-sm text-gray-600"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {file.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}