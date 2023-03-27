import { ConfigOptions, v2 as cloudinary } from 'cloudinary'

class Cloudinary {
  config: ConfigOptions

  // static imageUploader: (imageName: string) => Promise<UploadApiResponse>

  constructor() {
    this.config = {
      cloud_name: 'butterfly-project',
      api_key: '276225481278987',
      api_secret: 'QP9VQR7Oz09FPNP9PqgOVxWeNPc',
    }

    cloudinary.config(this.config)
  }

  static async imageUploader(fileSting: string, name: string) {
    const res = cloudinary.uploader.upload(fileSting, {
      public_id: name,
      // type: '.jpeg',
    })

    return res.then(data => {
      console.log(data)
      console.log(data.secure_url)

      return data
    })
  }
}

export default Cloudinary
