import SparkMD5 from 'spark-md5'

export interface NewFileType extends File {
    speep: number // 分片上传进度
    progress: number // ui显示的进度值
    fileId: string
    // 整个文件上传的状态
    state: {
        state_txt: string;
        tips_txt: string
    }
    // 文件hash
    hash?: string
    // 是否合并过
    isMerge?: boolean
}

// 分片文件列表
export interface FileSlice {
    file: Blob
    hash: string
    chunkIndex: number
    chunkTotal: number
    fileName: string
}

export const getFileMD5 = (file: File) => {
    return new Promise((resolve, reject) => {
        const spark = new SparkMD5.ArrayBuffer()
        const fileReader = new FileReader()
        fileReader.onload = (e: ProgressEvent<FileReader>): void => {
            spark.append(e.target?.result)
            resolve(spark.end())
        }
        fileReader.onerror = () => { reject(`文件${file.name}读取出错，请检查该文件`) }
        fileReader.readAsArrayBuffer(file)
    })
}
