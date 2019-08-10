import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(data: any[], searchterm: string): any {
    if(!searchterm){
      return data;
    }
    return data.filter(i=>
      i.name.toLowerCase().indexOf(searchterm.toLocaleLowerCase())!=-1||
        i.area.toLowerCase().indexOf(searchterm.toLocaleLowerCase())!=-1||
        i.specialization.toLowerCase().indexOf(searchterm.toLocaleLowerCase())!=-1
  
        )
    }
  

}
