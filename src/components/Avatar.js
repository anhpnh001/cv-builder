import { memo, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { BsCheckLg, BsCloudUpload } from 'react-icons/bs'
import { IoCrop, IoImageOutline } from 'react-icons/io5'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from '../contexts/ResumeContext'
import Popup from './Popup'

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
  const [showPopup, setShowPopup] = useState(false)
  const [src, setSrc] = useState('')

  const onUpdate = (croppedImageUrl) => {
    dispatch({
      type: 'on_change',
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
    setShowPopup(false)
  }

  const handleCancelButton = () => {
    setShowImageCropDialog(false)
  }

  return (
    <div style={style} className={className}>
      <Popup show={showPopup} onShowPopup={setShowPopup}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-8 bg-white rounded-lg space-y-4">
          {/* <div className="flex rounded-lg overflow-hidden">
              <input
                placeholder="Enter image link..."
                className="w-full outline-none bg-slate-100 h-10 px-4 text-sm"
              />
              <button className="h-10 bg-slate-200 text-sm px-4">
                <BsCheckLg size={14} className="text-blue-500" />
              </button>
            </div> */}

          <div className="border-2 border-dashed border-slate-200 rounded-lg w-96">
            <div {...getRootProps()} className="">
              <div className="flex flex-col gap-4 items-center justify-center cursor-pointer py-4">
                <IoImageOutline size={40} className="text-blue-500" />
                <p className="text-sm font-semibold text-blue-900">
                  Drop your image here, or{' '}
                  <span className="text-blue-500">browse</span>
                </p>
              </div>
              <form ref={avatarRef}>
                <input {...getInputProps()} />
              </form>
            </div>
            {showImageCropDialog ? (
              <div className="px-4 pb-4 flex gap-4 flex-col items-center max-h-96">
                <div className="overflow-y-auto scrollbar-none">
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onImageLoaded={onImageLoaded}
                    onComplete={onCropComplete}
                    onChange={(newCrop) => setCrop(newCrop)}
                  />
                </div>
                <button
                  onClick={handleCropButton}
                  className="flex-none bg-blue-100 h-10 w-full rounded-lg font-semibold text-blue-600 text-sm"
                >
                  Save
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </Popup>
      {/* {showImageCropDialog && (
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
      )} */}
      <div
        className="group aspect-square aspect-h-1 relative w-full h-full"
        onClick={() => setShowPopup(true)}
      >
        <div className="z-10 group-hover:opacity-100 opacity-0 cursor-pointer absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 flex justify-center items-center transition">
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
