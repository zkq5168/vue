module.exports = {
    lintOnSave: false,
    devServer: {
        port: 8000,
        proxy: {
            '^/apis': {
                target: 'http://localhost:8080/',
                pathRewrite: {
                    '^/apis': '/'
                }
            }
        }
    }
}