import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Response } from '../interface/common/response.interface';
import { Section } from '../interface/section.interface';
import { Table } from '../interface/common/table.interface';
import { SERVER_ULR } from '../utility/common.constant';
import { ListResponse } from '../interface/common/list-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  public sectionSub = new Subject<Response<Section>>();

  private uri: string = '/web/sections';

  constructor(private http: HttpClient) { }

  getSectionForTable(): Observable<ListResponse<Table<Section>[]>> {
    return this.http.get<ListResponse<Table<Section>[]>>(`${SERVER_ULR +this.uri}`, {'headers':{ 'content-type': 'application/json'} } );
  }

  getSectionByKey(key:String):void{
    this.http.get<Response<Section>>(`${SERVER_ULR +this.uri}/${key}`, {'headers':{ 'content-type': 'application/json'} } )
    .subscribe(data=>{
      this.sectionSub.next(data);
    });

  }

  createSection(section:any):Observable<Response<Section>>{
    return this.http.post<Response<Section>>(`${SERVER_ULR +this.uri}?username=admin`, section,{'headers':{ 'content-type': 'application/json'} } )
  }

  updateSection(section:any,uuid:string):Observable<Response<Section>>{
    return this.http.put<Response<Section>>(`${SERVER_ULR +this.uri}/${uuid}?username=admin`, section,{'headers':{ 'content-type': 'application/json'} } )
  }

  deleteSection(uuid:string):Observable<Response<Section>>{
    return this.http.put<Response<Section>>(`${SERVER_ULR +this.uri}/${uuid}?username=admin`,{'headers':{ 'content-type': 'application/json'} } )
  }
}
