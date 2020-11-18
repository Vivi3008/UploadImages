import * as multer  from 'multer'
import path from 'path'

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: multer.diskStorage({
     destination: (req, file, cb) => {
         cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
     },
     filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null, fileName)
    }
  }),
  limits: {
      fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: any, file: any, cb: any) => {
    const alowedMimes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/gif'
    ]

    if(alowedMimes.includes(file.mimetype)){
        cb(null, true)
    } else {
        cb(new Error("Invalid file type!"))
    }
  }
}