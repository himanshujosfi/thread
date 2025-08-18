function bytesToMb(bytes: number) {
    return bytes / (1024 * 1024);
}


export const imageSchema = (name: string | undefined, size: number | undefined) => {
    let flag: string | null = null

    if (name) {
        const imageExist = name.split(".")
        const imageType: Array<string> = ["svg", "png", "json", "jip", "jpj"]

        if (!imageType.includes(imageExist[1])) {
            return flag = "Image must be jpg , svg , json , jip , jpj"
        }
        else {
            flag = null
        }
    }

    if (size) {
        const imageSize = bytesToMb(size)
        imageSize > 2 ? flag = "image size is to big (more than 2mb" : ""
    }
    else {
        flag = null
    }
}

