import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'formatdata',
})
export class FormatData implements PipeTransform {
  toFixed2(value) {
    value = Number(value);
    return value && Number(value.toFixed(2));
  }
  formatPercent(value) {
    return value + '%';
  }
  formatDate(value) {
    return new Date(value).toLocaleDateString();
  }
  formatNumber() {
    return new Intl.NumberFormat('en');
  }
  abbreviateNumber(n) {
    n = Number(n);
    if (n < 1e3) { return n + 'đ'; }
    if (n >= 1e3 && n < 1e6) { return this.formatNumber().format(Number(n)) + ' đ'; }
    if (n >= 1e6 && n < 1e9) { return +(n / 1e6).toFixed(2) + ' tr đ'; }
    if (n >= 1e9 && n < 1e12) { return +(n / 1e9).toFixed(3) + ' tỷ đ'; }
    if (n >= 1e12) { return +(n / 1e12).toFixed(1) + ' ntỷ đ'; }
  }
  formatOriginalPrice(value) {
    if (value) {
      value = value.replace(/[^0-9]/g, '');
    }
    return this.abbreviateNumber(Number(value));
  }
  transform(value: any, type?: string): string | null {
    let tmp: any;
    if (typeof (value) === 'string') {
      tmp = Number(value);
    } else if (typeof (value) === 'number' || type === 'original_price') {
      tmp = value;
    }
    if (!tmp) { return value; }
    switch (type) {
      case 'currency':
        return this.abbreviateNumber(tmp);
      case 'date':
        return this.formatDate(tmp);
      case 'number':
        return this.formatNumber().format(Number(tmp));
      case 'percent':
        return this.formatPercent(this.toFixed2(tmp));
      case 'tofixed2':
        return this.toFixed2(tmp).toString();
      case 'original_price':
        return this.formatOriginalPrice(tmp);
      default:
        return value.toString();
    }
  }
}
