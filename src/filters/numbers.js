const millions = {};

millions.install = function(Vue) {
  Vue.filter("number", (v, d) => {
    let v1;
    let v2;
    if (isNaN(parseInt(v))) {
      v = 0;
    } else {
      v1 = v;
      v2 = parseInt(v);
      v = parseInt(v);
    }
    v = v
      .toString()
      .split("")
      .reverse()
      .join("")
      .replace(/(?=\d*\.?)(\d{3})/g, "$1.");
    v = v
      .split("")
      .reverse()
      .join("")
      .replace(/^[.]/, "");
    let dec = v1 - v2;
    dec = dec * 100;
    dec = parseInt(dec);
    if (dec > 0) {
      if (d && d === "dec") {
        return `${v},${dec}`;
      } else {
        return v;
      }
    } else {
      if (d && d === "dec") {
        return `${v},00`;
      } else {
        return v;
      }
    }
  });
  Vue.filter("miles", (v) => {
    return `${v} miles`;
  });
  Vue.filter("textempresa", (v) => {
    let text;
    if (v) {
      if (v.length > 19) {
        text = v.substr(0, 16) + "...";
      } else {
        text = v;
      }
      return text;
    }
  });
  Vue.filter("textcedula", (v) => {
    let text;
    if (v) {
      if (v.length > 10) {
        text = v.substr(0, 10);
      } else {
        text = v;
      }
      return text;
    }
  });
  Vue.filter("agryear", (v) => {
    if (v) {
      if (v === "AGR-year") {
        return "AÑO";
      } else if (v === "year") {
        return "AÑO";
      } else if (v.substr(0, 4) === "AGR-") {
        return v.substr(4, v.length);
      } else {
        return v;
      }
    }
  });
  Vue.filter("textnumber", (v, d) => {
    const formatter = new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: d,
    });
    const init = v;
    if (d === 0) {
      v = parseInt(v);
    } else {
      if (d === 1) {
        v = parseInt(parseFloat(v) * 10);
        v = v / 10;
      } else if (d === 2) {
        v = parseInt(parseFloat(v) * 100);
        v = v / 100;
      } else {
        v = parseFloat(v);
      }
    }
    if (isNaN(v)) {
      return init;
    } else {
      return formatter.format(v);
    }
  });
  Vue.filter("agregaTilde", (v) => {
    let r;
    if (v === "Autoevaluacion") {
      r = "Autoevaluación";
    } else {
      r = v;
    }
    return r;
  });
  Vue.filter("agregarTilde", (v) => {
    let r;
    if (v === "demograficos") {
      r = "Demográficos";
    } else {
      r = v;
    }
    return r;
  });
  Vue.filter("date", (v) => {
    let returned;
    try {
      if (v) {
        const nmeses = {
          0: "Ene",
          1: "Feb",
          2: "Mzo",
          3: "Abr",
          4: "Myo",
          5: "Jun",
          6: "Jul",
          7: "Ago",
          8: "Sep",
          9: "Oct",
          10: "Nov",
          11: "Dic",
        };

        const date = new Date(v);
        const year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        day = day.toString();
        // month = month.toString();
        // month = month.length === 1 ? `0${month}` : month;
        day = day.length === 1 ? `0${day}` : day;
        returned = `${day}/${nmeses[month]}/${year}`;
      } else {
        returned = "";
      }
    } catch (err) {
      returned = "";
    }
    return returned;
  });
};

export default millions;
