import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService, Item } from '../../services/item.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-item-detail',
  imports: [CommonModule],
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent implements OnInit {
  item: Item | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itemService: ItemService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loading = true;
    this.itemService.getById(id).subscribe({
      next: (data) => {
        this.item = data;
        this.loading = false;
      },
      error: (err) => {
        this.toastService.error('Erro ao carregar item.');
        this.loading = false;
      }
    });
  }

  goBack() {
    this.router.navigate(['/']);
  }

  onEdit() {
    this.router.navigate(['/edit-item', this.item?.id]);
  }

  onDelete() {
    if (this.item?.id && confirm('Deseja realmente excluir este item?')) {
      this.itemService.delete(this.item.id).subscribe({
        next: () => {
          this.toastService.success('Item excluído com sucesso!');
          setTimeout(() => this.router.navigate(['/']), 1000);
        },
        error: (err) => {
          this.toastService.error('Erro ao excluir item. Tente novamente.');
        }
      });
    }
  }
}
