import { Pipe,PipeTransform  } from "../../../../node_modules/@angular/core";



@Pipe({name: 'SymbolsRemovePipe'})
export class SymbolsRemovePipe implements PipeTransform {

    alphabet: string = 'qwertyuiopasdfghjklzxcvbnm123456789'
  transform(value: string): string {
    
    for(let i =0; i<value.length; i++)
    {
     if(!this.alphabet.includes[value[i]])
     {
            value.slice(i,1);
     } 

    }
    return value;
  }
}
