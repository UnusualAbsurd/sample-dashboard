/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.discordapp.com", "ui-avatars.com"],
  },
  async redirects() {
    return [
      {
        source: "/invite",
        permanent: true,
        destination:
          "https://discord.com/api/oauth2/authorize?client_id=928816793831759872&permissions=1644959362263&scope=bot%20applications.commands",
      },
    ];
  },
};
