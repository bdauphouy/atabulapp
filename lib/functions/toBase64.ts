export default (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    if (file) {
      reader.readAsDataURL(file)
    } else {
      reject('No file provided')
    }

    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
