module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['.tsx', '.ts', '.js', 'jsx', '.json']
      }
    })

    return config
  }
}