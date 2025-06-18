```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astrotrias-archon.netlify.app', // Update with your Netlify URL after deployment
  output: 'static',
  build: {
    inlineStylesheets: 'auto'
  }
});
```
