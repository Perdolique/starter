import { createHash, type BinaryLike } from 'crypto'
import { basename } from 'path'
import { kvStarterStorage } from './shared/constants'

/** Supported component types */
type ComponentType = 'page' | 'layout' | 'component'

/** Get the component name based on its type and file path */
function getComponentType(filePath: string) : ComponentType {
  if (filePath.includes('/app/pages/')) {
    return 'page'
  } else if (filePath.includes('/app/layouts/')) {
    return 'layout'
  } else {
    return 'component'
  }
}

/** Get the full component name based on its type */
function getComponentName(componentName: string, componentType: ComponentType) : string {
  if (componentType === 'component') {
    return componentName
  }

  return `${componentType}-${componentName}`
}


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-10',

  devServer: {
    port: 5000
  },

  devtools: {
    enabled: true
  },

  modules: [
    'nitro-cloudflare-dev',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts'
  ],

  nitro: {
    preset: 'cloudflare-module',

    cloudflare: {
      deployConfig: false
    },

    storage: {
      [kvStarterStorage]: {
        driver: 'cloudflare-kv-binding',
        binding: 'KV'
      }
    },

    cloudflareDev: {
      environment: 'staging'
    }
  },

  typescript: {
    typeCheck: true
  },

  experimental: {
    viewTransition: true,

    defaults: {
      nuxtLink: {
        prefetch: true,

        prefetchOn: {
          interaction: true,
          visibility: false
        }
      }
    }
  },

  imports: {
    // Disable all autoimports (`components` is handled separately)
    scan: false
  },

  // Disable autoimport for components
  components: [],

  icon: {
    provider: 'none',

    // Do not utilize SSR for icons
    clientBundle: {
      scan: true,
      sizeLimitKb: 256
    }
  },

  fonts: {
    families: [{
      name: 'Inter',
      provider: 'fontsource',
      weights: ['100 900'],
    }]
  },

  vite: {
    css: {
      modules: {
        /**
         * Generates a scoped class name for Vue components for better debugging and readability.
         * Example: `WoofComponent_content`, `page-index`, `layout-default`
         */
        generateScopedName(className: string, filename: string, data: BinaryLike) : string {
          const hash = createHash('sha256')
            .update(data)
            .digest('hex')
            .slice(0, 6);

          const filePath = filename
            .replace(/\.vue(?:\?.+?)?$/u, '')
            .replace(/\[|\]/gu, '');

          const baseName = basename(filePath);
          const componentType = getComponentType(filePath);
          const componentName = getComponentName(baseName, componentType);

          return `${componentName}_${className}_${hash}`;
        }
      }
    }
  }
})
