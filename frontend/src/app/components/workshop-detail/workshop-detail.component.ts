import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkshopService, Workshop } from '../../services/workshop.service';
import { ColaboradorService, Colaborador } from '../../services/colaborador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-workshop-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workshop-detail.component.html',
  styleUrls: ['./workshop-detail.component.scss']
})
export class WorkshopDetailComponent implements OnInit {
  workshop: Workshop | null = null;
  participantes: Colaborador[] = [];
  colaboradoresDisponiveis: Colaborador[] = [];
  colaboradorSelecionado: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private workshopService: WorkshopService,
    private colaboradorService: ColaboradorService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.carregarWorkshop(id);
      this.carregarColaboradores();
    }
  }

  carregarWorkshop(id: number): void {
    this.workshopService.getById(id).subscribe({
      next: (data) => {
        this.workshop = data;
        this.participantes = data.presencas?.map(p => p.colaborador) || [];
      },
      error: (err) => console.error('Erro ao carregar workshop:', err)
    });
  }

  carregarColaboradores(): void {
    this.colaboradorService.getAll().subscribe({
      next: (data) => {
        this.colaboradoresDisponiveis = data;
      },
      error: (err) => console.error('Erro ao carregar colaboradores:', err)
    });
  }

  adicionarParticipante(): void {
    if (!this.workshop || !this.colaboradorSelecionado) return;

    this.workshopService.adicionarParticipante(this.workshop.id, this.colaboradorSelecionado).subscribe({
      next: () => this.carregarWorkshop(this.workshop!.id),
      error: (err) => console.error('Erro ao adicionar participante:', err)
    });
  }

  removerParticipante(colaboradorId: number): void {
    if (!this.workshop) return;

    this.workshopService.removerParticipante(this.workshop.id, colaboradorId).subscribe({
      next: () => this.carregarWorkshop(this.workshop!.id),
      error: (err) => console.error('Erro ao remover participante:', err)
    });
  }
}
