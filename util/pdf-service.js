const pdfDocument = require("pdfkit-table")
const fs = require("fs")

const doc = new pdfDocument()

const date = Date.now()




async function createTable(data , id){

    doc.pipe(fs.createWriteStream(`recipt-${id}`))

    const table = {

        headers:["Product Name" , "Price" , "Quantity" , 'Total'],
        rows:data
    }
    await doc.table(table)

    doc.end()
}

module.exports = createTable