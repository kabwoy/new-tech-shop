
async function createTable(data , id){

    const pdfDocument = require("pdfkit-table")
    const fs = require("fs")
    const doc = new pdfDocument()

    const date = Date.now()

    doc.pipe(fs.createWriteStream(`recipt-${id}`))

    const table = {

        headers:["Product Name" , "Price" , "Quantity" , 'Total'],
        rows:data
    }
    doc.table(table)

    doc.end()
}

module.exports = createTable