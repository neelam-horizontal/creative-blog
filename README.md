This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


<!-- Commands -->

npm run slicemachine
npm run dev

<!-- links -->
https://docs.pmnd.rs/react-three-fiber/getting-started/introduction
https://github.com/pmndrs/drei#readme
https://threejs.org/docs/#api/en/geometries/TorusKnotGeometry
http://localhost:9999/slices/.--src--slices/Hero/default/simulator

Add slices and fileds here: (slicemachine)
http://localhost:9999/

Add data here:
https://creative-blog.prismic.io/documents/working?l=en-us

Added settings in here:
https://creative-blog.prismic.io/builder/pages/new?fallback=YiUzRHdvcmtpbmclMjZjJTNEdW5jbGFzc2lmaWVkJTI2bCUzRGVuLXVz&custom_type=settings&locale=en-us



<!-- slicemachine -->
1. Page types ->
* To create data source and pages for the website
* create button => Create a new page type
                    - Reusable type [e.g. product, landing page, blog post]
                    - Single type [e.g. home, privacy policy, sign up]
                -> Page type Name
                -> After creating page
                    - Add Slice = component
                    - Add Field = field

=> After adding all new changes -> click Review changes -> push

2. Custom types => Create a new custom type
                    - Reusable type [e.g. product, landing page, blog post]
                    - Single type [e.g. home, privacy policy, sign up]
                -> Page type Name [ex: Settings]


3. Nav links
- Navbar.tsx file contains code - PrismicNextLink
- https://creative-blog.prismic.io/documents/working?l=en-us -> Settings -> https://creative-blog.prismic.io/builder/pages/Zlgn9hEAACQAefmW?fallback=YiUzRHdvcmtpbmclMjZjJTNEcHVibGlzaGVkJTI2bCUzRGVuLXVz&s=published   -> Link to prismic page  -> Select slice -> Add label -> Save and publish


4. Create new page:
localhost:9999/page-types/page -> <> page snippet -> Copy code ===
=== src/app/[uid] -> page.tsx -> paste code


5. For description in About page added -> npm install -D @tailwindcss/typography