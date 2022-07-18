
async function createTable(data , id , subtotal){

    const pdfDocument = require("pdfkit-table")
    const fs = require("fs")
    const doc = new pdfDocument()

    const date = Date.now()

    doc.pipe(fs.createWriteStream(`recipt-${id}`))

    doc.text("New Tech Sales Reciept" , {
        align:"center"
    })

    const table = {

        headers:["Product Name" , "Price" , "Quantity" , 'Total'],
        rows:data
    }
    doc.table(table)
    doc.text(`SubTotal : ${subtotal}`)

    doc.end()
}

module.exports = createTable