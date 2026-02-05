# Review Images

This folder contains profile images for the review cards displayed in the vertical scrolling columns.

## Required Images

Place the following images in this folder:

1. `michael.jpg` - Profile image for Michael Anderson
2. `sarah.jpg` - Profile image for Sarah Mitchell
3. `michael2.jpg` - Alternative profile image for Michael Anderson
4. `sarah2.jpg` - Alternative profile image for Sarah Mitchell

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Recommended size**: 200x200 pixels (square aspect ratio)
- **File size**: Keep under 100KB for optimal performance
- **Style**: Professional headshots or profile photos work best

## How to Update Reviews

To add or modify reviews, edit the `reviews` array in:
`/components/VerticalReviewColumns.tsx`

### Example Review Object:

```typescript
{
  id: 1,
  name: 'Client Name',
  role: 'Client',
  review: 'Your review text here...',
  image: '/reviews/image-name.jpg',
  rating: 5
}
```

## Notes

- Images will be displayed with rounded corners (rounded-2xl)
- The component uses a 16x16 (w-16 h-16) container for the images
- Images are set to `object-cover` to maintain aspect ratio and fill the container
