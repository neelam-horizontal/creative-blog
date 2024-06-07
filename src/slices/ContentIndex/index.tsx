import React, { useRef, useState, useEffect } from "react";
import Bounded from "@/components/Bounded";
import { isFilled } from "@prismicio/client";
import { PrismicRichText } from "@prismicio/react";
import { Content } from "@prismicio/client";

import Heading from "@/components/Heading";

import ContentList from "./ContentList";
import { createClient } from "@/prismicio";

/**
 * Props for `ContentIndex`.
 */
export type ContentIndexProps = SliceComponentProps<Content.ContentIndexSlice>;

/**
 * Component for "ContentIndex" Slices.
 */
const ContentIndex = async ({
  slice,
}: ContentIndexProps): Promise<JSX.Element> => {
  const client = createClient();
  const blogPosts = await client.getAllByType("blog_post");
  const projects = await client.getAllByType("project");

  const contentType = slice.primary.content_type || "Blog";
  // if (!contentType) return null;   -> added => || 'Blog'

  const items = contentType === "Blog" ? blogPosts : projects;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Heading>{slice.primary.heading}</Heading>
      {isFilled.richText(slice.primary.description) && (
        <div className="prose prose-xl prose-invert mb-10">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <ContentList
        items={items}
        contentType={contentType}
        viewMoreText={slice.primary.view_more_text}
        fallbackItemImage={slice.primary.fallback_item_image}
      />
    </Bounded>
  );
};

export default ContentIndex;

// "use client";

// import React, { useRef, useState, useEffect } from "react";
// import { asImageSrc, isFilled } from "@prismicio/client";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { MdArrowOutward } from "react-icons/md";
// import { Content } from "@prismicio/client";

// gsap.registerPlugin(ScrollTrigger);

// type ContentListProps = {
//   items: Content.BlogPostDocument[] | Content.ProjectDocument[];
//   contentType: Content.BlogPostIndexSlice["primary"]["content_type"];
//   fallbackItemImage: Content.BlogPostIndexSlice["primary"]["fallback_item_image"];
//   viewMoreText: Content.BlogPostIndexSlice["primary"]["view_more_text"];
// };

// export default function ContentList({
//   items,
//   contentType,
//   fallbackItemImage,
//   viewMoreText = "Read More",
// }: ContentListProps) {
//   const component = useRef(null);
//   const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

//   const revealRef = useRef(null);
//   const [currentItem, setCurrentItem] = useState<null | number>(null);
//   const [hovering, setHovering] = useState(false);
//   const lastMousePos = useRef({ x: 0, y: 0 });

//   const urlPrefix = contentType === "Blogs" ? "/blog" : "/project";

//   useEffect(() => {
//     // Animate list-items in with a stagger
//     let ctx = gsap.context(() => {
//       itemsRef.current.forEach((item, index) => {
//         gsap.fromTo(
//           item,
//           {
//             opacity: 0,
//             y: 20,
//           },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 1.3,
//             ease: "elastic.out(1,0.3)",
//             stagger: 0.2,
//             scrollTrigger: {
//               trigger: item,
//               start: "top bottom-=100px",
//               end: "bottom center",
//               toggleActions: "play none none none",
//             },
//           }
//         );
//       });

//       return () => ctx.revert(); // cleanup!
//     }, component);
//   }, []);

//   useEffect(() => {
//     // Mouse move event listener
//     const handleMouseMove = (e: MouseEvent) => {
//       const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
//       // Calculate speed and direction
//       const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

//       let ctx = gsap.context(() => {
//         // Animate the image holder
//         if (currentItem !== null) {
//           const maxY = window.scrollY + window.innerHeight - 350;
//           const maxX = window.innerWidth - 250;

//           gsap.to(revealRef.current, {
//             x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
//             y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
//             rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1), // Apply rotation based on speed and direction
//             ease: "back.out(2)",
//             duration: 1.3,
//           });
//           gsap.to(revealRef.current, {
//             opacity: hovering ? 1 : 0,
//             visibility: "visible",
//             ease: "power3.out",
//             duration: 0.4,
//           });
//         }
//         lastMousePos.current = mousePos;
//         return () => ctx.revert(); // cleanup!
//       }, component);
//     };

//     window.addEventListener("mousemove", handleMouseMove);

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, [hovering, currentItem]);

//   const onMouseEnter = (index: number) => {
//     setCurrentItem(index);
//     if (!hovering) setHovering(true);
//   };

//   const onMouseLeave = () => {
//     setHovering(false);
//     setCurrentItem(null);
//   };

//   const contentImages = items.map((item) => {
//     const image = isFilled.image(item.data.image)
//       ? item.data.image
//       : fallbackItemImage;
//     return asImageSrc(image, {
//       fit: "crop",
//       w: 220,
//       h: 320,
//       exp: -10,
//     });
//   });

//   // Preload images
//   useEffect(() => {
//     contentImages.forEach((url) => {
//       if (!url) return;
//       const img = new Image();
//       img.src = url;
//     });
//   }, [contentImages]);

//   return (
//     <>
//       <ul
//         ref={component}
//         className="grid border-b border-b-slate-100"
//         onMouseLeave={onMouseLeave}
//       >
//         {items.map((post, index) => (
//           <li
//             key={index}
//             ref={(el) => (itemsRef.current[index] = el)}
//             onMouseEnter={() => onMouseEnter(index)}
//             className="list-item opacity-0"
//           >
//             <a
//               href={`${urlPrefix}/${post.uid}`}
//               className="flex flex-col justify-between border-t border-t-slate-100 py-10  text-slate-200 md:flex-row "
//               aria-label={post.data.title || ""}
//             >
//               <div className="flex flex-col">
//                 <span className="text-3xl font-bold">{post.data.title}</span>
//                 <div className="flex gap-3 text-yellow-400">
//                   {post.tags.map((tag, index) => (
//                     <span key={index} className="text-lg font-bold">
//                       {tag}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//               <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
//                 {viewMoreText} <MdArrowOutward />
//               </span>
//             </a>
//           </li>
//         ))}

//         {/* Hover element */}
//         <div
//           className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
//           style={{
//             backgroundImage:
//               currentItem !== null ? `url(${contentImages[currentItem]})` : "",
//           }}
//           ref={revealRef}
//         ></div>
//       </ul>
//     </>
//   );
// }
