import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  updateMetaTags(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
  }) {
    const defaultTitle = 'Michael Sabatini | Full Stack Developer & Designer';
    const defaultDesc = 'Portfolio of Michael Sabatini, a Full Stack Developer & Designer specializing in high-performance web experiences.';
    const defaultImage = 'https://michaelsabatinidesign.com/profile-photo.jpg';
    const baseUrl = 'https://michaelsabatinidesign.com/';

    const finalTitle = config.title ? `${config.title} | Michael Sabatini` : defaultTitle;
    const finalDesc = config.description || defaultDesc;
    const finalImage = config.image || defaultImage;
    const finalUrl = config.url ? `${baseUrl}${config.url}` : baseUrl;

    this.title.setTitle(finalTitle);

    // Standard Meta Tags
    this.meta.updateTag({ name: 'description', content: finalDesc });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: finalTitle });
    this.meta.updateTag({ property: 'og:description', content: finalDesc });
    this.meta.updateTag({ property: 'og:image', content: finalImage });
    this.meta.updateTag({ property: 'og:url', content: finalUrl });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });

    // Twitter
    this.meta.updateTag({ property: 'twitter:title', content: finalTitle });
    this.meta.updateTag({ property: 'twitter:description', content: finalDesc });
    this.meta.updateTag({ property: 'twitter:image', content: finalImage });
  }
}
