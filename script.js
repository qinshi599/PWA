async function init() {
    let fileHandle // Variable to store file handle

    // Options for opening and saving files
    const openOptions = {
      types: [
        {
          description: "Text Files",
          accept: {
            "text/plain": [".txt"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false, // Allow only one file to be selected
    }

    // Event listener for creating a new file
    document
      .getElementById("createFileBtn")
      .addEventListener("click", async () => {
        // Show file save dialog and get file handle
        fileHandle = await window.showSaveFilePicker(openOptions)
        // Write empty content to the file
        await writeFile(fileHandle, "")
      })

    // Event listener for opening an existing file
    document
      .getElementById("openFileBtn")
      .addEventListener("click", async () => {
        // Show file open dialog and get file handle
        [fileHandle] = await window.showOpenFilePicker(openOptions)
        // Read file content and display it
        const file = await fileHandle.getFile()
        const fileContent = await file.text()
        document.getElementById("fileContent").value = fileContent
      })

    // Event listener for saving changes to the file
    document
      .getElementById("saveFileBtn")
      .addEventListener("click", async () => {
        // Make a writable stream from the handle.
        const writable = await fileHandle.createWritable()
        // Write the contents of the file to the stream.
        await writable.write(document.getElementById("fileContent").value)
        // Close the file and write the contents to disk.
        await writable.close()
      })

    // Event listener for deleting the file
    document
      .getElementById("deleteFileBtn")
      .addEventListener("click", async () => {
        // Remove the file  
        await fileHandle.remove()
        // Clear the textarea
        document.getElementById("fileContent").value = ""
      })

    // Function to write content to a file
    async function writeFile(fileHandle, content) {
      // Create a writable stream to the file
      const writable = await fileHandle.createWritable()
      // Write content to the file
      await writable.write(content)
      // Close the writable stream
      await writable.close()
    }
  }
  // Initialize the application
  init()