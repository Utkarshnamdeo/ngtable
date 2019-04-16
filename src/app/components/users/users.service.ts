import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor() {}

  public export(data, headers, fileName) {
    const items = data;
    /* handling null values here */
    const replacer = (key, value) => (value === null ? '' : value);
    const header = headers;
    let csv: any = items.map(row =>
      header
        .map(fieldName => JSON.stringify(row[fieldName], replacer))
        .join(';')
    );
    csv.unshift(header.join(';'));
    csv = csv.join('\r\n');
    const downloadLink = document.createElement('a');
    const blob = new Blob([csv]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = `${fileName}.csv`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}
