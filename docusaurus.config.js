// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Housing Repairs Online',
  tagline: 'Repairs Online is a collaborative local authority project, funded by the DLUHC Local Digital Fund',
  url: 'https://city-of-lincoln-council.github.io',
  baseUrl: '/housing-repairs-online/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'City-of-Lincoln-Council', // Usually your GitHub org/user name.
  projectName: 'housing-repairs-online', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Housing Repairs Online',
        logo: {
          alt: 'Housing Repairs Online Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {to: 'https://repairsonlinedigitalfund.com/blog/', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/City-of-Lincoln-Council/housing-repairs-online',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Documentation',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'About',
            items: [
              {
                label: 'Our Approach',
                href: 'https://repairsonlinedigitalfund.com/about/',
              },
              {
                label: 'Project background',
                href: 'https://repairsonlinedigitalfund.com/project-background/',
              }
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://repairsonlinedigitalfund.com/blog/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/City-of-Lincoln-Council/housing-repairs-online',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
