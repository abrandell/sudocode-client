import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'ellipsis'
})
export class EllipsisPipe implements PipeTransform {

  transform(text: string, length: number): string {
    if (text === undefined || text.length <= length) {
      return text;
    }

    return text.substr(0, length).concat("...");
  }
}
