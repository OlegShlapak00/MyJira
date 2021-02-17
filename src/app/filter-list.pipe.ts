import { Pipe, PipeTransform } from '@angular/core';
import {ITask} from '../Models/Task';

@Pipe({
  name: 'filterList'
})
export class FilterListPipe implements PipeTransform {
  transform(TaskList: ITask[], type: string ): ITask[]{ // type can be 'OPEN' 'PROGRESS' 'DONE'
    const result = [] ;
    TaskList.map( task => {
      if (task.taskStan === type){
        result.push(task);
      }
    });
    return result;
  }

}
