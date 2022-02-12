const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',

})

const config = {
  future: {
    webpack5: true,
  },
}

module.exports = {
  env: {
    spaceId: "6ihgyu9jzgdi",
    accessToken: "3hhR7PafL1EN6rMJ7JgrpvDKdOwG-xpn67wOLIHmQGI"
  }
}
