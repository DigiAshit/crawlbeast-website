import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from '../studio-crawlbeast/schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'CrawlBeast Studio',

  projectId: 'u4287n71',
  dataset: 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Website Content')
          .items([
            // Singleton Settings Item
            S.listItem()
              .title('Global Site Settings')
              .id('settings')
              .child(
                S.document()
                  .schemaType('settings')
                  .documentId('settings')
                  .title('Global Site Settings')
              ),
            S.divider(),
            // Regular Pages list
            S.documentTypeListItem('page').title('Pages'),
            S.documentTypeListItem('lead').title('Leads'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from "Create new document" menus
    templates: (prev) =>
      prev.filter((template) => template.schemaType !== 'settings'),
  },
})
