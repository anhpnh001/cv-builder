import { memo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BsCloudUpload } from 'react-icons/bs'
import { IoCrop } from 'react-icons/io5'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from '../contexts/ResumeContext'

function Avatar({ path, style, className }) {
  const avatarRef = useRef()
  const imageRef = useRef()
  const dispatch = useDispatch()
  const stateValue = useSelector(path)
  const [crop, setCrop] = useState({
    aspect: 1 / 1,
    unit: '%',
    width: 100,
  })
  const [croppedImageUrl, setCroppedImageUrl] = useState(
    `https://avatars.dicebear.com/api/micah/${Math.random()}.svg`
  )
  const [showImageCropDialog, setShowImageCropDialog] = useState(false)
  const [src, setSrc] = useState('')

  const onUpdate = (croppedImageUrl) => {
    dispatch({
      type: 'on_input',
      payload: {
        path,
        value: croppedImageUrl,
      },
    })
  }

  const onImageLoaded = (image) => {
    imageRef.current = image
  }

  const onCropComplete = (crop) => {}

  const makeClientCrop = async (crop) => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imageRef.current,
        crop,
        'newFile.jpeg'
      )
      setCroppedImageUrl(croppedImageUrl)
      onUpdate(croppedImageUrl)
    }
  }

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas')
    const pixelRatio = window.devicePixelRatio
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.imageSmoothingQuality = 'high'

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            //reject(new Error('Canvas is empty'));
            console.error('Canvas is empty')
            return
          }
          blob.name = fileName
          const reader = new FileReader()
          reader.onload = (event) => {
            resolve(event.target.result)
          }
          reader.readAsDataURL(blob)
        },
        'image/jpeg',
        1
      )
    })
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    multiple: false,
    onDrop: (acceptedFiles) => {
      avatarRef.current.reset()
      const reader = new FileReader()
      reader.onload = (event) => {
        setSrc(event.target.result)
        setShowImageCropDialog(true)
      }
      reader.readAsDataURL(acceptedFiles[0])
    },
  })

  const handleCropButton = () => {
    makeClientCrop(crop)
    setShowImageCropDialog(false)
  }

  const handleCancelButton = () => {
    setShowImageCropDialog(false)
  }
  return (
    <div style={style} className={className}>
      {showImageCropDialog && (
        <>
          <section
            onClick={handleCancelButton}
            className="cursor-pointer bg-black bg-opacity-80 flex justify-center items-center w-screen h-screen z-40 fixed top-0 left-0"
          ></section>
          <section className="z-50 flex flex-col px-6 py-8 space-y-6 rounded-3xl overflow-hidden border bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
            <div className="flex justify-center items-center space-x-2">
              <IoCrop size="32" className="text-blue-600" />
              <p className="text-center text-xl font-medium">Crop Image</p>
            </div>
            <div className="w-96 max-h-96 overflow-auto scrollbar-none">
              <ReactCrop
                src={src}
                crop={crop}
                ruleOfThirds
                onImageLoaded={onImageLoaded}
                onComplete={onCropComplete}
                onChange={(newCrop) => setCrop(newCrop)}
              />
            </div>
            <div className="space-x-4 flex justify-end">
              <button
                onClick={handleCancelButton}
                className="h-10 px-8 rounded-full text-blue-600 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCropButton}
                className="bg-blue-100 h-10 px-10 rounded-xl text-blue-600 font-medium"
              >
                Save
              </button>
            </div>
          </section>
        </>
      )}
      <div
        className="group aspect-w-1 aspect-h-1 relative w-full h-full"
        {...getRootProps()}
      >
        <form ref={avatarRef}>
          <input {...getInputProps()} />
        </form>
        <div
          className={`${
            isDragActive ? 'opacity-100' : 'opacity-0'
          } z-10 group-hover:opacity-100 cursor-pointer absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center transition`}
        >
          <BsCloudUpload className="text-5xl text-white" />
        </div>
        <img
          src={stateValue || croppedImageUrl}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default memo(Avatar)
