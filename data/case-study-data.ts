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
  footer?: {
    title: string
  }
  
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
        '/bmyb-case-fountain-hills-primary-care-clinic-embedded-01.svg',
        '/bmyb-case-fountain-hills-meet-our-physicians-embedded-01.svg',
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
        'Brand Identity',
        'UI/UX Design',
        'Website Development',
        'Copywriting'
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
      bannerVideo: '/bmyb-case-fountain-hills-01.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM\nFHMCAZ TEAM',
      subtitle: 'We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here\'s their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Jonathan Reed', position: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the urgency around patient confidence, and delivered a site that truly supports our community.' },
        { id: 2, name: 'Sarah Mitchell', position: 'Medical Director', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'BMYBrand exceeded our expectations in every way. They took the time to understand our unique needs as an emergency care facility and delivered a website that not only looks professional but functions flawlessly. Our patients can now find critical information quickly and easily.' },
        { id: 3, name: 'Michael Chen', position: 'Operations Manager', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The transformation of our digital presence has been remarkable. BMYBrand created a patient-first experience that aligns perfectly with our mission. The feedback from our community has been overwhelmingly positive, and we\'ve seen a significant increase in online engagement.' }
      ]
    },
    footer: {
      title: 'Want Similar Results? Connect With Our\nHealthcare UX Team'
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
      bannerVideo: '/bmyb-case-jiggy-jerky-01.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM\nJIGGY JERKY TEAM',
      subtitle: 'We partnered closely with the Jiggy Jerky team to deliver a bold e-commerce experience. Here is their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Mark Vicary', position: 'Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'BMYBrand took our personality and turned it into a website that feels just as bold as the product. The layout makes it easy for customers to understand what Jiggy Jerky is about and move quickly toward buying.' },
        { id: 2, name: 'Operations Team', position: 'Fulfillment & Sales', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'The new site makes product discovery and shopping much smoother. It is easier to manage the customer journey, and the brand presentation feels far more polished and premium.' },
        { id: 3, name: 'Customer Feedback', position: 'Direct-to-Consumer Audience', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The site now feels like a real extension of the brand: fun, bold, and delicious-looking. It gives customers a better reason to stay, browse, and shop.' }
      ]
    },
    footer: {
      title: 'Create with Us Something Flavorful for You'
    }
  },
  'babas-burgers': {
    slug: 'babas-burgers',
    accentColor: '#C40913',
    accentColorRgb: '196 9 19',
    hero: {
      logo: '/bmyb-case-babas-burgers-logo-01.svg',
      logoAlt: "Baba's Burgers Logo",
      tags: ['UI/UX', 'Development', 'Branding', 'Visual Design'],
      title: 'Created a Bold Digital Identity for a\nModern Halal Burger Brand',
      metrics: [
        { label: 'Brand Focus', value: 'Halal Burger & Fast-Food Experience' },
        { label: 'Key Pages Delivered', value: 'Full Restaurant Website Ecosystem' },
        { label: 'Industry', value: 'Food & Beverage / Restaurant Branding' },
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
      introText: "BMYBrand partnered with Baba's Burgers to design and develop a bold, high-impact digital experience that reflects the brand's energetic personality, fresh ingredients, and modern fast-food positioning. The goal was to create a website that immediately triggers appetite, builds trust in halal quality, and showcases the restaurant as a premium yet accessible burger destination.",
      backgroundParagraphs: [
        "Baba's Burgers is a modern halal burger and sandwich brand built around freshness, bold flavor, and a fun dining experience. The restaurant focuses on juicy burgers, freshly prepared sandwiches, and comfort food served in a fast, casual environment that appeals to families, students, and food lovers looking for both taste and value.",
        "As the brand expanded its identity and customer base, it became important to establish a stronger digital presence that could match the energy of its physical dining experience. The website needed to go beyond simply displaying a menu; it had to represent the personality of the brand and create a strong first impression for online visitors.",
        "The objective was to position Baba's Burgers as a recognizable modern food brand rather than just another fast-food outlet, ensuring that its identity feels bold, memorable, and competitive in the local food market."
      ],
      challengeParagraphs: [
        'The primary challenge was translating a real-world food experience into a digital format that feels equally engaging, flavorful, and visually compelling. Unlike other industries, food branding relies heavily on sensory appeal, making it essential to communicate taste, freshness, and portion satisfaction through visuals and layout alone.',
        'The website needed to evoke appetite and excitement while still maintaining clarity and usability. Every section had to balance strong visual storytelling with easy navigation so users could explore the menu without distraction or confusion.',
        'Another challenge was maintaining balance between branding and functionality. The platform needed to highlight signature burgers, menu categories, and promotions while also reinforcing halal assurance, cleanliness, and quality standards in a natural and trustworthy way. All of this had to be achieved without reducing the bold and energetic identity of the brand.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Website Design',
        'Brand Identity Integration',
        'Menu Presentation System',
        'Visual Content Direction'
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
        "BMYBrand developed a visually driven restaurant experience designed to bring Baba's Burgers to life through bold design language, strong typography, and appetite-focused layout systems. The entire experience was crafted to make food the central visual and emotional focus of the platform.",
        "The website was structured to highlight signature burgers and featured menu items as the core experience, ensuring users are immediately drawn to high-impact visuals of the brand's best offerings. Instead of static menu presentation, we designed dynamic sections that feel engaging and encourage exploration.",
        'We also created a clear content structure that guides users naturally from discovery to decision. Promotions, lunch specials, and customer favorites are strategically placed to enhance engagement and support conversion behavior. The design approach emphasizes bold hierarchy, visual clarity, and mobile-first usability to match real customer browsing habits.'
      ],
      resultsParagraphs: [
        "The redesigned platform significantly improved how Baba's Burgers is perceived and experienced in the digital space. Users are now able to engage with the brand visually within seconds, gaining a clear sense of quality, freshness, and flavor without needing additional explanation.",
        "Customers can now quickly discover menu items, explore signature burgers, and understand the brand's halal positioning in a more intuitive and engaging way. The improved structure reduces friction in browsing and enhances overall interaction with key sections of the website.",
        "The experience also strengthened brand trust, improved user engagement, and helped establish a more competitive digital identity that aligns with modern fast-casual dining expectations. The platform now positions Baba's Burgers as a bold, recognizable, and visually strong restaurant brand."
      ],
      accomplishments: [
        { title: 'Stronger Visual Appetite Appeal', desc: 'Food presentation and layout design create an immediate sense of craving and engagement, making users emotionally connect with the menu.' },
        { title: 'Clear Halal Brand Positioning', desc: 'The website communicates halal assurance in a natural and trust-building way while maintaining a modern and bold brand voice.' },
        { title: 'Improved Menu Discoverability', desc: 'Users can easily explore signature items, categories, and promotions without confusion or unnecessary steps.' },
        { title: 'Modern Fast-Food Digital Identity', desc: 'The platform reflects a bold, energetic, and contemporary restaurant experience that feels consistent across all devices and screen sizes.' }
      ],
      bannerImage: '/bmyb-case-jiggy-jerky-jiggybg-01.svg',
      bannerVideo: '/bmyb-case-babas-burgers-01.mp4'
    },
    reviews: {
      title: "REVIEWS FROM\nBABA'S BURGERS TEAM",
      subtitle: "We worked closely with the Baba's Burgers team to ensure the digital experience reflects the brand's energy, food quality, and customer-first approach. The collaboration focused on making sure the online presence feels as exciting and flavorful as the in-store experience.",
      reviewsList: [
        { id: 1, name: "Baba's Burgers Team", position: 'Client', image: 'https://i.pravatar.cc/150?img=12', testimonial: "Working with BMYBrand helped us bring our restaurant identity to life online. The website perfectly captures our bold flavors and fresh ingredients while making it easy for customers to explore our menu. It feels modern, engaging, and truly represents what Baba's Burgers stands for." }
      ]
    },
    footer: {
      title: 'Let\'s Build Food Brands That People Don\'t\nJust See; They Crave'
    }
  },
  'pink-me': {
    slug: 'pink-me',
    accentColor: '#E667A2',
    accentColorRgb: '230 103 162',
    hero: {
      logo: '/bmyb-case-pink-me-pm-logo-01.svg',
      logoAlt: 'Pink.Me Logo',
      tags: ['Nonprofit Branding', 'Web Design', 'Web Development', 'Copywriting'],
      title: 'Designed a Digital Home for Hope,\nHealing, and Breast Cancer Support',
      metrics: [
        { label: 'Organization Type', value: 'Nonprofit' },
        { label: 'Programs Supported', value: '5+ Programs' },
        { label: 'Industry', value: 'Healthcare / Nonprofit' },
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
      introText: 'BMYBrand partnered with PINK "ME" to design and develop a compassionate, mission-driven digital platform that connects breast cancer patients, survivors, and families with the financial assistance, food support, and community resources they need, all in one place.',
      backgroundParagraphs: [
        'PINK "ME" is a nonprofit breast cancer organization dedicated to ensuring no woman faces breast cancer alone. Through financial assistance grants, food support, mammogram access, and community connection programs, the organization serves patients in active treatment, survivors rebuilding their lives, and families carrying the weight of a diagnosis.',
        'The organization needed a digital presence that matched the depth of their mission - one that felt as warm and human as the support they provide every single day.'
      ],
      challengeParagraphs: [
        'Nonprofits operate in a uniquely emotional digital space. Every visitor arriving at PINK "ME"\'s website is either seeking help in a vulnerable moment, looking to give, or searching for ways to get involved. The platform had to speak clearly and compassionately to all three audiences simultaneously, without feeling cluttered, cold, or confusing.',
        'The biggest challenge was translating multiple programs, each with its own audience, eligibility requirements, and emotional weight, into a single, navigable experience that felt unified, trustworthy, and easy to act on.'
      ],
      whatWeDidItems: [
        'Brand Identity',
        'UI/UX Design',
        'Website Development',
        'Copywriting'
      ],
      galleryImages: [
        '/bmyb-case-pink-me-gallery-01.webp',
        '/bmyb-case-pink-me-gallery-02.svg',
        '/bmyb-case-pink-me-gallery-03.svg',
      ],
      galleryImageFit: 'contain',
      galleryBgColor: '#E667A2'
    },
    solution: {
      introParagraphs: [
        'BMYBrand designed a warm, dignity-centered digital platform built around clarity, empathy, and action. The visual direction used soft, hopeful tones that reflect the organization\'s compassionate identity while maintaining the professionalism donors and partners expect.',
        'Each program - the Treatment Assistance Grant, Survivor Wellness Grant, PINK "ME" Up Food Project, Mammograms Matter NM, and Connected by Cells, received its own clearly structured content area, making it easy for every visitor to quickly find what was meant for them.',
        'Donation pathways, volunteer opportunities, and partnership pages were designed with direct, human CTAs that communicate real impact, not just a button to click.'
      ],
      resultsParagraphs: [
        'The new platform gave PINK "ME" a digital presence that truly reflects their heart. Patients and families can now find assistance programs quickly without confusion. Donors can see exactly where their contribution goes. Volunteers and partners have a clear, welcoming entry point into the organization\'s community.',
        'The website now works as hard for PINK "ME" as their team does, connecting people to help, hope, and each other around the clock.'
      ],
      accomplishments: [
        { title: 'A Platform Built Around People', desc: 'Every page was designed with a specific audience in mind: patients, survivors, donors, and volunteers, so every visitor feels seen and guided.' },
        { title: 'Programs Made Simple', desc: 'Five distinct support programs are presented clearly and compassionately, making it easy for women in need to understand what help is available and how to apply.' },
        { title: 'Donor Trust by Design', desc: 'Clean impact messaging, financial transparency, and real program storytelling build the confidence donors need to give, and keep giving.' },
        { title: 'A Voice That Matches the Mission', desc: 'Every word on the platform was written to feel human, warm, and empowering, reflecting the dignity and hope at the core of everything PINK "ME" does.' }
      ],
      bannerImage: '/bmyb-case-pink-me-pinkmebg-01.svg',
      bannerVideo: '/bmyb-case-pink-me-01.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM THE\nPINK "ME" TEAM',
      subtitle: 'We were honored to work alongside the PINK "ME" team on a mission this meaningful. Here is what they shared about the experience.',
      reviewsList: [
        { id: 1, name: 'PINK "ME" Team', position: 'Nonprofit Organization', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'BMYBrand took the time to truly understand who we are and who we serve. The website they built doesn\'t just look beautiful; it feels like us. Our patients, donors, and volunteers can now find exactly what they need, and we finally have a platform we\'re proud to share. They brought our mission to life digitally in a way we never thought possible.' }
      ]
    },
    footer: {
      title: 'Let\'s Build Something That Matters'
    }
  },  'instinctive-healthcare-solutions': {
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
      bannerImage: '/bmyb-global-backgroundfh-01.webp',
      bannerVideo: '/bmyb-case-instinctive-healthcare-solutions-01.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM\nFHMCAZ TEAM',
      subtitle: 'We partnered closely with the FHMC team to deliver a modern, high-trust website experience. Here\'s their feedback on the final outcome.',
      reviewsList: [
        { id: 1, name: 'Jonathan Reed', position: 'CEO & Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand was a smooth and collaborative experience. The new website clearly communicates our 24/7 emergency services, patient resources, and key information in a way that feels calm, trustworthy, and easy to navigate. The team understood the urgency around patient confidence, and delivered a site that truly supports our community.' },
        { id: 2, name: 'Sarah Mitchell', position: 'Medical Director', image: 'https://i.pravatar.cc/150?img=5', testimonial: 'BMYBrand exceeded our expectations in every way. They took the time to understand our unique needs as an emergency care facility and delivered a website that not only looks professional but functions flawlessly. Our patients can now find critical information quickly and easily.' },
        { id: 3, name: 'Michael Chen', position: 'Operations Manager', image: 'https://i.pravatar.cc/150?img=8', testimonial: 'The transformation of our digital presence has been remarkable. BMYBrand created a patient-first experience that aligns perfectly with our mission. The feedback from our community has been overwhelmingly positive, and we\'ve seen a significant increase in online engagement.' }
      ]
    },
    footer: {
      title: 'Get a Strategy Built for Patient Trust and\nConversion'
    }
  },
  'instinctive-health': {
    slug: 'instinctive-health',
    accentColor: '#ED3041',
    accentColorRgb: '237 48 65',
    hero: {
      logo: '/bmyb-case-instinctive-health-logo-01.svg',
      logoAlt: 'Instinctive Health Logo',
      tags: ['Healthcare', 'Branding', 'UI/UX', 'Web Development', 'Copywriting'],
      title: 'A Professional Digital Presence for a Physician-Led\nHealthcare Investment and Development Company',
      metrics: [
        { label: 'Organization Type', value: 'Healthcare Investment' },
        { label: 'Active Facilities', value: '3+ Projects' },
        { label: 'Industry', value: 'Healthcare / Investment' },
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
      introText: 'BMYBrand partnered with Instinctive Healthcare Solutions to design and develop a polished, investor-grade digital platform that clearly communicates their turnkey healthcare development model, physician-led approach, and community-first mission to physicians, investors, and strategic partners.',
      backgroundParagraphs: [
        'Instinctive Healthcare Solutions is a premier healthcare investment, development, and operations company that partners with top-rated physicians to bring accessible, high-quality medical facilities to growing and underserved communities. From real estate acquisition and construction compliance through staffing, licensing, billing, and back-office operations, IHC handles the full spectrum of healthcare facility development under one roof.',
        'Their active portfolio includes Fountain Hills 24/7 Emergency Room and Medical Center, El Mirage Emergency Room, and an upcoming Central Phoenix hospital and ER concept. The company operates through two specialized divisions, Instinctive Physicians Group for physician staffing and Instinctive Healthcare Holdings for property development, making them a uniquely complete partner for healthcare investors and physicians looking to launch or scale medical facilities.',
        'With a model this comprehensive and a mission this impactful, IHC needed a digital presence that could communicate their expertise, build partner confidence, and clearly position them as the go-to turnkey solution in physician-led healthcare development.'
      ],
      challengeParagraphs: [
        'Healthcare investment and facility development is a complex, high-trust industry. Physicians, investors, and municipal partners evaluating a development partner are not casual browsers; they are informed, discerning professionals who need to understand a company\'s capabilities, track record, and operational depth before a single conversation takes place.',
        'Instinctive Healthcare Solutions had the expertise, the infrastructure, and the proven projects. But their existing digital presence did not reflect the scale and credibility of what they had built. The website needed to work as a first impression, a credibility tool, and a lead-generation platform, all at once.',
        'Communicating a turnkey model that spans real estate, construction, licensing, staffing, billing, compliance, and operations, without overwhelming or confusing the visitor, required a clear content strategy, deliberate information architecture, and a visual identity that commanded immediate professional respect.'
      ],
      whatWeDidItems: [
        'Brand Identity',
        'UI/UX Design',
        'Website Development',
        'Copywriting'
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
        'BMYBrand developed a clean, authoritative digital platform for Instinctive Healthcare Solutions that translates a complex, multi-layered business model into a compelling and easy-to-navigate experience for physicians, investors, and community partners.',
        'The visual identity was designed to communicate confidence, professionalism, and healthcare authority, using a structured layout, strong typography, and a refined color system that positions IHC as a serious, established player in the healthcare development space.',
        'Content was carefully structured to walk visitors through the full turnkey process, from site research and development through operations, billing, and revenue cycle management, in clear, benefit-driven language that speaks directly to the priorities of healthcare investors and physician partners. Complex service areas were simplified into digestible sections that answer the most important question every potential partner asks: what exactly do you handle, and how does it help me?',
        'Active projects, including Fountain Hills ER, El Mirage ER, and the Central Phoenix development, were featured as proof points, demonstrating IHC\'s real-world track record and community impact. Partnership and consultation pathways were built into the experience at every key touchpoint, making it easy for qualified prospects to take the next step.'
      ],
      resultsParagraphs: [
        'Instinctive Healthcare Solutions launched with a digital platform that finally matches the caliber of their work. Physicians and investors visiting the site now encounter a confident, well-structured experience that communicates IHC\'s full capabilities clearly, building the trust and credibility needed to initiate serious partnership conversations.',
        'The platform strengthened IHC\'s positioning as a premier turnkey healthcare development partner, supported lead generation across physician, investor, and municipal audiences, and gave the company a professional digital foundation built to scale alongside their growing portfolio of facilities.'
      ],
      accomplishments: [
        { title: 'Investor-Grade Digital Credibility', desc: 'A professional, authoritative web presence that communicates IHC\'s expertise, track record, and turnkey model to physicians, investors, and partners with immediate confidence.' },
        { title: 'Complex Services Made Clear', desc: 'A comprehensive range of development, operations, billing, and staffing services translated into clean, benefit-driven content that every visitor can understand and act on.' },
        { title: 'Projects That Prove the Model', desc: 'Active facilities, Fountain Hills ER, El Mirage ER, and Central Phoenix, are featured as real-world proof of IHC\'s ability to deliver physician-led healthcare from concept to operation.' },
        { title: 'A Platform Built for Partnership', desc: 'Strategic consultation pathways, clear service messaging, and strong CTAs work together to convert qualified visitors into partner conversations at every stage of the decision process.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp',
      bannerVideo: '/bmyb-case-instinctive-health-01.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM THE\nIHC TEAM',
      subtitle: 'We worked closely with the Instinctive Healthcare Solutions leadership team to build a platform worthy of their vision. Here is what they had to say.',
      reviewsList: [
        { id: 1, name: 'IHC Leadership Team', position: 'Client', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'We needed a website that could speak to physicians, investors, and community leaders all at once, and BMYBrand delivered exactly that. The platform is clean, professional, and clearly communicates everything we do and why it matters. For the first time, our digital presence truly reflects the scale and depth of what Instinctive Healthcare Solutions has built. We now have a platform we are proud to share with every potential partner.' }
      ]
    },
    footer: {
      title: 'Build a Facility That Serves Your\nCommunity'
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
      tags: ['EdTech', 'Branding', 'UI/UX', 'App Design', 'Copywriting'],
      title: 'Designed a Time-Saving Classroom App for\nTeachers Who Deserve Better Tools',
      metrics: [
        { label: 'Platform Type', value: 'Mobile App' },
        { label: 'Key Features', value: '8+ Features' },
        { label: 'Industry', value: 'Education / EdTech' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-learnandlabel-slider-01.webp',
        '/bmyb-case-learnandlabel-slider-02.webp',
        '/bmyb-case-learnandlabel-slider-03.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Label N Learn to design and develop a warm, intuitive digital platform and app experience that helps teachers save time, organize their classrooms, and communicate with parents, so they can focus on what matters most: teaching.',
      backgroundParagraphs: [
        'Label N Learn is a teacher productivity app built by educators, for educators. Founded by classroom teacher Leanne Collado and U.S. Army veteran Danny Collado, the app was born out of a genuine understanding of the daily challenges teachers face: endless formatting, manual label creation, newsletter preparation, and the constant pressure to do more with less time.',
        'The app gives teachers a single platform to create custom classroom labels, build parent newsletters, store projects, share resources with colleagues, and export print-ready PDFs, all without the frustration of complicated tools or wasted hours.',
        'With a product rooted in real classroom experience and a founder story built on service and dedication, Label N Learn had everything it needed to connect deeply with teachers. What they needed was a digital presence and app experience that communicated that value clearly, warmly, and instantly.'
      ],
      challengeParagraphs: [
        'Teachers are one of the most overworked and under-resourced professional groups in the world. When they encounter a new tool, they do not have time for confusion, steep learning curves, or unclear value propositions. The platform needed to communicate its benefits immediately and make every teacher who landed on it feel like it was built specifically for them.',
        'The challenge was designing an app experience and website that felt approachable, practical, and genuinely helpful, not another complicated piece of software added to an already overwhelming workload. Every screen, every word, and every interaction needed to feel like a helping hand, not another task.'
      ],
      whatWeDidItems: [
        'Brand Identity',
        'UI/UX Design',
        'App Design',
        'Copywriting'
      ],
      galleryImages: [
        '/bmyb-case-learnandlabel-gallery-04.png',
        '/bmyb-case-learnandlabel-gallery-02.svg',
        '/bmyb-case-learnandlabel-gallery-03.svg',
      ],
      galleryImageFit: 'contain',
      galleryBgColor: 'linear-gradient(180deg, #9AB821 0%, #E9B10F 31%, #F45334 68%, #E07D32 100%)'
    },
    solution: {
      introParagraphs: [
        'BMYBrand designed a warm, teacher-first brand identity and digital platform for Label N Learn that speaks directly to the people it was built for: educators who are passionate, busy, and deserving of tools that actually make their lives easier.',
        'The visual identity was designed to feel friendly, organized, and approachable, using a clean layout, inviting color palette, and clear typography that reflects the structured yet creative nature of a well-run classroom. Nothing overwhelming. Nothing unnecessary. Just clarity and warmth from the very first screen.',
        'The app experience was structured around Label N Learn\'s core features: custom label creation, newsletter building, templates, camera tool, project storage, teacher sharing, and print and PDF export, each presented in a simple, benefit-driven way that shows teachers exactly what they gain and how fast they can get started.',
        'The founder story was given a prominent, authentic place in the platform, because teachers trust tools made by people who understand their world. Leanne and Danny\'s background in education and service gave the brand a human foundation that no generic edtech product could replicate.',
        'AI-powered label generation was positioned as the app\'s most exciting feature, giving teachers the ability to generate classroom-ready labels in seconds, customized by category, subject, student name, or classroom need, framed as a time-saving superpower built specifically for the modern educator.'
      ],
      resultsParagraphs: [
        'Label N Learn launched with a brand and digital platform that teachers could immediately connect with and trust. The app\'s value proposition save time, stay organized, communicate clearly came through on every page, every screen, and every interaction.',
        'The platform gave Label N Learn a strong foundation for growth across iOS and Android, supported teacher onboarding with clear and encouraging copy, and positioned the app as a genuinely teacher-first tool in a market full of generic productivity software.'
      ],
      accomplishments: [
        { title: 'A Brand Teachers Instantly Trust', desc: 'A warm, educator-first brand identity built around the founders\' real classroom experience, giving teachers an immediate sense that this tool was made for them.' },
        { title: 'Features That Speak for Themselves', desc: 'Every app feature, from custom labels to AI generation to PDF export, is presented in clear, benefit-driven language that shows teachers exactly how much time they will save.' },
        { title: 'AI Made Simple for the Classroom', desc: 'AI-powered label generation is positioned as an accessible, practical time-saver, not an intimidating technology, making it the feature every teacher wants to use first.' },
        { title: 'Built to Grow with Every Teacher', desc: 'A scalable app platform with project storage, colleague sharing, and multi-format export options that grows alongside the teacher\'s classroom needs year after year.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp'
      ,
      bannerVideo: '/Label%20n%20Learn.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM THE\nLABEL N LEARN TEAM',
      subtitle: 'It was a joy working alongside Leanne and Danny to bring Label N Learn to life. Here is what they shared about the journey and the outcome.',
      reviewsList: [
        { id: 1, name: 'Leanne Collado', position: 'Founder', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'As a teacher, I know firsthand how little time educators have, and BMYBrand understood that from day one. They built a platform that feels like it was made for teachers because it genuinely was. The design is clean, the copy speaks our language, and the app experience makes it easy for any teacher to get started right away. We are so proud of what we built together and excited for every teacher who discovers it.' }
      ]
    },
    footer: {
      title: 'Got a Big Idea? We\'re All Ears!'
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
        '/bmyb-case-vytis-tour-gallery-screen-01.png',
        '/bmyb-case-vytis-tour-gallery-screen-02.png',
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
      ,
      bannerVideo: '/bmyb-case-vytis-tour-01.mp4'
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
      tags: ['Healthcare', 'UI/UX', 'Development', 'SEO', 'SMM'],
      title: 'We Made a Digital Home for New Jersey\'s\nRecreational Tennis Community',
      metrics: [
        { label: 'Community Reach', value: 'Tournaments, Social Events & Match Play' },
        { label: 'Key Pages Delivered', value: '15+ Pages' },
        { label: 'Industry', value: 'Sports / Recreational Tennis' },
      ],
      websiteUrl: '#',
      sliderImages: [
        '/bmyb-case-jersey-slider-01.webp',
        '/bmyb-case-jersey-slider-02.webp',
        '/bmyb-case-jersey-slider-03.webp',
      ]
    },
    background: {
      introText: 'BMYBrand partnered with Jersey Recreational Tennis to create a community-focused digital platform designed to bring local players together through organized matches, tournaments, social events, and player networking. The goal was to build an experience that feels welcoming for beginners while still engaging experienced players looking for competition, connection, and organized play.',
      backgroundParagraphs: [
        'Jersey Recreational Tennis began with a simple idea: creating opportunities for people to enjoy tennis in a social and welcoming environment. Over the years, the community expanded from casual gatherings and tennis BBQ events into organized tournaments, challenge matches, indoor sessions, and recurring tennis parties that bring together players across New Jersey. What started as local events gradually evolved into a growing community where players of different skill levels could connect through a shared passion for the sport.',
        'As the community grew, the need for a stronger digital presence became increasingly important. Players needed a centralized place where they could explore events, create profiles, connect with compatible opponents, and stay informed about upcoming activities. The goal was to create an experience that not only organized information efficiently but also reflected the friendly and energetic personality of the community itself.'
      ],
      challengeParagraphs: [
        'The challenge was creating a platform that serves different types of players without making the experience feel complicated. New members needed guidance on how to join and participate, while active players required quick access to profiles, rankings, matches, and events. The experience needed to feel simple and welcoming regardless of whether someone was joining for the first time or returning regularly.',
        'The website also needed to balance two different experiences simultaneously: maintaining a competitive environment through rankings and tournaments while preserving the fun, welcoming personality that defines the community. It was important that the platform never felt overly serious or intimidating for recreational players.',
        'Another important challenge involved organizing multiple offerings, including challenge matches, parties, winter sessions, tournaments, and community updates, into a structure that feels easy to navigate. Users needed a clear journey that helps them quickly understand where to go and how to participate.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Responsive Website Design',
        'Information Architecture',
        'SEO Optimization',
        'Community Experience Strategy'
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
        'BMYBrand designed and developed a community-first digital experience that captures the social energy and local identity of Jersey Recreational Tennis. The focus was on creating an experience that feels approachable and engaging while reflecting the welcoming atmosphere that has become a core part of the community.',
        'The platform was structured around ease of participation and player engagement. Navigation pathways were simplified so users can quickly understand how to create profiles, find players at similar skill levels, join tournaments, and participate in upcoming events. Information was organized in a way that allows users to move naturally through the experience without feeling overwhelmed by multiple activities and features.',
        'We also created an experience that highlights both the competitive and social aspects of the community, allowing players to discover opportunities that match their interests and skill levels. Whether users are looking for competitive matches, social tennis events, or opportunities to meet new players, the platform supports multiple types of engagement within one connected experience.'
      ],
      resultsParagraphs: [
        'The redesigned platform created a more organized and engaging experience for both new and returning players. The improved structure makes it easier for users to discover community activities while reducing confusion throughout the overall journey.',
        'Users can now explore events more easily, connect with other players faster, and understand how to participate without confusion. Improved content structure and navigation also help strengthen community engagement and encourage more player interaction across different activities and skill levels.',
        'The new digital experience supports continued community growth while creating a stronger sense of belonging for recreational tennis players across New Jersey. It also establishes a scalable foundation for future events, tournaments, and expanding community initiatives.'
      ],
      accomplishments: [
        { title: 'Stronger Community Connection', desc: 'Players can easily discover events, matches, and opportunities to engage with the local tennis community. This creates stronger interaction among players and helps build long-term community relationships.' },
        { title: 'Simplified Player Journey', desc: 'New members can quickly understand how to join, create profiles, and participate. The streamlined experience reduces confusion and makes getting started feel effortless.' },
        { title: 'Improved Event Visibility', desc: 'Tournaments, parties, and sessions are presented in a structured way that makes participation easier. Clear organization also helps users stay informed about upcoming opportunities and activities.' },
        { title: 'Responsive User Experience', desc: 'The platform delivers a smooth experience across mobile, tablet, and desktop devices. This ensures players can stay connected and access important information anytime and from anywhere.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp',
      bannerVideo: '/bmyb-case-jersey-01.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM JERSEY RECREATIONAL TENNIS\nTEAM',
      subtitle: 'We worked closely with the Jersey Recreational Tennis team to create a digital experience that reflects the energy, community spirit, and welcoming culture behind the brand.',
      reviewsList: [
        { id: 1, name: 'Jersey Recreational Tennis Team', position: 'Client', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand helped us create an online experience that truly represents our tennis community. The new platform makes it easier for players to connect, participate, and stay involved while keeping the fun and welcoming atmosphere that defines Jersey Recreational Tennis.' }
      ]
    },
    footer: {
      title: 'Build Community-Driven Sports Platforms\nThat Bring Players Together'
    }
  },
  'bhs': {
    slug: 'bhs',
    accentColor: '#0160A0',
    accentColorRgb: '1 96 160',
    hero: {
      logo: '/bmyb-case-bhs-logo-01.svg',
      logoAlt: 'BHS Logo',
      tags: ['UI/UX', 'Development', 'Brand Identity', 'System Design'],
      title: 'Designed a Compassion-Driven Digital Ecosystem\nfor Housing Stability and Mental Wellness',
      metrics: [
        { label: 'Mission Focus', value: 'Affordable Housing & Supportive Services' },
        { label: 'Key Pages Delivered', value: 'Nonprofit Website + Campaign Ecosystem' },
        { label: 'Industry', value: 'Nonprofit / Housing & Social Support Services' },
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
      introText: 'BMYBrand partnered with Broward Housing Solutions (BHS) to design and develop a mission-driven digital platform focused on communicating dignity, hope, and long-term housing stability. The objective was to translate a deeply human cause into a digital experience that builds trust, encourages action, and supports community engagement.',
      backgroundParagraphs: [
        'Broward Housing Solutions (BHS) is a nonprofit organization dedicated to providing permanent affordable housing and supportive services for individuals and families overcoming homelessness and mental illness. The organization plays a critical role in helping vulnerable communities rebuild stability, restore dignity, and improve long-term mental wellness.',
        'As the organization expanded its programs and community reach, there was a growing need for a stronger digital presence that could clearly communicate its mission and impact. The website needed to serve multiple audiences, including donors, volunteers, government partners, and individuals seeking support services, all while maintaining emotional sensitivity and clarity.',
        'The goal was to create a platform that reflects hope and compassion while also presenting measurable impact in a structured and trustworthy way that encourages long-term engagement and support.'
      ],
      challengeParagraphs: [
        'The primary challenge was communicating a sensitive and emotionally complex mission in a way that feels both compassionate and professional. The platform needed to handle topics such as homelessness, mental health, and housing insecurity without overwhelming or discouraging users.',
        'At the same time, the website had to balance emotional storytelling with structured information for donors, partners, and institutions who require clarity, transparency, and measurable impact data. Each audience group had different expectations, making it essential to create a unified experience that speaks effectively to all.',
        'Another challenge was ensuring that calls-to-action such as donations, volunteering, and partnerships felt natural and mission-aligned rather than transactional. The experience needed to inspire trust and participation while preserving dignity and respect for the communities being served.'
      ],
      whatWeDidItems: [
        'UI/UX Design',
        'Website Development',
        'Dashboard System Design',
        'Brand Identity Design',
        'Social Media Campaign Design',
        'Print & Environmental Branding'
      ],
      galleryImages: [
        '/bmyb-case-bhs-gallery-03.png',
        '/bmyb-case-bhs-gallery-02.webp',
        '/bmyb-case-bhs-gallery-01.webp',
      ],
      galleryImageFit: 'contain',
      galleryBgColor: '#0160A0'
    },
    solution: {
      introParagraphs: [
        'BMYBrand developed a comprehensive digital ecosystem designed to reflect both the emotional depth and operational structure of Broward Housing Solutions. The website was built to communicate impact clearly while maintaining a compassionate and human-centered tone throughout the experience.',
        'We structured the platform around storytelling and transparency, ensuring that campaigns like "Homes That Heal" are presented in a way that connects emotional narratives with measurable outcomes. Donation, volunteer, and partnership pathways were designed to feel accessible, respectful, and easy to navigate.',
        'Alongside the website, a custom dashboard system was developed to support internal operations, helping the organization manage housing programs, campaigns, and administrative workflows more efficiently. This ensured that the digital ecosystem supports both external engagement and internal functionality.'
      ],
      resultsParagraphs: [
        'The redesigned platform significantly strengthened how Broward Housing Solutions communicates its mission and engages with its audience. Visitors can now better understand the organization\'s purpose, impact, and opportunities for involvement within a clear and structured experience.',
        'The improved design allows donors and partners to connect more confidently with the cause, while also helping volunteers and community members easily find ways to contribute. The integration of storytelling and data has improved transparency and trust across all user groups.',
        'The platform now serves as a unified digital foundation that supports both awareness and action, reinforcing the organization\'s mission to create lasting housing stability and improved mental wellness for vulnerable communities.'
      ],
      accomplishments: [
        { title: 'Stronger Emotional Storytelling', desc: 'The platform communicates sensitive social issues with clarity, dignity, and empathy, ensuring users remain engaged and informed.' },
        { title: 'Improved Donor Trust & Transparency', desc: 'Impact data, campaigns, and success stories are structured to build credibility and long-term support.' },
        { title: 'Unified Multi-Audience Experience', desc: 'The website effectively serves donors, volunteers, partners, and beneficiaries within one cohesive system.' },
        { title: 'Operational Dashboard Integration', desc: 'A custom internal system improves workflow efficiency and supports better management of housing and campaign data.' }
      ],
      bannerImage: '/bmyb-global-backgroundfh-01.webp',
      bannerVideo: '/BHS.mp4'
    },
    reviews: {
      title: 'REVIEWS FROM\nBHS TEAM',
      subtitle: 'We worked closely with the Broward Housing Solutions team to ensure the digital experience reflects the heart of their mission, restoring dignity, providing housing stability, and supporting mental wellness.',
      reviewsList: [
        { id: 1, name: 'BHS Team', position: 'Client', image: 'https://i.pravatar.cc/150?img=12', testimonial: 'Working with BMYBrand helped us communicate our mission in a way that truly reflects the impact we make in the community. The website and dashboard system have made it easier for us to engage donors, share our story, and manage internal operations more effectively. It has strengthened both our outreach and our ability to serve those in need.' }
      ]
    },
    footer: {
      title: 'Make Your Impact Easier to See, Understand,\nand Support'
    }
  }
}
