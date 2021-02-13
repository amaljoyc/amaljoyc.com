module.exports = {
  title: "amaljoyc;",
  description: "blog",
  plugins: [
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-131537100-1",
      },
    ],
  ],
  theme: "@vuepress/theme-blog", // OR shortcut: @vuepress/blog
  themeConfig: {
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#modifyblogpluginoptions
     */
    modifyBlogPluginOptions(blogPluginOptions) {
      return blogPluginOptions;
    },
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#nav
     */
    nav: [
      {
        text: "Blog",
        link: "/",
      },
      {
        text: "Tags",
        link: "/tag/",
      },
      {
        text: "GitHub",
        link: "https://github.com/amaljoyc",
      },
      {
        text: "LinkedIn",
        link: "https://www.linkedin.com/in/amaljoyc",
      },
    ],
    /**
     * Ref: https://vuepress-theme-blog.ulivz.com/#footer
     */
    footer: {
      contact: [
        {
          type: "github",
          link: "https://github.com/amaljoyc",
        },
        {
          type: "linkedin",
          link: "https://www.linkedin.com/in/amaljoyc",
        },
      ],
      copyright: [
        {
          text: "© 2020 Amal Chemparathy",
          link: "/",
        },
      ],
    },

    comment: {
      // Which service you'd like to use
      service: "disqus",
      // The owner's name of repository to store the issues and comments.
      shortname: "amaljoyc",
    },
  },
};
