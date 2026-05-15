export type Metric = {
  label: string
  value: string
}

export type Accomplishment = {
  title: string
  desc: string
}

export type Review = {
  id: number
  name: string
  position: string
  image: string
  testimonial: string
}

export type CaseStudyData = {
  slug: string
  accentColor: string
  accentColorRgb: string
  accentGradient?: string
  
  hero: {
    logo: string
    logoAlt: string
    tags: string[]
    title: string // Using \n for line breaks
    metrics: Metric[]
    websiteUrl: string
    sliderImages: string[]
  }
  
  background: {
    introText: string
    backgroundParagraphs: string[]
    challengeParagraphs: string[]
    whatWeDidItems: string[]
    galleryImages: string[]
    galleryImageFit?: 'cover' | 'contain'
    galleryImagePosition?: 'left' | 'center' | 'right'
    galleryBgColor?: string // If present, wraps the image in a colored padded div
  }
  
  solution: {
    introParagraphs: string[]
    resultsParagraphs: string[]
    accomplishments: Accomplishment[]
    bannerImage: string
    bannerVideo?: string
  }
  
  reviews: {
    title: string // Using \n for line breaks
    subtitle: string
    reviewsList: Review[]
  }
}

export const caseStudiesData: Record<string, CaseStudyData> = {
  'fountain-hills': {
    slug: 'fountain-hills',
    accentColor: '#BF212F',
    accentColorRgb: '191 33 47',
    hero: {
      logo: '/bmyb-case-fountain-hills-fh-emergencyroom-logo-erclinic-1-2-02.svg',
      logoAlt: 'Fountain Hills Logo',
      tags: ['Healthcare', 'UI/UX', 'Development', 'SEO', 'SMM'],
      title: 'Building a Patient-First Digital\nExperience for 24/7 Emergency Care',
      metrics: [
        { label: 'Care Availability', value: '24/7 ER' },
        { label: 'Key Pages Delivered', value: '15+ Pages' },
        { label: 'Industry', value: 'Healthcare / ER' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-fountain-hills-about-fountain-hills-medical-center-01.webp',
        '/bmyb-case-fountain-hills-emergency-room-01.webp',
        '/bmyb-case-fountain-hills-home-01.webp',
        '/bmyb-case-fountain-hills-primary-care-clinic-01.svg',
        '/bmyb-case-fountain-hills-meet-our-physicians-01.svg',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Fountain Hills Emergency Room and Medical Center to design and develop a modern healthcare website that improves patient trust, simplifies access to care, and clearly communicates 24/7 emergency services across all devices.',
      backgroundParagraphs: [
        'Fountain Hills Emergency Room and Medical Center serves the local community with 24/7 emergency care, in-house diagnostics, and patient-focused medical services. As a healthcare provider operating in urgent, high-stress situations, their website needed to deliver information clearly, quickly, and with immediate credibility.',
        'The team required a modern, responsive platform that could communicate emergency availability, explain services without confusion, and guide patients to critical actions—such as calling, getting directions, or accessing billing and patient resources—without delay.'
      ],
      challengeParagraphs: [
        'Fountain Hills Emergency Room and Medical Center operates in a high-stakes healthcare environment where patients need clear information quickly and without confusion. Their digital presence needed to communicate 24/7 emergency availability, medical credibility, and service coverage—all while remaining calm, trustworthy, and easy to navigate.',
        'Explaining advanced capabilities such as on-site imaging, laboratory services, and emergency care in a simple, non-overwhelming way was critical. At the same time, the website had to guide users toward immediate actions like calling the ER, getting directions, booking appointments, or accessing patient resources—especially during urgent moments.',
        'In short, the challenge was to transform complex healthcare information into a clear, patient-first digital experience that builds trust instantly, reduces stress, and supports fast, confident decision-making across all devices.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-fountain-hills-gallery-new-01.webp',
        '/bmyb-case-fountain-hills-gallery-new-02.webp',
        '/bmyb-case-fountain-hills-gallery-new-03.webp',
      ],
      galleryImageFit: 'contain',
      galleryImagePosition: 'center',
      galleryBgColor: '#BF212F'
    },
    solution: {
      introParagraphs: [
        'Understanding the urgent nature of emergency healthcare and the need for clear, patient-focused communication, we delivered a comprehensive digital solution tailored to Fountain Hills Emergency Room and Medical Center.',
        'BMYBrand led the full website design and development process, creating a clean, responsive experience built around trust, fast access, and clarity. Through a structured content approach, clear visual hierarchy, and conversion-focused CTAs, the website now communicates 24/7 emergency care, medical services, diagnostics, and patient resources in a way that is easy to understand and navigate—even in high-stress moments.'
      ],
      resultsParagraphs: [
        'The redesigned website successfully met its primary goal: providing patients and families with a clear, trustworthy digital experience that supports quick decision-making. Critical information is now easier to find, services are clearly explained, and users are guided smoothly toward essential actions like calling the ER, getting directions, booking appointments, or accessing billing and patient portals.',
        'As a result, the site improved accessibility, user confidence, and patient-first care delivery—all achieved on-site—strengthening confidence before patients even arrive at the facility.'
      ],
      accomplishments: [
        { title: 'Clear emergency positioning', desc: 'The website clearly communicates 24/7 emergency availability and service coverage without confusion.' },
        { title: 'Stronger trust and credibility', desc: 'Board-certified care, diagnostics, and patient resources are presented clearly to build confidence immediately.' },
        { title: 'Simplified patient experience', desc: 'Easy access to contact details, directions, billing information, and patient portals reduces stress and friction.' },
        { title: 'Modern, responsive platform', desc: 'A mobile-first, accessible website experience designed to perform across all devices and support the local community.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp',
      bannerVideo: '/FHMC_2.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM\nFHMCAZ TEAM',
      subtitle: 'We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here\'s their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Jonathan Reed', position: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the urgency around patient confidence, and delivered a site that truly supports our community.' },
        { id: 2, name: 'Sarah Mitchell', position: 'Medical Director', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'BMYBrand exceeded our expectations in every way. They took the time to understand our unique needs as an emergency care facility and delivered a website that not only looks professional but functions flawlessly. Our patients can now find critical information quickly and easily.' },
        { id: 3, name: 'Michael Chen', position: 'Operations Manager', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The transformation of our digital presence has been remarkable. BMYBrand created a patient-first experience that aligns perfectly with our mission. The feedback from our community has been overwhelmingly positive, and we\'ve seen a significant increase in online engagement.' }
      ]
    }
  },

  'jiggy-jerky': {
    slug: 'jiggy-jerky',
    accentColor: '#EB9B0E',
    accentColorRgb: '235 155 14',
    hero: {
      logo: '/bmyb-case-jiggy-jerky-jiggylogo-01.svg',
      logoAlt: 'Jiggy Jerky Logo',
      tags: ['Food', 'UI/UX', 'Development'],
      title: 'Building a Bold Digital Experience\nfor Artisan Jerky Lovers',
      metrics: [
        { label: 'Product Focus', value: 'Direct-to-Consumer' },
        { label: 'Key Pages Delivered', value: '10+ Pages' },
        { label: 'Industry', value: 'Food' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-jiggy-jerky-slider-01.webp',
        '/bmyb-case-jiggy-jerky-slider-02.webp',
        '/bmyb-case-jiggy-jerky-slider-03.webp',
        '/bmyb-case-jiggy-jerky-slider-04.webp',
        '/bmyb-case-jiggy-jerky-slider-05.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Jiggy Jerky to design and develop a bold e-commerce experience that highlights its playful personality, sharp packaging, and crave-worthy flavors while keeping shopping friction low.',
      backgroundParagraphs: [
        'Jiggy Jerky is an artisan food brand built around bold flavor, memorable packaging, and a playful personality that stands out in a crowded market. The brand needed a digital presence that could translate that energy online and support direct-to-consumer sales.',
        'The experience had to feel premium, energetic, and easy to shop, with clear product storytelling and a structure that encourages customers to browse, trust the product, and buy quickly on any device.'
      ],
      challengeParagraphs: [
        'Jiggy Jerky needed a website that could capture its fun, bold personality while making it easy for customers to browse and purchase artisan jerky products online. The challenge was to balance strong visual branding with a shopping experience that stayed clear and conversion-focused.',
        'The site also needed to showcase product quality, flavor variety, and brand credibility without feeling cluttered or generic. Packaging, photography, and messaging all had to work together to drive appetite and action.',
        'In short, the challenge was to turn a distinctive physical product into a polished digital storefront that feels just as bold, memorable, and craveable as the jerky itself.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-jiggy-jerky-gallery-01.webp',
        '/bmyb-case-jiggy-jerky-gallery-02.webp',
        '/bmyb-case-jiggy-jerky-gallery-03.webp',
      ],
      galleryImageFit: 'contain',
      galleryImagePosition: 'center',
      galleryBgColor: '#EB9B0E'
    },
    solution: {
      introParagraphs: [
        'Understanding the need for a bold, flavor-forward experience, we delivered a comprehensive digital solution tailored to Jiggy Jerky’s unique brand energy.',
        'BMYBrand led the full website design and development process, creating a visually striking storefront built around product presentation, clear hierarchy, and conversion-focused CTAs. The new experience makes it easy for customers to explore flavors, understand the brand, and shop with confidence.'
      ],
      resultsParagraphs: [
        'The redesigned website gives Jiggy Jerky a stronger online presence that better reflects the quality and personality of the brand. Product discovery feels easier, the visual story is more compelling, and the shopping path is clearer.',
        'The result is a storefront that feels premium, fun, and ready to support direct-to-consumer growth.'
      ],
      accomplishments: [
        { title: 'Bold brand translation', desc: 'The playful packaging and flavor-first personality were translated into a digital experience that feels unmistakably Jiggy Jerky.' },
        { title: 'Cleaner shopping flow', desc: 'The user experience keeps product browsing and purchase paths simple, direct, and easy to follow.' },
        { title: 'Stronger product storytelling', desc: 'Flavor details, product imagery, and brand voice work together to increase appetite and trust.' },
        { title: 'Responsive storefront', desc: 'A mobile-friendly e-commerce platform built to look sharp and perform smoothly on every device.' }
      ],
      bannerImage: '/bmyb-case-jiggy-jerky-jiggybg-01.svg',
      bannerVideo: '/JIggy (1).mp4'
    },
    reviews: {
      title: 'REVIEWS FROM\nJIGGY JERKY TEAM',
      subtitle: 'We partnered closely with the Jiggy Jerky team to deliver a bold e-commerce experience. Here is their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Mark Vicary', position: 'Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'BMYBrand took our personality and turned it into a website that feels just as bold as the product. The layout makes it easy for customers to understand what Jiggy Jerky is about and move quickly toward buying.' },
        { id: 2, name: 'Operations Team', position: 'Fulfillment & Sales', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'The new site makes product discovery and shopping much smoother. It is easier to manage the customer journey, and the brand presentation feels far more polished and premium.' },
        { id: 3, name: 'Customer Feedback', position: 'Direct-to-Consumer Audience', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The site now feels like a real extension of the brand: fun, bold, and delicious-looking. It gives customers a better reason to stay, browse, and shop.' }
      ]
    }
  },
  'babas-burgers': {
    slug: 'babas-burgers',
    accentColor: '#C40913',
    accentColorRgb: '196 9 19',
    hero: {
      logo: '/bmyb-case-babas-burgers-logo-01.svg',
      logoAlt: "Baba's Burgers Logo",
      tags: ['Food', 'UI/UX', 'Development'],
      title: 'Building a High-Appetite Digital\nExperience for a Burger Brand',
      metrics: [
        { label: 'Ordering Focus', value: 'Direct Orders' },
        { label: 'Key Pages Delivered', value: '10+ Pages' },
        { label: 'Industry', value: 'Food' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-babas-burgers-slider-01.webp',
        '/bmyb-case-babas-burgers-slider-02.webp',
        '/bmyb-case-babas-burgers-slider-03.webp',
        '/bmyb-case-babas-burgers-slider-04.webp',
        '/bmyb-case-babas-burgers-slider-05.webp',
      ]
    },
    background: {
      introText: "BMYBrand partnered with Baba's Burgers to shape a bold digital experience that makes the food look irresistible, keeps browsing simple, and turns attention into orders across every device.",
      backgroundParagraphs: [
        "Baba's Burgers is a food brand built around craveable visuals, bold flavor, and a fast, satisfying customer experience. The website needed to reflect that same energy online while supporting smooth product browsing and order-ready navigation.",
        'The goal was to create a digital presence that feels rich, confident, and easy to use, giving the brand a strong visual identity while helping customers move quickly from discovery to action.'
      ],
      challengeParagraphs: [
        "Baba's Burgers needed a website that could make the brand feel as exciting online as it does in person. The challenge was to balance appetite-driven visuals with a clean structure that keeps menus, offers, and calls to action easy to understand.",
        'The experience also had to work across mobile and desktop without losing the punch of the brand. Product presentation, hierarchy, and flow all needed to support fast decisions and low-friction engagement.',
        'In short, the challenge was to create a food-focused digital experience that feels bold, modern, and conversion-ready without overwhelming the customer.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-babas-burgers-gallery-01.svg',
        '/bmyb-case-babas-burgers-gallery-02.svg',
        '/bmyb-case-babas-burgers-gallery-03.svg',
      ],
      galleryImageFit: 'contain',
      galleryImagePosition: 'center',
      galleryBgColor: '#C40913'
    },
    solution: {
      introParagraphs: [
        "With a clear focus on visual appetite, mobile usability, and conversion, we created a digital solution tailored to Baba's Burgers.",
        'BMYBrand handled the full UI/UX and development process, designing a high-impact experience with bold color, strong content hierarchy, and clear calls to action. The result is a food-brand website that feels fast, polished, and easy to engage with.'
      ],
      resultsParagraphs: [
        "The final experience gives Baba's Burgers a stronger online presence with clearer product storytelling and a more confident brand presentation. The visual system feels more memorable, and the journey from landing on the page to exploring the offer is much smoother.",
        'The result is a food-focused digital platform that supports growth, improves first impressions, and gives the brand a stronger foundation for campaigns, promotions, and future expansion.'
      ],
      accomplishments: [
        { title: 'Stronger appetite appeal', desc: 'The digital experience uses bold visuals and confident layout choices to make the food feel more desirable immediately.' },
        { title: 'Cleaner user journey', desc: 'Navigation and page structure were shaped to help users browse quickly and reach key actions without friction.' },
        { title: 'Brand-forward presentation', desc: 'Color, pacing, and interface details work together to give Baba’s Burgers a more memorable and ownable online identity.' },
        { title: 'Responsive execution', desc: 'The experience is built to stay sharp and usable across mobile, tablet, and desktop screens.' }
      ],
      bannerImage: '/bmyb-case-jiggy-jerky-jiggybg-01.svg',
      bannerVideo: '/Burger (1) (1).mp4'
    },
    reviews: {
      title: "REVIEWS FROM\nBABA'S BURGERS TEAM",
      subtitle: "We worked with Baba's Burgers to create a bold, food-first digital experience. These review entries are placeholder copy until final client quotes are available.",
      reviewsList: [
        { id: 1, name: 'Baba’s Burgers Founder', position: 'Owner', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'The new direction feels bold, clear, and much more aligned with the energy of our brand. The website makes our food and identity feel more memorable right away.' },
        { id: 2, name: 'Operations Team', position: 'Store Management', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'The experience is cleaner and easier to follow. It gives customers a better sense of the brand while keeping the journey simple and fast.' },
        { id: 3, name: 'Customer Feedback', position: 'Audience', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The website feels modern, bold, and much more appetizing. It creates a stronger first impression and makes the brand stand out.' }
      ]
    }
  },
  'pink-me': {
    slug: 'pink-me',
    accentColor: '#E667A2',
    accentColorRgb: '230 103 162',
    hero: {
      logo: '/bmyb-case-pink-me-pm-logo-01.svg',
      logoAlt: 'Pink.Me Logo',
      tags: ['Non-profit', 'UI/UX', 'Development'],
      title: 'Building a Vibrant Digital Storefront\nfor a Fashion-Forward Brand',
      metrics: [
        { label: 'Store Focus', value: 'Direct-to-Consumer' },
        { label: 'Key Pages Delivered', value: '10+ Pages' },
        { label: 'Industry', value: 'Non-profit' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-pink-me-slider-01.webp',
        '/bmyb-case-pink-me-slider-02.webp',
        '/bmyb-case-pink-me-slider-03.webp',
        '/bmyb-case-pink-me-slider-04.webp',
        '/bmyb-case-pink-me-slider-05.webp',
        '/bmyb-case-pink-me-slider-06.webp',
        '/bmyb-case-pink-me-slider-07.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Pink.Me to design and develop a fashion-forward e-commerce experience that captures the brand’s playful identity and makes product discovery and checkout feel effortless.',
      backgroundParagraphs: [
        'Pink.Me is a fashion and retail brand that needed a digital presence capable of translating its vibrant personality into a modern shopping experience. The goal was to create a storefront that feels stylish, energetic, and easy to navigate.',
        'The site needed to support product discovery, brand storytelling, and smooth conversion while reflecting the bold visual language of the brand across every screen size.'
      ],
      challengeParagraphs: [
        'Pink.Me needed a vibrant online presence that would capture their unique brand personality and convert visitors into customers through an engaging shopping experience. The challenge was to create a storefront that felt premium and playful without becoming cluttered.',
        'Product presentation, navigation, and checkout needed to stay simple so the brand story could shine while still driving purchases efficiently.',
        'In short, the challenge was to transform a distinctive fashion brand into a digital experience that feels modern, expressive, and ready to convert.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-pink-me-gallery-01.svg',
        '/bmyb-case-pink-me-gallery-02.svg',
        '/bmyb-case-pink-me-gallery-03.svg',
      ],
      galleryImageFit: 'contain',
      galleryBgColor: '#E667A2'
    },
    solution: {
      introParagraphs: [
        'Understanding the need for a vibrant, conversion-friendly storefront, we delivered a comprehensive digital solution tailored to Pink.Me’s fashion and retail audience.',
        'BMYBrand led the full website design and development process, creating a visually striking e-commerce experience built around trust, fast access, and clarity. Through a strong content structure, clear hierarchy, and conversion-focused CTAs, the website now makes it easy to discover products and shop with confidence.'
      ],
      resultsParagraphs: [
        'The redesigned website successfully elevated Pink.Me’s online presence, giving the brand a stronger digital identity and a clearer shopping experience. Product discovery is easier, the story feels more cohesive, and the experience feels more premium overall.',
        'As a result, the store is better positioned to convert visitors into customers while supporting future brand growth.'
      ],
      accomplishments: [
        { title: 'Bold brand translation', desc: 'The website feels true to Pink.Me’s visual identity while giving the brand a polished digital storefront.' },
        { title: 'Cleaner shopping flow', desc: 'Browsing and purchase paths were simplified so customers can move from discovery to checkout more easily.' },
        { title: 'Stronger product storytelling', desc: 'Product imagery, messaging, and layout work together to help items stand out and feel more desirable.' },
        { title: 'Responsive storefront', desc: 'A mobile-first e-commerce experience designed to look sharp and perform smoothly across devices.' }
      ],
      bannerImage: '/bmyb-case-pink-me-pinkmebg-01.svg'
    },
    reviews: {
      title: 'REVIEWS FROM\nPINK.ME TEAM',
      subtitle: 'We partnered closely with the Pink.Me team to deliver a bold, modern e-commerce experience. Here is their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Pink.Me Founder', position: 'Brand Lead', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'BMYBrand helped us turn our brand style into a digital experience that feels vibrant, polished, and easy to shop. The site feels much more aligned with who we are.' },
        { id: 2, name: 'Operations Team', position: 'E-commerce Management', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'The new storefront made the shopping journey much clearer for customers. It is easier to navigate and feels a lot more premium than before.' },
        { id: 3, name: 'Customer Feedback', position: 'Online Shoppers', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The website now feels fun, stylish, and easy to use. It is much more enjoyable to browse and buy from the brand online.' }
      ]
    }
  },
  'instinctive-healthcare-solutions': {
    slug: 'instinctive-healthcare-solutions',
    accentColor: '#00ACC8',
    accentColorRgb: '0 172 200',
    hero: {
      logo: '/bmyb-case-instinctive-healthcare-logo-01.svg',
      logoAlt: 'Instinctive Healthcare Solutions Logo',
      tags: ['Healthcare', 'UI/UX', 'Development'],
      title: 'Building a Patient-First Digital\nExperience for 24/7 Emergency Care',
      metrics: [
        { label: 'Care Availability', value: '24/7 ER' },
        { label: 'Key Pages Delivered', value: '15+ Pages' },
        { label: 'Industry', value: 'Education' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-instinctive-healthcare-slider-01.webp',
        '/bmyb-case-instinctive-healthcare-slider-02.webp',
        '/bmyb-case-instinctive-healthcare-slider-03.webp',
        '/bmyb-case-instinctive-healthcare-slider-04.webp',
        '/bmyb-case-instinctive-healthcare-slider-05.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Fountain Hills Emergency Room and Medical Center to design and develop a modern healthcare website that improves patient trust, simplifies access to care, and clearly communicates 24/7 emergency services across all devices.',
      backgroundParagraphs: [
        'Fountain Hills Emergency Room and Medical Center serves the local community with 24/7 emergency care, in-house diagnostics, and patient-focused medical services. As a healthcare provider operating in urgent, high-stress situations, their website needed to deliver information clearly, quickly, and with immediate credibility.',
        'The team required a modern, responsive platform that could communicate emergency availability, explain services without confusion, and guide patients to critical actions—such as calling, getting directions, or accessing billing and patient resources—without delay.'
      ],
      challengeParagraphs: [
        'Fountain Hills Emergency Room and Medical Center operates in a high-stakes healthcare environment where patients need clear information quickly and without confusion. Their digital presence needed to communicate 24/7 emergency availability, medical credibility, and service coverage—all while remaining calm, trustworthy, and easy to navigate.',
        'Explaining advanced capabilities such as on-site imaging, laboratory services, and emergency care in a simple, non-overwhelming way was critical. At the same time, the website had to guide users toward immediate actions like calling the ER, getting directions, booking appointments, or accessing patient resources—especially during urgent moments.',
        'In short, the challenge was to transform complex healthcare information into a clear, patient-first digital experience that builds trust instantly, reduces stress, and supports fast, confident decision-making across all devices.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-instinctive-healthcare-gallery-01.webp',
        '/bmyb-case-instinctive-healthcare-gallery-02.webp',
        '/bmyb-case-instinctive-healthcare-gallery-03.webp',
      ],
      galleryImageFit: 'contain',
      galleryImagePosition: 'center',
      galleryBgColor: '#00ACC8'
    },
    solution: {
      introParagraphs: [
        'Understanding the urgent nature of emergency healthcare and the need for clear, patient-focused communication, we delivered a comprehensive digital solution tailored to Fountain Hills Emergency Room and Medical Center.',
        'BMYBrand led the full website design and development process, creating a clean, responsive experience built around trust, fast access, and clarity. Through a structured content approach, clear visual hierarchy, and conversion-focused CTAs, the website now communicates 24/7 emergency care, medical services, diagnostics, and patient resources in a way that is easy to understand and navigate—even in high-stress moments.'
      ],
      resultsParagraphs: [
        'The redesigned website successfully met its primary goal: providing patients and families with a clear, trustworthy digital experience that supports quick decision-making. Critical information is now easier to find, services are clearly explained, and users are guided smoothly toward essential actions like calling the ER, getting directions, booking appointments, or accessing billing and patient portals.',
        'As a result, the site improved accessibility, user confidence, and patient-first care delivery—all achieved on-site—strengthening confidence before patients even arrive at the facility.'
      ],
      accomplishments: [
        { title: 'Clear emergency positioning', desc: 'The website clearly communicates 24/7 emergency availability and service coverage without confusion.' },
        { title: 'Stronger trust and credibility', desc: 'Board-certified care, diagnostics, and patient resources are presented clearly to build confidence immediately.' },
        { title: 'Simplified patient experience', desc: 'Easy access to contact details, directions, billing information, and patient portals reduces stress and friction.' },
        { title: 'Modern, responsive platform', desc: 'A mobile-first, accessible website experience designed to perform across all devices and support the local community.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp'
    },
    reviews: {
      title: 'REVIEWS FROM\nFHMCAZ TEAM',
      subtitle: 'We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here\'s their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Jonathan Reed', position: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the urgency around patient confidence, and delivered a site that truly supports our community.' },
        { id: 2, name: 'Sarah Mitchell', position: 'Medical Director', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'BMYBrand exceeded our expectations in every way. They took the time to understand our unique needs as an emergency care facility and delivered a website that not only looks professional but functions flawlessly. Our patients can now find critical information quickly and easily.' },
        { id: 3, name: 'Michael Chen', position: 'Operations Manager', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The transformation of our digital presence has been remarkable. BMYBrand created a patient-first experience that aligns perfectly with our mission. The feedback from our community has been overwhelmingly positive, and we\'ve seen a significant increase in online engagement.' }
      ]
    }
  },
  'instinctive-health': {
    slug: 'instinctive-health',
    accentColor: '#ED3041',
    accentColorRgb: '237 48 65',
    hero: {
      logo: '/bmyb-case-instinctive-health-logo-01.svg',
      logoAlt: 'Instinctive Health Logo',
      tags: ['Healthcare', 'UI/UX', 'Development'],
      title: 'Building a Patient-First Digital\nExperience for 24/7 Emergency Care',
      metrics: [
        { label: 'Care Availability', value: '24/7 ER' },
        { label: 'Key Pages Delivered', value: '15+ Pages' },
        { label: 'Industry', value: 'Healthcare / ER' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-instinctive-health-slider-01.webp',
        '/bmyb-case-instinctive-health-slider-02.webp',
        '/bmyb-case-instinctive-health-slider-03.webp',
        '/bmyb-case-instinctive-health-slider-04.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Fountain Hills Emergency Room and Medical Center to design and develop a modern healthcare website that improves patient trust, simplifies access to care, and clearly communicates 24/7 emergency services across all devices.',
      backgroundParagraphs: [
        'Fountain Hills Emergency Room and Medical Center serves the local community with 24/7 emergency care, in-house diagnostics, and patient-focused medical services. As a healthcare provider operating in urgent, high-stress situations, their website needed to deliver information clearly, quickly, and with immediate credibility.',
        'The team required a modern, responsive platform that could communicate emergency availability, explain services without confusion, and guide patients to critical actions—such as calling, getting directions, or accessing billing and patient resources—without delay.'
      ],
      challengeParagraphs: [
        'Fountain Hills Emergency Room and Medical Center operates in a high-stakes healthcare environment where patients need clear information quickly and without confusion. Their digital presence needed to communicate 24/7 emergency availability, medical credibility, and service coverage—all while remaining calm, trustworthy, and easy to navigate.',
        'Explaining advanced capabilities such as on-site imaging, laboratory services, and emergency care in a simple, non-overwhelming way was critical. At the same time, the website had to guide users toward immediate actions like calling the ER, getting directions, booking appointments, or accessing patient resources—especially during urgent moments.',
        'In short, the challenge was to transform complex healthcare information into a clear, patient-first digital experience that builds trust instantly, reduces stress, and supports fast, confident decision-making across all devices.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-instinctive-health-gallery-01.webp',
        '/bmyb-case-instinctive-health-gallery-02.webp',
        '/bmyb-case-instinctive-health-gallery-03.webp',
      ],
      galleryImageFit: 'contain',
      galleryImagePosition: 'center',
      galleryBgColor: '#ED3041'
    },
    solution: {
      introParagraphs: [
        'Understanding the urgent nature of emergency healthcare and the need for clear, patient-focused communication, we delivered a comprehensive digital solution tailored to Fountain Hills Emergency Room and Medical Center.',
        'BMYBrand led the full website design and development process, creating a clean, responsive experience built around trust, fast access, and clarity. Through a structured content approach, clear visual hierarchy, and conversion-focused CTAs, the website now communicates 24/7 emergency care, medical services, diagnostics, and patient resources in a way that is easy to understand and navigate—even in high-stress moments.'
      ],
      resultsParagraphs: [
        'The redesigned website successfully met its primary goal: providing patients and families with a clear, trustworthy digital experience that supports quick decision-making. Critical information is now easier to find, services are clearly explained, and users are guided smoothly toward essential actions like calling the ER, getting directions, booking appointments, or accessing billing and patient portals.',
        'As a result, the site improved accessibility, user confidence, and patient-first care delivery—all achieved on-site—strengthening confidence before patients even arrive at the facility.'
      ],
      accomplishments: [
        { title: 'Clear emergency positioning', desc: 'The website clearly communicates 24/7 emergency availability and service coverage without confusion.' },
        { title: 'Stronger trust and credibility', desc: 'Board-certified care, diagnostics, and patient resources are presented clearly to build confidence immediately.' },
        { title: 'Simplified patient experience', desc: 'Easy access to contact details, directions, billing information, and patient portals reduces stress and friction.' },
        { title: 'Modern, responsive platform', desc: 'A mobile-first, accessible website experience designed to perform across all devices and support the local community.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp',
      bannerVideo: '/Instective heath pass (1) (1) (1).mp4'
    },
    reviews: {
      title: 'REVIEWS FROM\nFHMCAZ TEAM',
      subtitle: 'We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here\'s their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Jonathan Reed', position: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the urgency around patient confidence, and delivered a site that truly supports our community.' },
        { id: 2, name: 'Sarah Mitchell', position: 'Medical Director', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'BMYBrand exceeded our expectations in every way. They took the time to understand our unique needs as an emergency care facility and delivered a website that not only looks professional but functions flawlessly. Our patients can now find critical information quickly and easily.' },
        { id: 3, name: 'Michael Chen', position: 'Operations Manager', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The transformation of our digital presence has been remarkable. BMYBrand created a patient-first experience that aligns perfectly with our mission. The feedback from our community has been overwhelmingly positive, and we\'ve seen a significant increase in online engagement.' }
      ]
    }
  },
  'learnandlabel': {
    slug: 'learnandlabel',
    accentColor: '#F45334',
    accentColorRgb: '244 83 52',
    accentGradient: 'linear-gradient(180deg, #9AB821 0%, #E9B10F 31%, #F45334 68%, #E07D32 100%)',
    hero: {
      logo: '/bmyb-case-learnandlabel-learnandlabellogo-01.svg',
      logoAlt: 'learnandlabel Logo',
      tags: ['Logo Design', 'Education', 'UI/UX', 'Development', 'AI Integration'],
      title: 'Building a Patient-First Digital\nExperience for 24/7 Emergency Care',
      metrics: [
        { label: 'Care Availability', value: '24/7 ER' },
        { label: 'Key Pages Delivered', value: '15+ Pages' },
        { label: 'Industry', value: 'Education' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-learnandlabel-slider-01.webp',
        '/bmyb-case-learnandlabel-slider-02.webp',
        '/bmyb-case-learnandlabel-slider-03.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Fountain Hills Emergency Room and Medical Center to design and develop a modern healthcare website that improves patient trust, simplifies access to care, and clearly communicates 24/7 emergency services across all devices.',
      backgroundParagraphs: [
        'Fountain Hills Emergency Room and Medical Center serves the local community with 24/7 emergency care, in-house diagnostics, and patient-focused medical services. As a healthcare provider operating in urgent, high-stress situations, their website needed to deliver information clearly, quickly, and with immediate credibility.',
        'The team required a modern, responsive platform that could communicate emergency availability, explain services without confusion, and guide patients to critical actions—such as calling, getting directions, or accessing billing and patient resources—without delay.'
      ],
      challengeParagraphs: [
        'Fountain Hills Emergency Room and Medical Center operates in a high-stakes healthcare environment where patients need clear information quickly and without confusion. Their digital presence needed to communicate 24/7 emergency availability, medical credibility, and service coverage—all while remaining calm, trustworthy, and easy to navigate.',
        'Explaining advanced capabilities such as on-site imaging, laboratory services, and emergency care in a simple, non-overwhelming way was critical. At the same time, the website had to guide users toward immediate actions like calling the ER, getting directions, booking appointments, or accessing patient resources—especially during urgent moments.',
        'In short, the challenge was to transform complex healthcare information into a clear, patient-first digital experience that builds trust instantly, reduces stress, and supports fast, confident decision-making across all devices.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-learnandlabel-gallery-01.svg',
        '/bmyb-case-learnandlabel-gallery-02.svg',
        '/bmyb-case-learnandlabel-gallery-03.svg',
      ],
      galleryImageFit: 'contain',
      galleryBgColor: 'linear-gradient(180deg, #9AB821 0%, #E9B10F 31%, #F45334 68%, #E07D32 100%)'
    },
    solution: {
      introParagraphs: [
        'Understanding the urgent nature of emergency healthcare and the need for clear, patient-focused communication, we delivered a comprehensive digital solution tailored to Fountain Hills Emergency Room and Medical Center.',
        'BMYBrand led the full website design and development process, creating a clean, responsive experience built around trust, fast access, and clarity. Through a structured content approach, clear visual hierarchy, and conversion-focused CTAs, the website now communicates 24/7 emergency care, medical services, diagnostics, and patient resources in a way that is easy to understand and navigate—even in high-stress moments.'
      ],
      resultsParagraphs: [
        'The redesigned website successfully met its primary goal: providing patients and families with a clear, trustworthy digital experience that supports quick decision-making. Critical information is now easier to find, services are clearly explained, and users are guided smoothly toward essential actions like calling the ER, getting directions, booking appointments, or accessing billing and patient portals.',
        'As a result, the site improved accessibility, user confidence, and patient-first care delivery—all achieved on-site—strengthening confidence before patients even arrive at the facility.'
      ],
      accomplishments: [
        { title: 'Clear emergency positioning', desc: 'The website clearly communicates 24/7 emergency availability and service coverage without confusion.' },
        { title: 'Stronger trust and credibility', desc: 'Board-certified care, diagnostics, and patient resources are presented clearly to build confidence immediately.' },
        { title: 'Simplified patient experience', desc: 'Easy access to contact details, directions, billing information, and patient portals reduces stress and friction.' },
        { title: 'Modern, responsive platform', desc: 'A mobile-first, accessible website experience designed to perform across all devices and support the local community.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp'
    },
    reviews: {
      title: 'REVIEWS FROM\nFHMCAZ TEAM',
      subtitle: 'We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here\'s their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Jonathan Reed', position: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the urgency around patient confidence, and delivered a site that truly supports our community.' },
        { id: 2, name: 'Sarah Mitchell', position: 'Medical Director', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'BMYBrand exceeded our expectations in every way. They took the time to understand our unique needs as an emergency care facility and delivered a website that not only looks professional but functions flawlessly. Our patients can now find critical information quickly and easily.' },
        { id: 3, name: 'Michael Chen', position: 'Operations Manager', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The transformation of our digital presence has been remarkable. BMYBrand created a patient-first experience that aligns perfectly with our mission. The feedback from our community has been overwhelmingly positive, and we\'ve seen a significant increase in online engagement.' }
      ]
    }
  },
  'vytis-tour': {
    slug: 'vytis-tour',
    accentColor: '#EBA421',
    accentColorRgb: '235 164 33',
    hero: {
      logo: '/bmyb-case-vytis-tour-logo-01.svg',
      logoAlt: 'Vytis Tour Logo',
      tags: ['Travel and Tourism', 'Branding', 'UI/UX', 'Development', 'SEO', 'SMM'],
      title: 'Building a Patient-First Digital\nExperience for 24/7 Emergency Care',
      metrics: [
        { label: 'Care Availability', value: '24/7 ER' },
        { label: 'Key Pages Delivered', value: '15+ Pages' },
        { label: 'Industry', value: 'Travel and Tourism' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-vytis-tour-slider-01.webp',
        '/bmyb-case-vytis-tour-slider-02.webp',
        '/bmyb-case-vytis-tour-slider-03.webp',
        '/bmyb-case-vytis-tour-slider-04.webp',
        '/bmyb-case-vytis-tour-slider-05.webp',
        '/bmyb-case-vytis-tour-slider-06.webp',
        '/bmyb-case-vytis-tour-slider-07.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Fountain Hills Emergency Room and Medical Center to design and develop a modern healthcare website that improves patient trust, simplifies access to care, and clearly communicates 24/7 emergency services across all devices.',
      backgroundParagraphs: [
        'Fountain Hills Emergency Room and Medical Center serves the local community with 24/7 emergency care, in-house diagnostics, and patient-focused medical services. As a healthcare provider operating in urgent, high-stress situations, their website needed to deliver information clearly, quickly, and with immediate credibility.',
        'The team required a modern, responsive platform that could communicate emergency availability, explain services without confusion, and guide patients to critical actions—such as calling, getting directions, or accessing billing and patient resources—without delay.'
      ],
      challengeParagraphs: [
        'Fountain Hills Emergency Room and Medical Center operates in a high-stakes healthcare environment where patients need clear information quickly and without confusion. Their digital presence needed to communicate 24/7 emergency availability, medical credibility, and service coverage—all while remaining calm, trustworthy, and easy to navigate.',
        'Explaining advanced capabilities such as on-site imaging, laboratory services, and emergency care in a simple, non-overwhelming way was critical. At the same time, the website had to guide users toward immediate actions like calling the ER, getting directions, booking appointments, or accessing patient resources—especially during urgent moments.',
        'In short, the challenge was to transform complex healthcare information into a clear, patient-first digital experience that builds trust instantly, reduces stress, and supports fast, confident decision-making across all devices.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-vytis-tour-gallery-01.svg',
        '/bmyb-case-vytis-tour-gallery-02.svg',
        '/bmyb-case-vytis-tour-gallery-03.svg',
      ],
      galleryImageFit: 'contain',
      galleryBgColor: '#EBA421'
    },
    solution: {
      introParagraphs: [
        'Understanding the urgent nature of emergency healthcare and the need for clear, patient-focused communication, we delivered a comprehensive digital solution tailored to Fountain Hills Emergency Room and Medical Center.',
        'BMYBrand led the full website design and development process, creating a clean, responsive experience built around trust, fast access, and clarity. Through a structured content approach, clear visual hierarchy, and conversion-focused CTAs, the website now communicates 24/7 emergency care, medical services, diagnostics, and patient resources in a way that is easy to understand and navigate—even in high-stress moments.'
      ],
      resultsParagraphs: [
        'The redesigned website successfully met its primary goal: providing patients and families with a clear, trustworthy digital experience that supports quick decision-making. Critical information is now easier to find, services are clearly explained, and users are guided smoothly toward essential actions like calling the ER, getting directions, booking appointments, or accessing billing and patient portals.',
        'As a result, the site improved accessibility, user confidence, and patient-first care delivery—all achieved on-site—strengthening confidence before patients even arrive at the facility.'
      ],
      accomplishments: [
        { title: 'Clear emergency positioning', desc: 'The website clearly communicates 24/7 emergency availability and service coverage without confusion.' },
        { title: 'Stronger trust and credibility', desc: 'Board-certified care, diagnostics, and patient resources are presented clearly to build confidence immediately.' },
        { title: 'Simplified patient experience', desc: 'Easy access to contact details, directions, billing information, and patient portals reduces stress and friction.' },
        { title: 'Modern, responsive platform', desc: 'A mobile-first, accessible website experience designed to perform across all devices and support the local community.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp'
    },
    reviews: {
      title: 'REVIEWS FROM\nFHMCAZ TEAM',
      subtitle: 'We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here\'s their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Jonathan Reed', position: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the urgency around patient confidence, and delivered a site that truly supports our community.' },
        { id: 2, name: 'Sarah Mitchell', position: 'Medical Director', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'BMYBrand exceeded our expectations in every way. They took the time to understand our unique needs as an emergency care facility and delivered a website that not only looks professional but functions flawlessly. Our patients can now find critical information quickly and easily.' },
        { id: 3, name: 'Michael Chen', position: 'Operations Manager', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The transformation of our digital presence has been remarkable. BMYBrand created a patient-first experience that aligns perfectly with our mission. The feedback from our community has been overwhelmingly positive, and we\'ve seen a significant increase in online engagement.' }
      ]
    }
  },
  'jersey': {
    slug: 'jersey',
    accentColor: '#73A31F',
    accentColorRgb: '115 163 31',
    hero: {
      logo: '/bmyb-case-jersey-logo-01.svg',
      logoAlt: 'Jersey Logo',
      tags: ['Branding', 'Sport', 'UI/UX', 'Development'],
      title: 'Building a Patient-First Digital\nExperience for 24/7 Emergency Care',
      metrics: [
        { label: 'Care Availability', value: '24/7 ER' },
        { label: 'Key Pages Delivered', value: '15+ Pages' },
        { label: 'Industry', value: 'Sport' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-jersey-slider-01.webp',
        '/bmyb-case-jersey-slider-02.webp',
        '/bmyb-case-jersey-slider-03.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Fountain Hills Emergency Room and Medical Center to design and develop a modern healthcare website that improves patient trust, simplifies access to care, and clearly communicates 24/7 emergency services across all devices.',
      backgroundParagraphs: [
        'Fountain Hills Emergency Room and Medical Center serves the local community with 24/7 emergency care, in-house diagnostics, and patient-focused medical services. As a healthcare provider operating in urgent, high-stress situations, their website needed to deliver information clearly, quickly, and with immediate credibility.',
        'The team required a modern, responsive platform that could communicate emergency availability, explain services without confusion, and guide patients to critical actions such as calling, getting directions, or accessing billing and patient resources without delay.'
      ],
      challengeParagraphs: [
        'Fountain Hills Emergency Room and Medical Center operates in a high-stakes healthcare environment where patients need clear information quickly and without confusion. Their digital presence needed to communicate 24/7 emergency availability, medical credibility, and service coverage while remaining calm, reassuring, and easy to navigate.',
        'Explaining advanced capabilities such as on-site imaging, laboratory services, and emergency care in a simple, non-overwhelming way was critical. At the same time, the website had to guide users toward immediate actions like calling the ER, getting directions, booking appointments, or accessing patient resources especially during urgent moments.',
        'In short, the challenge was to transform complex healthcare information into a clear, patient-first digital experience that builds trust instantly, reduces stress, and supports fast, confident decision-making across all devices.'
      ],
      whatWeDidItems: [
        'Branding',
        'UI/UX Design',
        'Website Development',
        'Dashboard Deployment',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-jersey-gallery-01.webp',
        '/bmyb-case-jersey-gallery-02.webp',
        '/bmyb-case-jersey-gallery-03.webp',
      ],
      galleryImageFit: 'contain',
      galleryBgColor: '#73A31F'
    },
    solution: {
      introParagraphs: [
        'Understanding the critical nature of emergency healthcare and the need for clear, patient-focused communication, we delivered a comprehensive digital solution tailored to Fountain Hills Emergency Room and Medical Center.',
        'BMYBrand led the full website design and development process, creating a clean, responsive experience built around clarity, trust, and fast access. Through a structured content approach, clear visual hierarchy, and conversion-focused CTAs, the website now communicates 24/7 emergency care, medical services, diagnostics, and patient resources in a way that is easy to understand and act on especially during urgent situations.'
      ],
      resultsParagraphs: [
        'The redesigned website successfully met its primary goal: providing patients and families with a clear, trustworthy digital experience that supports quick decision-making. Critical information is now easier to find, services are clearly explained, and users are guided smoothly toward essential actions such as calling the ER, getting directions, booking appointments, or accessing billing and patient portals.',
        'As a result, the site better reflects the professionalism, accessibility, and patient-first care delivered on-site strengthening confidence before patients even arrive at the facility.'
      ],
      accomplishments: [
        { title: 'Clear emergency positioning', desc: 'The website clearly communicates 24/7 emergency availability and service coverage without confusion.' },
        { title: 'Stronger trust and credibility', desc: 'Board-certified care, diagnostics, and patient resources are presented clearly to build confidence immediately.' },
        { title: 'Simplified patient experience', desc: 'Easy access to contact details, directions, billing information, and patient portals reduces stress and friction.' },
        { title: 'Modern, responsive platform', desc: 'A mobile-first, accessible website experience designed to perform across all devices and support the local community.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp'
    },
    reviews: {
      title: 'REVIEWS FROM\nFHMCAZ TEAM',
      subtitle: 'We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here’s their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Jonathan Reed', position: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the importance of clarity and patient confidence, and delivered a site that truly supports our community.' }
      ]
    }
  },
  'bhs': {
    slug: 'bhs',
    accentColor: '#0160A0',
    accentColorRgb: '1 96 160',
    hero: {
      logo: '/bmyb-case-bhs-logo-01.svg',
      logoAlt: 'BHS Logo',
      tags: ['Non-profit', 'UI/UX', 'Development', 'AI Integration'],
      title: 'Building a Distinctive Digital\nExperience for BHS',
      metrics: [
        { label: 'Project Scope', value: 'Case Study' },
        { label: 'Key Pages Delivered', value: '10+ Pages' },
        { label: 'Industry', value: 'Non-profit' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-bhs-slider-01.webp',
        '/bmyb-case-bhs-slider-02.webp',
        '/bmyb-case-bhs-slider-03.webp',
        '/bmyb-case-bhs-slider-04.webp',
        '/bmyb-case-bhs-slider-05.webp',
        '/bmyb-case-bhs-slider-06.webp',
        '/bmyb-case-bhs-slider-07.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with BHS to create a modern digital experience that strengthens brand presentation, improves structure, and supports user engagement across devices.',
      backgroundParagraphs: [
        'BHS needed a digital presence that could present the brand more clearly while remaining easy to navigate and scalable for future growth.',
        'The project required a strong visual foundation, better content hierarchy, and a responsive experience that works across all major screen sizes.'
      ],
      challengeParagraphs: [
        'The challenge was to turn the BHS brand into a clearer and more effective digital experience without losing flexibility for future updates.',
        'Content structure, usability, and responsive execution all needed to work together so the site could feel polished and easy to understand.',
        'In short, the goal was to create a stronger digital foundation that supports brand clarity and long-term scalability.'
      ],
      whatWeDidItems: [
        'Branding',
        'UI/UX Design',
        'Website Development',
        'Responsive Design',
        'Website Deployment'
      ],
      galleryImages: [
        '/bmyb-case-bhs-gallery-01.webp',
        '/bmyb-case-bhs-gallery-02.webp',
        '/bmyb-case-bhs-gallery-03.webp',
      ],
      galleryImageFit: 'contain',
      galleryBgColor: '#0160A0'
    },
    solution: {
      introParagraphs: [
        'We delivered a structured digital solution for BHS built around clarity, stronger visual hierarchy, and a responsive implementation.',
        'The final experience gives the brand a more polished online presence and a scalable framework for future growth.'
      ],
      resultsParagraphs: [
        'The result is a clearer and more cohesive digital experience that better supports both brand presentation and usability.',
        'Users can engage with content more easily, and the site now provides a stronger base for future expansion.'
      ],
      accomplishments: [
        { title: 'Stronger brand clarity', desc: 'The experience presents BHS with a more focused and intentional digital identity.' },
        { title: 'Improved structure', desc: 'Content and layout are organized to help users understand the brand more quickly.' },
        { title: 'Responsive execution', desc: 'The site adapts cleanly across desktop and mobile devices.' },
        { title: 'Scalable foundation', desc: 'The platform is set up to support future updates, pages, and campaigns.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp'
    },
    reviews: {
      title: 'REVIEWS FROM\nBHS TEAM',
      subtitle: 'We partnered with the BHS team to shape a clearer and more polished digital experience. This section currently contains placeholder feedback.',
      reviewsList: [
        { id: 1, name: 'BHS Lead', position: 'Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'BMYBrand helped turn our direction into a cleaner and more confident digital experience.' },
        { id: 2, name: 'Operations Team', position: 'Management', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'The structure feels clearer, the presentation feels stronger, and the site is much easier to work with.' },
        { id: 3, name: 'Customer Feedback', position: 'Audience', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The new experience feels more polished and easier to understand from the first visit.' }
      ]
    }
  }
}
