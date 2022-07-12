const pdfDocument = require("pdfkit-table")
const fs = require("fs")

const doc = new pdfDocument()

const date = Date.now()

doc.pipe(fs.createWriteStream(`recipt-${date}`))

async function createTable(data){

    const table = {

        headers:["Product Name" , "Price" , "Quantity" , 'Total'],
        rows:data
    }
    await doc.table(table)

    doc.end()
}

module.exports = createTable