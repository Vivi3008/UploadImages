import * as multer  from 'multer'
import path from 'path'
import multers3 from 'multer-s3'
import aws from 'aws-sdk'


const storageTypes = {
    local: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'))
        },
        filename: (req: Express.Request, file: any, cb) => {
           file.key = `${Date.now()}-${file.originalname}`
           cb(null, file.key)
       }
    }),
    s3: multers3({
       s3: new aws.S3(), 
       bucket: 'uploadexample2',
       contentType: multers3.AUTO_CONTENT_TYPE,
       acl: 'public-read',
       key: (req, file, cb) =>{
            const fileName = `${Date.now()}-${file.originalname}`
            cb(null, fileName)
       }
    })
}

export default {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes['local'],
  limits: {
      fileSize: 2 * 1024 * 1024,
  },
  fileFilter: (req: Express.Request, file: Express.Multer.File, cb: any) => {
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