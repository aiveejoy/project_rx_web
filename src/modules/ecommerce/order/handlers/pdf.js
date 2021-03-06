import DateManipulation from './dateManipulation.js'
var pdfMake = require('pdfmake/build/pdfmake.js')
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default{
  layout(){
    return {
      hLineWidth: function () {
        return 1
      },
      vLineWidth: function () {
        return 1
      },
      hLineColor: function () {
        return 'gray'
      },
      vLineColor: function () {
        return 'gray'
      }
    }
  },
  toPDF(title, data, userData, dateCreated){
    pdfMake.createPdf(this.createDoc(title, data, userData, dateCreated)).open()
  },
  createDoc(title, data, userData, dateCreated){
    return {
      pageSize: 'A4',
      pageMargins: [10, 60, 10, 30],
      header: {
        columns: [
          {
            table: {
              widths: ['*'],
              heights: 50,
              body: [[{ text: title, margin: [0, 15], style: 'filledHeader' }]]
            },
            layout: 'noBorders'
          }
        ]
      },
      footer: function(currentPage, pageCount){
        return {
          columns: [
            {text: 'Date Published ' + DateManipulation.currentDate(), margin: [10, 0, 0, 0]},
            {text: currentPage.toString() + ' of ' + pageCount, margin: [0, 0, 10, 0], style: 'footer'}
          ]
        }
      },
      content: [
        {text: userData.subAccount.merchant.name, margin: [0, 20, 0, 0], style: 'title'},
        {text: userData.subAccount.merchant.address, style: 'header'},
        {text: dateCreated, margin: [0, 0, 0, 30], style: 'header'},
        {
          table: {
            headerRows: 1,
            margin: [20, 20],
            widths: [70, 50, 60, 40, 70, 60, 60, '*'],
            body: this.tableBodyGenerator(data)
          },
          layout: this.layout(),
          pageBreak: 'after'
        }
      ],
      styles: {
        boldHeader: {
          bold: true
        },
        filledHeader: {
          bold: true,
          fontSize: 18,
          color: 'white',
          fillColor: '#FF5B04',
          alignment: 'center'
        },
        header: {
          fontSize: 12,
          alignment: 'center'
        },
        title: {
          bold: true,
          fontSize: 18,
          alignment: 'center'
        },
        item: {
          fontSize: 10
        },
        footer: {
          alignment: 'right'
        }
      }
    }
  },
  tableBodyGenerator(data){
    let tableBodyList = []
    tableBodyList.push(this.createHeaders(data))
    data.body.forEach(item => {
      let tempArr = []
      data.headers.forEach(headerElem => {
        if(headerElem.type === 'money'){
          tempArr.push(this.createObj('PHP ' + item[headerElem.name].toFixed(2)))
        }else{
          tempArr.push(this.createObj(item[headerElem.name]))
        }
      })
      tableBodyList.push(tempArr)
    })
    var tempArr = [{text: 'Total', style: 'boldHeader'}]
    for(let count = 1; count < data.headers.length; count++){
      if(data.headers[count].type !== 'money'){
        tempArr.push('')
      }else{
        data.total.forEach(totalElem => {
          if(totalElem.name === data.headers[count].name){
            tempArr.push('PHP ' + (totalElem.value.toFixed(2)))
          }
        })
      }
    }
    tableBodyList.push(tempArr)
    return tableBodyList
  },
  createObj(data){
    let obj = {}
    obj['text'] = data
    obj['style'] = 'item'
    return obj
  },
  createHeaders(data){
    var tempArr = []
    data.headers.forEach(headerElem => {
      tempArr.push({text: headerElem.label, style: 'boldHeader'})
    })
    return tempArr
  }
}
