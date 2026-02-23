import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface InventoryItem {
  id: number;
  name: string;
  sku?: string;
  description: string;
  category: string;
  location: string;
  department: string;
  status: 'Ativo' | 'Inativo';
  quantity: number;
  unitPrice: number;
  image?: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchTerm = '';
  selectedCategory = 'all';
  selectedLocation = 'all';
  selectedStatus = 'all';

  items: InventoryItem[] = [
    {
      id: 1,
      name: 'Test Item',
      sku: 'SKU-001',
      description: 'Item de teste para demonstração do sistema',
      category: 'Eletrônicos',
      location: 'Escritório',
      department: 'Secretaria da Educação',
      status: 'Ativo',
      quantity: 10,
      unitPrice: 99.99
    },
    {
      id: 2,
      name: 'Rastreador 4G',
      description: 'Dispositivo de rastreamento GPS com conectividade 4G',
      category: 'Eletrônicos',
      location: 'Almoxarifado',
      department: 'Secretaria de Transporte',
      status: 'Ativo',
      quantity: 25,
      unitPrice: 249.90,
      image: '📱'
    },
    {
      id: 3,
      name: 'Notebook Dell',
      sku: 'NB-DELL-2024',
      description: 'Notebook corporativo para uso administrativo',
      category: 'Informática',
      location: 'Escritório',
      department: 'Secretaria da Educação',
      status: 'Ativo',
      quantity: 5,
      unitPrice: 3499.00
    },
    {
      id: 4,
      name: 'Cadeira Ergonômica',
      description: 'Cadeira de escritório com ajuste de altura',
      category: 'Mobiliário',
      location: 'Depósito',
      department: 'Administração',
      status: 'Ativo',
      quantity: 15,
      unitPrice: 899.00
    },
    {
      id: 5,
      name: 'Impressora Laser',
      sku: 'IMP-HP-001',
      description: 'Impressora laser monocromática',
      category: 'Informática',
      location: 'Escritório',
      department: 'Secretaria da Saúde',
      status: 'Ativo',
      quantity: 3,
      unitPrice: 1299.00
    },
    {
      id: 6,
      name: 'Mesa de Reunião',
      description: 'Mesa para sala de reuniões - 8 lugares',
      category: 'Mobiliário',
      location: 'Sala de Reuniões',
      department: 'Administração',
      status: 'Ativo',
      quantity: 2,
      unitPrice: 2500.00
    }
  ];

  get filteredItems() {
    return this.items.filter(item => {
      const matchesSearch = !this.searchTerm || 
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.sku?.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesCategory = this.selectedCategory === 'all' || item.category === this.selectedCategory;
      const matchesLocation = this.selectedLocation === 'all' || item.location === this.selectedLocation;
      const matchesStatus = this.selectedStatus === 'all' || item.status === this.selectedStatus;

      return matchesSearch && matchesCategory && matchesLocation && matchesStatus;
    });
  }

  get categories() {
    return ['all', ...new Set(this.items.map(item => item.category))];
  }

  get locations() {
    return ['all', ...new Set(this.items.map(item => item.location))];
  }

  addNewItem() {
    alert('Funcionalidade de adicionar novo item');
  }
}
