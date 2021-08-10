module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8006,
        proxy: {
            '^/apis': {
                target: 'http://localhost:8026/',
                pathRewrite: {
                    '^/apis': '/'
                }
            }
        }
    }
}