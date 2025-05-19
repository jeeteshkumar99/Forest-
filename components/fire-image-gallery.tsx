"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Sample fire images
const fireImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600&text=Forest+Fire+Image+1",
    alt: "Forest fire in Northern California",
    caption: "Active wildfire in Northern California forest region",
    date: "July 15, 2023",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600&text=Forest+Fire+Image+2",
    alt: "Aerial view of forest fire",
    caption: "Aerial view of spreading wildfire in mountainous terrain",
    date: "July 14, 2023",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600&text=Forest+Fire+Image+3",
    alt: "Fire damage assessment",
    caption: "Post-fire damage assessment in Southern Oregon",
    date: "July 10, 2023",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600&text=Forest+Fire+Image+4",
    alt: "Firefighters battling forest fire",
    caption: "Emergency response teams working to contain wildfire",
    date: "July 8, 2023",
  },
]

export function FireImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedImage, setSelectedImage] = useState<(typeof fireImages)[0] | null>(null)

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % fireImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + fireImages.length) % fireImages.length)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fire Imagery</CardTitle>
        <CardDescription>Recent fire documentation and aerial photography</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="relative h-[250px] overflow-hidden rounded-md">
            <img
              src={fireImages[currentIndex].src || "/placeholder.svg"}
              alt={fireImages[currentIndex].alt}
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-sm font-medium text-white">{fireImages[currentIndex].caption}</p>
              <p className="text-xs text-white/80">{fireImages[currentIndex].date}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setSelectedImage(fireImages[currentIndex])}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{selectedImage?.caption}</DialogTitle>
                  <DialogDescription>{selectedImage?.date}</DialogDescription>
                </DialogHeader>
                <div className="overflow-hidden rounded-md">
                  <img
                    src={selectedImage?.src || "/placeholder.svg"}
                    alt={selectedImage?.alt}
                    className="h-full w-full object-contain"
                  />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="absolute left-0 right-0 top-1/2 flex -translate-y-1/2 justify-between px-2">
            <Button variant="secondary" size="icon" onClick={prevImage}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="secondary" size="icon" onClick={nextImage}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {fireImages.map((image, index) => (
            <button
              key={image.id}
              className={`flex-shrink-0 overflow-hidden rounded-md border-2 ${
                index === currentIndex ? "border-orange-500" : "border-transparent"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image.src || "/placeholder.svg"} alt={image.alt} className="h-16 w-24 object-cover" />
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
