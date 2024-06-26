const fs = require('fs')
const path = require('path')
const globby = require('globby')
const slash = require('slash')
const uploadFile = require('./uploader.ts')

module.exports = class UploadPlugin {
    constructor(config) {
        //@ts-ignore
        this.publicPath = config.publicPath;
    }
    apply(compiler) {
        compiler.hooks.afterEmit.tapPromise('MyPlugin', async compilation => {
            console.log('Start uploading...')
            const outputPath = path.resolve(slash(compiler.options.output.path))
            const files = await globby(`${outputPath}/static/**`) // pwd/build/static
            // console.log('files', files, outputPath)
            if (files.length) {
                return this.upload(files, outputPath)
            } else {
                return Promise.resolve()
            }
        })
    }

    upload(files, outputPath) {
        return new Promise(async (resolve, reject) => {
            try {

                for (const filePath of files) {
                    //@ts-ignore
                    const fileName = filePath.replace(`${outputPath}`, this?.publicPath?.slice(0, -1)?.replace(process.env.REACT_APP_CDN_PREFIX, '') || '')
                    // console.log('upload filename', fileName)
                    const res = await uploadFile(fileName, filePath)
                    if (!res.url) {
                        console.log(`upload error: ${filePath}`);
                    }
                }
            } catch (error) {
                console.log(`upload error: ${error}`);
                reject(error)
            } finally {
                console.log('End uploading...')
            }
        })
    }
}
