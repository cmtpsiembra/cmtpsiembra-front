function findData (arrayData, send, field) {
    let d;
    for (let i = 0; i < arrayData.length; i++) {
      if (arrayData[i][field] === send) {
        d = arrayData[i];
        break;
      }
    }
    return d;
  };
  function readData(id) {
    const text = document.getElementById(id).textContent;
    return text;
  };

  function write (el, text) {
    document.getElementById(el).textContent = text;
  };
  const filterItems = (query, data, title, limit) => {
    const d = data.filter(el => {
      let texto = "";
      title.forEach(function(k) {
        texto += el[k.cod];
      });
      if (texto.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        return el;
      }
    });
    if(limit){
      d.slice(0, limit)
    }
    return d;
  };

  export default {
      findData,
      readData,
      write,
      filterItems
  }