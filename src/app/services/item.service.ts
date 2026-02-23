import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Category {
  id?: number;
  nome: string;
  descricao?: string;
}

export interface Item {
  id?: number;
  nome: string;
  sku?: string;
  quantidade: number;
  preco: number;
  status: string;
  categoria: Category;
  descricao?: string;
  dataCriacao?: string | null;
  localizacao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = '/api/items';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  create(item: any): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  update(id: number, item: any): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByCategory(categoriaId: number): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}?categoriaId=${categoriaId}`);
  }
}
