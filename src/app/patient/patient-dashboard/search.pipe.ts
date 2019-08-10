import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'find'
})
export class SearchPipe implements PipeTransform {

  transform(list: any[], searchWord: string): any {
    if (!searchWord)
    {
      return list;
    }
    else
    {
      return list.filter(i=>
        i.name.toLowerCase().indexOf(searchWord.toLocaleLowerCase())!=-1||
        i.area.toLowerCase().indexOf(searchWord.toLocaleLowerCase())!=-1||
        i.specialization.toLowerCase().indexOf(searchWord.toLocaleLowerCase())!=-1
      )
    }
  }

}
