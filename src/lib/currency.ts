const currency = (trailingZero: number) =>
  Intl.NumberFormat("in-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: trailingZero,
  });

const number = (trailingZero: number) =>
  Intl.NumberFormat("in-ID", { minimumFractionDigits: trailingZero });

export const toIDR = (v: any, trailingZero = 0, symbol = true) => {
  let modV = v;

  if (!isNaN(v)) {
    const currencyFormat = currency(trailingZero);
    const numberFormat = number(trailingZero);
    modV = symbol ? currencyFormat.format(v) : numberFormat.format(v);
  }

  return modV;
};

export const formatCurrency = (angka: any) => {
  const number_string = angka.toString().replace(/[^,\d]/g, "");
  const split = number_string.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
  return rupiah ? rupiah : "";
};
