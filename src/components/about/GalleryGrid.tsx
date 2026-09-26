// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { X, ChevronLeft, ChevronRight } from 'lucide-react'
// import { Container } from '@/components/ui/Container'
// import { SectionTitle } from '@/components/ui/SectionTitle'
// import { GALLERY_IMAGES } from '@/data/gallery'
// import { cn } from '@/utils/cn'

// export function GalleryGrid() {
//   const [selected, setSelected] = useState<number | null>(null)

//   function handlePrev() {
//     setSelected((prev) => prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null)
//   }

//   function handleNext() {
//     setSelected((prev) => prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null)
//   }

//   return (
//     <section className="py-section">
//       <Container>
//         <SectionTitle
//           subtitle="Gallery"
//           title="A Visual Journey"
//           description="Glimpses of our world — from the loom to the showroom."
//         />

//         <div className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4">
//           {GALLERY_IMAGES.map((image, index) => (
//             <motion.button
//               key={image.id}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.05 }}
//               onClick={() => setSelected(index)}
//               className="group relative mb-3 w-full overflow-hidden rounded-lg bg-gradient-to-br from-primary/5 to-accent/5"
//               style={{ aspectRatio: `${image.width}/${image.height}` }}
//               aria-label={`View ${image.alt}`}
//             >
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <p className="font-body text-xs text-white/30 text-center px-2">{image.alt}</p>
//               </div>
//               <div className="absolute inset-0 bg-night/0 transition-colors duration-300 group-hover:bg-night/20" />
//             </motion.button>
//           ))}
//         </div>
//       </Container>

//       <AnimatePresence>
//         {selected !== null && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[9999] flex items-center justify-center bg-night/95 backdrop-blur-xl"
//             role="dialog"
//             aria-modal="true"
//             aria-label="Image gallery viewer"
//           >
//             <button
//               onClick={() => setSelected(null)}
//               className="absolute right-6 top-6 z-10 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
//               aria-label="Close gallery"
//             >
//               <X className="size-5" />
//             </button>

//             <button
//               onClick={handlePrev}
//               className="absolute left-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
//               aria-label="Previous image"
//             >
//               <ChevronLeft className="size-6" />
//             </button>

//             <motion.div
//               key={selected}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.3 }}
//               className="flex max-h-[80vh] max-w-[90vw] items-center justify-center"
//             >
//               <div
//                 className="w-full max-w-2xl rounded-lg bg-gradient-to-br from-primary/10 to-accent/10"
//                 style={{ aspectRatio: `${GALLERY_IMAGES[selected].width}/${GALLERY_IMAGES[selected].height}` }}
//               >
//                 <div className="flex h-full items-center justify-center">
//                   <p className="font-heading text-white/30 text-center px-4">{GALLERY_IMAGES[selected].alt}</p>
//                 </div>
//               </div>
//             </motion.div>

//             <button
//               onClick={handleNext}
//               className="absolute right-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
//               aria-label="Next image"
//             >
//               <ChevronRight className="size-6" />
//             </button>

//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
//               <p className="font-body text-sm text-white/50">
//                 {selected + 1} / {GALLERY_IMAGES.length}
//               </p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   )
// }

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { SectionTitle } from '@/components/ui/SectionTitle'
import { GALLERY_IMAGES } from '@/data/gallery'

export function GalleryGrid() {
  const [selected, setSelected] = useState<number | null>(null)

  function handlePrev() {
    setSelected((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : null
    )
  }

  function handleNext() {
    setSelected((prev) =>
      prev !== null
        ? (prev + 1) % GALLERY_IMAGES.length
        : null
    )
  }

  return (
    <section className="py-section">
      <Container>
        <SectionTitle
          subtitle="Gallery"
          title="A Visual Journey"
          description="Glimpses of our world — from the loom to the showroom."
        />

        {/* Gallery Grid */}
        <div className="mt-10 columns-2 gap-3 md:columns-3 lg:columns-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.button
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              onClick={() => setSelected(index)}
              className="group relative mb-3 block w-full overflow-hidden rounded-lg bg-gray-100"
              style={{
                aspectRatio: `${image.width}/${image.height}`,
              }}
              aria-label={`View ${image.alt}`}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />

              {/* Image Title */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
                <p className="font-body text-xs text-white">
                  {image.alt}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </Container>

      {/* Fullscreen Gallery */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-night/95 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery viewer"
          >
            {/* Close */}
            <button
              onClick={() => setSelected(null)}
              className="absolute right-6 top-6 z-20 flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
              aria-label="Close gallery"
            >
              <X className="size-5" />
            </button>

            {/* Previous */}
            <button
              onClick={handlePrev}
              className="absolute left-4 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Selected Image */}
            <motion.div
              key={selected}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={{
                duration: 0.3,
              }}
              className="relative max-h-[85vh] max-w-[85vw]"
            >
              <img
                src={GALLERY_IMAGES[selected].src}
                alt={GALLERY_IMAGES[selected].alt}
                className="max-h-[85vh] max-w-[85vw] rounded-lg object-contain shadow-2xl"
              />

              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-gradient-to-t from-black/70 to-transparent px-6 pb-5 pt-12">
                <p className="font-heading text-center text-sm text-white">
                  {GALLERY_IMAGES[selected].alt}
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-4 z-20 flex size-12 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Next image"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <p className="font-body text-sm text-white/50">
                {selected + 1} / {GALLERY_IMAGES.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}