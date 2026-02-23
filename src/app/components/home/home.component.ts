import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService, Item } from '../../services/item.service';
import { CategoryService, Category } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchTerm = '';
  selectedCategory = 'all';
  selectedLocation = 'all';
  selectedStatus = 'all';
  items: Item[] = [];
  categories: Category[] = [];
  loading = false;

  constructor(
    private router: Router,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadItems();
    this.loadCategories();
  }

  loadItems() {
    this.loading = true;
    this.itemService.getAll().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
      },
      error: (err) => {
        this.toastService.error('Erro ao carregar itens. Tente novamente.');
        this.loading = false;
      }
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => this.toastService.error('Erro ao carregar categorias.')
    });
  }

  get filteredItems() {
    return this.items.filter(item => {
      const matchesSearch = !this.searchTerm || 
        item.nome.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.sku?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || item.categoria.nome === this.selectedCategory;
      const matchesLocation = this.selectedLocation === 'all' || item.localizacao === this.selectedLocation;
      const matchesStatus = this.selectedStatus === 'all' || item.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
    });
  }

  get categoryNames() {
    return ['all', ...this.categories.map(c => c.nome)];
  }

  get locations() {
    const locs = this.items
      .map(item => item.localizacao)
      .filter((loc): loc is string => !!loc);
    return ['all', ...new Set(locs)];
  }

  addNewItem() {
    this.router.navigate(['/new-item']);
  }

  openItem(item: Item) {
    this.router.navigate(['/item', item.id]);
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedCategory = 'all';
    this.selectedLocation = 'all';
    this.selectedStatus = 'all';
  }
}
