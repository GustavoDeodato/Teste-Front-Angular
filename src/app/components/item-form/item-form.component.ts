import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../../services/item.service';
import { CategoryService, Category } from '../../services/category.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-item-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css'
})
export class ItemFormComponent implements OnInit {
  isEditMode = false;
  itemId: number | null = null;
  categories: Category[] = [];
  loading = false;
  submitting = false;
  
  formData = {
    nome: '',
    sku: '',
    quantidade: 0,
    preco: 0,
    status: 'Ativo',
    categoriaId: 0,
    localizacao: '',
    estoqueMinimo: 0
  };

  errors = {
    nome: '',
    sku: '',
    quantidade: '',
    preco: '',
    categoriaId: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.itemId = Number(id);
      this.loading = true;
      this.itemService.getById(this.itemId).subscribe({
        next: (data) => {
          this.formData = {
            nome: data.nome,
            sku: data.sku || '',
            quantidade: data.quantidade,
            preco: data.preco,
            status: data.status,
            categoriaId: data.categoria.id || 0,
            localizacao: data.localizacao || '',
            estoqueMinimo: 0
          };
          this.loading = false;
        },
        error: (err) => {
          this.toastService.error('Erro ao carregar item.');
          this.loading = false;
        }
      });
    }
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories = data,
      error: (err) => this.toastService.error('Erro ao carregar categorias.')
    });
  }

  validateForm(): boolean {
    let isValid = true;
    this.errors = { nome: '', sku: '', quantidade: '', preco: '', categoriaId: '' };

    if (!this.formData.nome.trim()) {
      this.errors.nome = 'Nome é obrigatório';
      isValid = false;
    }

    if (!this.formData.sku.trim()) {
      this.errors.sku = 'SKU é obrigatório';
      isValid = false;
    }

    if (this.formData.quantidade <= 0) {
      this.errors.quantidade = 'Quantidade deve ser maior que zero';
      isValid = false;
    }

    if (this.formData.preco <= 0) {
      this.errors.preco = 'Preço deve ser maior que zero';
      isValid = false;
    }

    if (this.formData.categoriaId === 0) {
      this.errors.categoriaId = 'Categoria é obrigatória';
      isValid = false;
    }

    return isValid;
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (!this.validateForm()) {
      this.toastService.error('Por favor, corrija os erros no formulário.');
      return;
    }

    this.submitting = true;

    if (this.isEditMode && this.itemId) {
      this.itemService.update(this.itemId, this.formData).subscribe({
        next: () => {
          this.toastService.success('Item atualizado com sucesso!');
          this.submitting = false;
          setTimeout(() => this.router.navigate(['/']), 1000);
        },
        error: (err) => {
          this.toastService.error('Erro ao atualizar item. Tente novamente.');
          this.submitting = false;
        }
      });
    } else {
      this.itemService.create(this.formData).subscribe({
        next: () => {
          this.toastService.success('Item criado com sucesso!');
          this.submitting = false;
          setTimeout(() => this.router.navigate(['/']), 1000);
        },
        error: (err) => {
          this.toastService.error('Erro ao criar item. Tente novamente.');
          this.submitting = false;
        }
      });
    }
  }
}
