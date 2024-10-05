import { storage } from "@/lib/firebase/connection"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const isImage = (file) => {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp']
    return file && acceptedImageTypes.includes(file.type)
}

export const handleSaveImage = async (event) => {

    const file = event

    const uniqueId = Date.now().toString()
    const fileExtension = file.name.split('.').pop()
    const fileName = `${uniqueId}.${fileExtension}`
    const storageRef = ref(storage, `/group/cover/${fileName}`)

    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL

}