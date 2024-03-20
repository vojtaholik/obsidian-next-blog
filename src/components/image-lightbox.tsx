'use client'

import Image from 'next/image'
import React from 'react'
import Lightbox from 'yet-another-react-lightbox'

export const ImageLightbox: React.FC<{
  image: string
  images?: (string | undefined)[]
}> = ({ image, images }) => {
  const [open, setOpen] = React.useState(false)

  const slides = images?.map((image) => ({
    src: image as string,
    width: 800,
    height: 600,
  }))

  return (
    <>
      <Image
        width={800}
        height={600}
        // width={width}
        // height={height}
        src={image}
        quality={100}
        onClick={() => {
          setOpen(true)
        }}
        className="cursor-zoom-in"
        alt=""
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        render={{ slide: Slide }}
      />
    </>
  )
}

const Slide: React.FC<any> = ({ slide, rect, setOpen }) => {
  return (
    <div>
      <Image alt="" src={slide} />
    </div>
  )
}